import { useEffect, useState } from "react";

export const useWebSocket = (onMessage: (data: any) => void) => {
    
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  /*
    Không cần tự tách hostname và port nữa — chỉ cần .env có VITE_API_BASE_URL.

    Tự chuyển http → ws (hoặc https → wss) đúng chuẩn.

    Tránh lỗi socket.close() khi socket chưa sẵn sàng.

    Tái kết nối tự động khi server tạm ngắt.
  */

  useEffect(() => {
    // Lấy base URL từ .env
    const baseUrl = import.meta.env.VITE_API_BASE_URL || window.location.origin;

    // Đảm bảo chuyển http -> ws và https -> wss
    const wsUrl = baseUrl.replace(/^http/, "ws") + "/ws?role=admin";

    let socket: WebSocket | null = null;
    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
    let isUnmounted = false;

    const connect = () => {
      if (isUnmounted) return;
      console.info("[WebSocket] Connecting to:", wsUrl);

      socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        if (isUnmounted) return;
        console.info("[WebSocket] Connected ✅");
        setIsSocketConnected(true);
        if (reconnectTimeout) clearTimeout(reconnectTimeout);
      };

      socket.onmessage = (event) => {
        if (isUnmounted) return;
        try {
          const data = JSON.parse(event.data);
          onMessage(data);
        } catch (err) {
          console.error("[WebSocket] Invalid JSON:", event.data);
        }
      };

      socket.onclose = (event) => {
        if (isUnmounted) return;
        setIsSocketConnected(false);
        console.warn(`[WebSocket] Closed (code ${event.code})`);

        if (event.code !== 1000 && !reconnectTimeout) {
          reconnectTimeout = setTimeout(connect, 5000);
        }
      };

      socket.onerror = (err) => {
        console.error("[WebSocket] Error:", err);
      };
    };

    connect();

    return () => {
      isUnmounted = true;
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (socket) {
        if (
          socket.readyState === WebSocket.OPEN ||
          socket.readyState === WebSocket.CONNECTING
        ) {
          try {
            socket.close(1000, "Component unmounting");
          } catch {}
        }
        socket.onopen = null;
        socket.onmessage = null;
        socket.onclose = null;
        socket.onerror = null;
      }
    };
  }, [onMessage]);

  return { isSocketConnected };
};
