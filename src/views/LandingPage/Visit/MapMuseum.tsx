import * as React from "react";
import { Box, Button, Chip, InputAdornment, MenuItem, Select, SelectChangeEvent, TextField, Tooltip, Typography } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import SearchIcon from "@mui/icons-material/Search";

/**
 * FloorPlan – Bản đồ phòng giống hình mẫu (React + TS + MUI)
 * 
 * Một file duy nhất, có thể nhúng vào dự án MUI. Layout sử dụng CSS Grid 24 cột
 * để đặt các phòng chính xác theo vị trí trong ảnh. Có thanh tìm kiếm, chọn tầng
 * và các nút khu vực. Phòng "Phòng triển lãm Tiffany" được highlight và có marker.
 */

// Kiểu dữ liệu một "ô phòng" trên lưới
interface Tile {
  id: string;
  label: string;
  col: number; // bắt đầu từ 1
  row: number; // bắt đầu từ 1
  colSpan?: number;
  rowSpan?: number;
  kind?: "room" | "hall" | "wc" | "booth" | "pillar" | "void" | "exhibit";
  dim?: number; // mức xám (0..1) – chỉ dùng cho demo shading
}

const TILE_H = 38; // chiều cao mỗi hàng
const TILE_GAP = 6; // khoảng cách giữa các ô

const tiles: Tile[] = [
  // ===== HÀNG 1 (trên cùng) =====
  { id: "r1c3", label: "P205", col: 2, row: 1, colSpan: 4 },
  { id: "r1c8", label: "P204", col: 6, row: 1, colSpan: 4 },
  { id: "r1c13", label: "P203", col: 10, row: 1, colSpan: 4 },
  { id: "r1c18", label: "P204", col: 14, row: 1, colSpan: 4 },
  { id: "r1c23", label: "P203", col: 18, row: 1, colSpan: 4 },
  { id: "r1c28", label: "P205", col: 22, row: 1, colSpan: 4 },

  // Cột P0 hai bên
  { id: "p0-left-top", label: "P0", col: 1, row: 2, rowSpan: 3, colSpan: 2, kind: "pillar" },
  { id: "p0-right-top", label: "P0", col: 23, row: 2, rowSpan: 3, colSpan: 2, kind: "pillar" },

  // ===== HÀNG 2 =====
  { id: "r2-c3", label: "P205", col: 2, row: 2, colSpan: 4 },
  { id: "r2-c7", label: "P206", col: 6, row: 2, colSpan: 4 },
  { id: "r2-c11", label: "P201", col: 10, row: 2, colSpan: 4 },
  { id: "r2-c15", label: "P206", col: 14, row: 2, colSpan: 4 },
  { id: "r2-c19", label: "P201", col: 18, row: 2, colSpan: 4 },

  // ===== HÀNG 3 =====
  { id: "r3-c3", label: "P205", col: 2, row: 3, colSpan: 4 },
  { id: "r3-c7", label: "P204", col: 6, row: 3, colSpan: 4 },
  { id: "r3-c11", label: "P203", col: 10, row: 3, colSpan: 4 },
  { id: "r3-c15", label: "P202", col: 14, row: 3, colSpan: 4 },
  { id: "r3-c19", label: "P203", col: 18, row: 3, colSpan: 4 },
  { id: "r3-c23R", label: "P205", col: 22, row: 3, colSpan: 4 },

  // ===== KHỐI TRUNG TÂM (Phòng triển lãm) – viền sáng như ảnh =====
  { id: "exhibit-frame", label: "", col: 9, row: 4, colSpan: 14, rowSpan: 5, kind: "void" },
  { id: "exhibit", label: "Phòng triển lãm Tiffany", col: 10, row: 4, colSpan: 12, rowSpan: 5, kind: "exhibit" },

  // Các phòng xung quanh khối trung tâm
  { id: "mid-P206-left", label: "P206", col: 6, row: 5, colSpan: 4 },
  { id: "mid-P204-left", label: "P204", col: 10, row: 5, colSpan: 4 },
  { id: "mid-P203-right", label: "P203", col: 18, row: 5, colSpan: 4 },
  { id: "mid-P201-right", label: "P201", col: 22, row: 5, colSpan: 4 },

  { id: "mid-row6-left", label: "P203", col: 10, row: 6, colSpan: 4 },
  { id: "mid-row6-right", label: "P202", col: 14, row: 6, colSpan: 4 },

  { id: "mid-row7-left", label: "P206", col: 10, row: 7, colSpan: 4 },
  { id: "mid-row7-right", label: "P201", col: 18, row: 7, colSpan: 4 },

  // Hệ thống phòng dưới – hai bên
  { id: "low-left-1", label: "P205", col: 2, row: 8, colSpan: 4 },
  { id: "low-left-void", label: "", col: 6, row: 8, colSpan: 4, kind: "void" },
  { id: "low-right-void", label: "", col: 18, row: 8, colSpan: 4, kind: "void" },
  { id: "low-right-1", label: "P201", col: 22, row: 8, colSpan: 4 },

  // ===== HÀNG SẢNH & WC =====
  { id: "lobby-left", label: "Đại sảnh", col: 9, row: 9, colSpan: 8, kind: "hall" },
  { id: "wc", label: "WC", col: 17, row: 9, colSpan: 6, kind: "wc" },

  // ===== QUẦY SOÁT VÉ / ĐÓN KHÁCH (hàng cuối) =====
  { id: "ticket-left", label: "quầy soát vé", col: 9, row: 10, colSpan: 6, kind: "booth" },
  { id: "guest", label: "quầy đón khách", col: 15, row: 10, colSpan: 8, kind: "booth" },
  { id: "ticket-right", label: "quầy soát vé", col: 23, row: 10, colSpan: 4, kind: "booth" },
];

