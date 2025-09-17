import { Box, Button } from "@mui/material";
import { useState } from "react";
import SearchBox from "../../components/SearchBox";
import { COLORS } from "@/constants/colors";
import { Add } from "@mui/icons-material";

const PaintingManagedByEmployee = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openPainting, setOpenPainting] = useState<{type: string, open: boolean}>({
        type: '',
        open: false
    });
    const handleSearch = (value: string) => {
        setSearchTerm(value)
    };

    return (
        <Box>
            <SearchBox
                initialValue={searchTerm}
                onSearch={handleSearch}
                placeholder="Tìm kiếm theo tên, tác giả, thời kỳ"
            >
                <Button
                    sx={{ border: COLORS.BUTTON, bgcolor: COLORS.BUTTON}}
                    startIcon={<Add/>}
                    onClick={() => {}}
                >
                    Thêm mới tác phẩm
                </Button>
            </SearchBox>
        </Box>
    )
}

export default PaintingManagedByEmployee;