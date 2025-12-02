import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const MAX_LINES = 20;

const References = () => {
    const [expanded, setExpanded] = useState(false);
    const [shouldShowToggle, setShouldShowToggle] = useState(false);

    const contentRef = useRef<HTMLDivElement>(null);

    const REFERENCES = [
        "Georges Boudaille Gauguin . Paris, 1964, tr. 140, 170, minh họa.",
        "Richard Brettell, Françoise Cachin, Claire Frèches-Thory, Charles F. Stuckey, Peter Zegers, Isabelle Cahn, Gloria Groom, Marla Prather Nghệ thuật của Paul Gauguin. Ví dụ: cat., Phòng trưng bày Nghệ thuật Quốc gia, Washington, 1 tháng 5 - 31 tháng 7 năm 1988; Viện Nghệ thuật Chicago, 17 tháng 9 - 11 tháng 12 năm 1988; Grand Palais, Paris, 10 tháng 1 - 20 tháng 4 năm 1989. Washington, DC, 1988, tr. 425, minh họa. Tranh, bản vẽ và điêu khắc trường phái Ấn tượng và Hiện đại, Phần I. [Danh mục bán hàng]. Sotheby's, London, ngày 3 tháng 12 năm 1991, cat. số 19, minh họa.",
        "Tranh, Bản vẽ và Điêu khắc Ấn tượng và Hiện đại, Phần I. [Danh mục bán đấu giá]. Sotheby's, London, ngày 8 tháng 11 năm 1994, mục số 13, minh họa.",
        "Nghệ thuật Ấn tượng và Hiện đại, Phần I. [Danh mục bán đấu giá]. Sotheby's, New York, New York, ngày 12 tháng 11 năm 1996, mục số 7, minh họa.",
        "George R. Goldner, Colta Ives, Carolyn Logan, Perrin Stein \"Những tác phẩm mới được mua lại, Tuyển tập: 1996-1997.\" trong Bản tin Bảo tàng Nghệ thuật Metropolitan . Bảo tàng Nghệ thuật Metropolitan, ns, tập 55, số 2, Mùa thu năm 1997, hình số. bìa và trang 58, trang 58, minh họa.",
        "Colta Ives, Susan Alyson Stein, Charlotte Hale, Marjorie Shelley Sự quyến rũ của sự kỳ lạ: Gauguin trong các bộ sưu tập ở New York. Ví dụ: mục. Bảo tàng Nghệ thuật Metropolitan, Nhà xuất bản Đại học Yale, New York, 2002, số cat. 104, hình. Trang đầu, trang 130, 200, 202, 203, 205-6, 224, minh họa.",
        "Charles F. Stuckey \"Gauguin, New York.\" Burlington Magazine, 2002, hình. số 77, 582, minh họa.",
        "Gauguin: Người sáng tạo nên huyền thoại. Triển lãm cat., Tate Modern, London, 30 tháng 9 - 16 tháng 1 năm 2011, Phòng trưng bày Nghệ thuật Quốc gia, Washington, DC, 27 tháng 2 - 5 tháng 6 năm 2011. Belinda Thomson và Tamar Garb, Princeton, NJ, 2010, số cat. 144, tr. 214, 243.",
        "Louis-Antoine Prat Le Dessin français au XIXe siècle . Somogy Editions d'Art, Paris, 2011, hình số 1307, tr. 546, minh họa.",
        "Starr Figura, Elizabeth C. Childs, Hal Foster, Erika Mosier Gauguin: Metamorphoses . Bảo tàng Nghệ thuật Hiện đại, New York, New York, 2014, số 163, tr. 196, 202, 229, 245, minh họa.",
        "Christopher Lloyd Impressionist and Post-Impressionist Drawings. Thames and Hudson, London."
    ];
    // Đo overflow để quyết định có hiện nút hay không
    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;

        // Tạm bật clamp trước khi đo
        el.style.display = "-webkit-box";
        el.style.webkitLineClamp = String(MAX_LINES);

        requestAnimationFrame(() => {
            const isOverflowing = el.scrollHeight > el.clientHeight;
            setShouldShowToggle(isOverflowing);
        });
    }, []);

    // Xử lý mở rộng/thu gọn
    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;

        if (expanded) {
            // Xoá clamp hoàn toàn
            el.style.display = "block";
            el.style.webkitLineClamp = "";
        } else {
            // Áp lại clamp
            el.style.display = "-webkit-box";
            el.style.webkitLineClamp = String(MAX_LINES);
        }
    }, [expanded]);

    return (
        <Box mt={1}>
            <Stack
                ref={contentRef}
                direction="column"
                sx={{
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitBoxOrient: "vertical",
                }}
            >
                {REFERENCES.map((text, index) => (
                    <Typography key={index} fontSize={{ xs: "16px", md: "18px" }}>
                        {text}
                    </Typography>
                ))}
            </Stack>

            {/* Chỉ hiện nút Xem thêm nếu nội dung bị overflow */}
            {shouldShowToggle && (
                <Box mt={1}>
                    <IconButton onClick={() => setExpanded((prev) => !prev)} sx={{ p: 0, "&:hover": { bgcolor: 'transparent' } }}>
                        <Typography sx={{ "&:hover": { textDecoration: 'underline' }}} fontSize="16px" fontWeight={500}>
                            {expanded ? "Thu gọn" : "Xem thêm"}
                        </Typography>
                        {expanded ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export default References;
