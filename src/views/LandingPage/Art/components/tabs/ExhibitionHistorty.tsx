import { Box, Typography } from "@mui/material";

interface ExhibitionHistoryProps{

}

const ExhibitionHistory = (props: ExhibitionHistoryProps) => {
    const { } = props;
    return(
        <Box>
            <Typography mb={1.5} fontSize={{ xs: '16px', md: '18px'}}>
                New York. Bảo tàng Nghệ thuật Metropolitan. "Bản vẽ và Bản in: Tuyển chọn từ Bộ sưu tập Thường trực", 6 tháng 1–13 tháng 4 năm 1997.
            </Typography>
            <Typography mb={1.5} fontSize={{ xs: '16px', md: '18px'}}>
                New York. Bảo tàng Nghệ thuật Metropolitan. "Sức hút của Sự kỳ lạ: Gauguin trong các Bộ sưu tập New York", 18 tháng 6–20 tháng 10 năm 2002.
            </Typography>
            <Typography mb={1.5} fontSize={{ xs: '16px', md: '18px'}}>
                New York. Bảo tàng Nghệ thuật Metropolitan. "Những năm tháng của Philippe de Montebello: Các nhà quản lý kỷ niệm ba thập kỷ mua tác phẩm", 24 tháng 10 năm 2008–1 tháng 2 năm 2009.
            </Typography>
            <Typography mb={1.5} fontSize={{ xs: '16px', md: '18px'}}>
                Tate Modern. "Paul Gauguin: Người sáng tạo Huyền thoại", 30 tháng 9 năm 2010–16 tháng 1 năm 2011.
            </Typography>
            <Typography mb={1.5} fontSize={{ xs: '16px', md: '18px'}}>
                Phòng trưng bày Nghệ thuật Quốc gia, Washington D.C. "Paul Gauguin: Người sáng tạo Huyền thoại", 27 tháng 2 năm 2011–5 tháng 6 năm 2011.
            </Typography>
            <Typography mb={1.5} fontSize={{ xs: '16px', md: '18px'}}>
                Bảo tàng Nghệ thuật Hiện đại, New York. "Gauguin: Biến Hình," 8 tháng 3, 2014–8 tháng 6, 2014.
            </Typography>
            <Typography mb={1.5} fontSize={{ xs: '16px', md: '18px'}}>
                New York. Bảo tàng Nghệ thuật Metropolitan. "Paper Chase: Hai Thập kỷ Sưu tầm Tranh vẽ và Bản in," 9 tháng 12, 2014–16 tháng 3, 2015.
            </Typography>
            <Typography mb={1.5} fontSize={{ xs: '16px', md: '18px'}}>
                New York. Bảo tàng Nghệ thuật Metropolitan. "Tuyển chọn từ Bộ phận Tranh vẽ và Bản in: Những Điểm nhấn Kỷ niệm," 8 tháng 10, 2020–18 tháng 1, 2021.
            </Typography>
            <Typography mb={1.5} fontSize={{ xs: '16px', md: '18px'}}>
                Việt Nam. Bảo tàng nghệ thuật Kính màu. "Tuyển chọn từ hàng nghìn tác phẩm tranh kính" 15 tháng 10, 2022 - đến nay.
            </Typography>
        </Box>
    )
}

export default ExhibitionHistory;