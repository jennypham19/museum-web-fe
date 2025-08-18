import InputSearch from "@/components/SearchBar";
import { Box } from "@mui/material";
import { ReactNode } from "react";

interface SearchBoxProps{
    children?: ReactNode,
    onSearch: (data: string) => void;
    initialValue: string;
    placeholder?: string;
}
const SearchBox = ({
    children,
    onSearch,
    initialValue,
    placeholder = 'Tìm kiếm'
} : SearchBoxProps) => {
    return (
        <Box py={1.5} borderTop='1px solid grey' bgcolor='#FFFFFF' display='flex' justifyContent={{ xs: 'flex-start', md: 'space-between'}} flexDirection={{ xs: 'column', md: 'row'}}>
            <Box px={4} sx={{ width: { xs: '100%', md: '50%'}}}>
                <InputSearch
                    onSearch={onSearch}
                    initialValue={initialValue}
                    placeholder={placeholder}
                    colorIcon="#000"
                    color="#000"
                />
            </Box>
            {children && (
                <Box display='flex' justifyContent={{ xs: 'center', md: 'flex-end'}} mt={{ xs: 1.5, md: 0}} px={4}>
                    {children}
                </Box>
            )}
        </Box>
    )
}

export default SearchBox;