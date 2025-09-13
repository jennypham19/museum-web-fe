import Page from "@/components/Page"
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { COLORS } from "@/constants/colors";
import { Add, NavigateNext } from "@mui/icons-material";
import SearchBox from "../../components/SearchBox";
import IconButton from "@/components/IconButton/IconButton";
import CreateBlog from "../../Blog/components/CreateBlog";

interface BlogManagedByEmployeeProps{
    onSearch: (searchTerm: string) =>  void;
    searchTerm: string
}

const BlogManagedByEmployee = ({ onSearch, searchTerm } : BlogManagedByEmployeeProps) => {
    const [openBlog, setOpenBlog] = useState<{open: boolean, type: string}>({
        open: false,
        type: ''
    });

    const [showAll, setShowAll] = useState(false);
    const [showAllBlog, setShowAllBlog] = useState<{open: boolean, type: string}>({
        open: false,
        type: ''
    });

    const handleOpenAddBlog = () => {
        setOpenBlog({
            open: true,
            type: 'add'
        })
        setShowAll(true)
    }

    const handleSearch = (value: string) => {
        onSearch(value)
    }

    const handleShowAllBlogCreate = () => {
        setShowAll(true)
        setShowAllBlog({
            open: true,
            type: 'pending'
        })
    }

    const handleShowAllBlog = () => {
        setShowAll(true)
        setShowAllBlog({
            open: true,
            type: 'all'
        })
    }
    return (
        <Box>
            {!showAll && (
                <>
                    <SearchBox
                        initialValue={searchTerm}
                        onSearch={handleSearch}
                        placeholder="Tìm kiếm theo tiêu đề...."
                    >
                        <Button
                            sx={{ border: COLORS.BUTTON, bgcolor: COLORS.BUTTON}}
                            endIcon={<Add/>}
                            onClick={handleOpenAddBlog}
                        >
                            Tạo bài viết
                        </Button>
                    </SearchBox>
                    {/* Bài viết vừa tạo */}
                    <Box p={2} onClick={handleShowAllBlogCreate} sx={{ cursor: 'pointer'}} py={2} display='flex' justifyContent='space-between'>
                        <Typography variant="h6" fontWeight={600}>Bài viết vừa tạo</Typography>
                        <Stack>
                            <Typography pt={1} fontWeight={600} variant="subtitle2">Xem thêm</Typography>
                            <IconButton
                                handleFunt={handleShowAllBlogCreate}
                                icon={<NavigateNext sx={{ width: "28px", height: "28px" }} />}
                            />
                        </Stack>
                    </Box>
                    {/* Trạng thái bài viết */}
                    <Box p={2} onClick={handleShowAllBlog} sx={{ cursor: 'pointer'}} py={2} display='flex' justifyContent='space-between'>
                        <Typography variant="h6" fontWeight={600}>Trạng thái bài viết</Typography>
                        <Stack>
                            <Typography pt={1} fontWeight={600} variant="subtitle2">Xem thêm</Typography>
                            <IconButton
                            handleFunt={handleShowAllBlog}
                            icon={<NavigateNext sx={{ width: "28px", height: "28px" }} />}
                            />
                        </Stack>
                    </Box>
                </>
            )}
            {showAll && openBlog.type && (
                <CreateBlog
                    onBack={() => {
                        setShowAll(false)
                        setOpenBlog({
                            open: false,
                            type: 'add'
                        })
                    }}
                />
            )}
        </Box>
    )
}

export default BlogManagedByEmployee;