// Component một "phòng" hiển thị theo kind
const TileBox: React.FC<{ t: Tile; query: string } & React.ComponentProps<typeof Box>> = ({ t, query, ...rest }) => {
  const match = query && t.label.toLowerCase().includes(query.toLowerCase());
  const common = {
    gridColumn: `${t.col} / span ${t.colSpan ?? 1}`,
    gridRow: `${t.row} / span ${t.rowSpan ?? 1}`,
    borderRadius: 1,
    border: "1px solid #9aa0a6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center" as const,
    position: "relative" as const,
    overflow: "hidden" as const,
  };

  if (t.kind === "void") {
    return <Box sx={{ ...common, border: "1px solid rgba(0,0,0,0.25)", bgcolor: "#eee" }} {...rest}/>;
  }
  if (t.kind === "exhibit") {
    return (
      <Box sx={{ ...common, p: 0, border: "2px solid #fff", boxShadow: "inset 0 0 20px rgba(0,0,0,0.35)" }}>
        <Box sx={{ position: "absolute", top: 10, right: 10 }}>
          <Chip label="N" color="warning" size="small" sx={{ fontWeight: 700 }} />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(to right, #bdbdbd 0%, #8d8d8d 50%, #bdbdbd 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Tooltip title={t.label} arrow placement="top">
            <Box sx={{ bgcolor: "white", px: 1.2, py: 0.5, borderRadius: 1.5, boxShadow: 2, fontWeight: 600 }}>
              {t.label}
            </Box>
          </Tooltip>
          {/* Marker đen như hình */}
          <RoomIcon sx={{ position: "absolute", color: "#212121", bottom: 12 }} />
        </Box>
      </Box>
    );
  }

  const paletteByKind: Record<NonNullable<Tile["kind"]>, string> = {
    room: "#d9d9d9",
    hall: "#efefef",
    wc: "#d0d0d0",
    booth: "#f3f3f3",
    pillar: "#e0e0e0",
    void: "#eeeeee",
    exhibit: "#a0a0a0",
  } as const;

  const bg = paletteByKind[t.kind ?? "room"]; 

  return (
    <Box sx={{ ...common, bgcolor: bg, p: 0.5, outline: match ? "3px solid #1976d2" : "none" }}>
      <Typography sx={{ fontSize: 13, fontWeight: 600, userSelect: "none" }}>{t.label}</Typography>
    </Box>
  );
};

const Zones: React.FC = () => (
  <Box sx={{ mt: 2, display: "flex", gap: 1, justifyContent: "center", flexWrap: "wrap" }}>
    {["Khu vực 1", "Khu vực 2", "Khu vực 3", "Khu vực 4", "Khu vực 5", "Khu vực 6"].map((zone, i) => (
        <Button 
            key={zone} 
            variant={i === 0 ? "contained" : "outlined"} 
            sx={{ 
                borderRadius: 2, 
                textTransform: "none",
                bgcolor: i === 0 ? "#000" : '#fff',
                color: i === 0 ? "#fff" : '#000',
                border: i === 0 ? '1px solid #000' : '1px solid #fff' 
            }}
        >
        
            {zone}
        </Button>
    ))}
  </Box>
);

const ControlBar: React.FC<{ floor: number; onFloor: (v: number) => void; query: string; onQuery: (v: string) => void; }>
= ({ floor, onFloor, query, onQuery }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: 'column', md: 'row'}, mb: 2 }}>
    <Box mb={{ xs: 2, md: 0}} width={{ xs: '100%', md: '40%'}}>
        <TextField
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Tìm kiếm"
            size="small"
            fullWidth
            sx={{ bgcolor: "white", borderRadius: 1 }}
            InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
            />
    </Box>
    <Box width={{ xs: '100%', md: '10%'}}>
        <Select size="small" value={String(floor)} onChange={(e: SelectChangeEvent) => onFloor(Number(e.target.value))} sx={{ bgcolor: "white" }}>
        <MenuItem value={"1"}>Tầng 1</MenuItem>
        <MenuItem value={"2"}>Tầng 2</MenuItem>
        <MenuItem value={"3"}>Tầng 3</MenuItem>
        </Select>
    </Box>
  </Box>
);

const MapMuseum = () => {
    const [floor, setFloor] = React.useState(1);
    const [query, setQuery] = React.useState("");

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#cfe6a6", p: 3 }}>
        <ControlBar floor={floor} onFloor={setFloor} query={query} onQuery={setQuery} />

        {/* Khung bản đồ */}
        <Box
            sx={{
            mx: "auto",
            width: 1250,
            bgcolor: "#d7e6be",
            borderRadius: 2,
            p: 2,
            boxShadow: 1,
            mt: {xs: 5, md: 15}
            }}
        >
            <Box
            sx={{
                mx: "auto",
                width: 1200,
                display: "grid",
                gridTemplateColumns: `repeat(24, 1fr)`,
                gridAutoRows: `${TILE_H}px`,
                gap: `${TILE_GAP}px`,
                bgcolor: "#e5e5e5",
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
            }}
            >
            {tiles.map((t) => (
                <TileBox key={t.id} t={t} query={query} />
            ))}
            </Box>

            <Zones />
        </Box>
        </Box>
    );
}

export default MapMuseum;