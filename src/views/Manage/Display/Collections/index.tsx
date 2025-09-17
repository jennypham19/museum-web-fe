import Page from "@/components/Page";
import SearchBox from "../../components/SearchBox";
import { useState } from "react";
import { Button } from "@mui/material";
import { COLORS } from "@/constants/colors";
import { Add } from "@mui/icons-material";

const Collections = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openCollection, setOpenCollection] = useState<{type: string, open: boolean}>({
        type: '',
        open: false
    })
    const handleSearch = (value: string) => {
        setSearchTerm(value)
    }
    return(
        <Page title="Quản lý trưng bày - Bộ sưu tập">
            <SearchBox
                initialValue={searchTerm}
                onSearch={handleSearch}
                placeholder="Tìm kiếm theo tên, mô tả..."
            >
                <Button
                    sx={{ border: COLORS.BUTTON, bgcolor: COLORS.BUTTON}}
                    endIcon={<Add/>}
                    onClick={() => {}}
                >
                    Thêm bộ sưu tập
                </Button>
            </SearchBox>
        </Page>
    )
}

export default Collections;