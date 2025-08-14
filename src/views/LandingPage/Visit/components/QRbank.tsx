import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import {QRCodeCanvas} from "qrcode.react";

interface QRBankProps {
  accountName: string;
  accountNumber: string;
  bankName: string;
  qrValue: string;
}

const QRBank: React.FC<QRBankProps> = ({
  accountName,
  accountNumber,
  bankName,
  qrValue
}) => {
  return (
    <Card
      sx={{
        width: 320,
        borderRadius: 3,
        border: "4px solid #1b4b9b",
        overflow: "hidden",
        textAlign: "center",
        backgroundColor: "#fff",
      }}
    >
      {/* Header VietQR */}
      <Box sx={{ backgroundColor: "#fff", p: 2 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#d81b60", letterSpacing: 1 }}
        >
          VIET
          <Box component="span" sx={{ color: "#000" }}>
            QR
          </Box>
        </Typography>
      </Box>

      {/* QR Code */}
      <CardContent>
        <Box border='1px solid #000'>
            <QRCodeCanvas
                value={qrValue}
                size={200}
                level="H"
                includeMargin={false}
                imageSettings={{
                    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/VietQR_logo.svg/1024px-VietQR_logo.svg.png",
                    height: 40,
                    width: 40,
                    excavate: true
                }}
            />
        </Box>
      </CardContent>

      {/* Bank Logos */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 1 }}>
        <Box component="img" src="https://napas.com.vn/Data/Sites/1/media/logo/napas247.png" sx={{ height: 20 }} />
        <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/0/0a/Logo_BIDV.png" sx={{ height: 20 }} />
      </Box>

      {/* Account Info */}
      <Box sx={{ p: 2 }}>
        <Typography variant="body2">
          Tên chủ TK: <b>{accountName}</b>
        </Typography>
        <Typography variant="body2">
          Số TK: <b>{accountNumber}</b>
        </Typography>
        <Typography variant="body2">{bankName}</Typography>
      </Box>
    </Card>
  );
};

export default QRBank;