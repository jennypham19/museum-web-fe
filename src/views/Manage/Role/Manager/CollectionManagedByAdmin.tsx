import useAuth from "@/hooks/useAuth";
import { useDataList } from "@/hooks/useDataList";
import { getObjectDisplay } from "@/services/display-service";
import { DataStatusProps, ICollection } from "@/types/display";
import { Alert, Box, Button, Chip, Stack, Typography } from "@mui/material";
import { useState } from "react";
import SearchBox from "../../components/SearchBox";
import FilterTabs from "../../components/FilterTabs";
import Backdrop from "@/components/Backdrop";
import Grid from "@mui/material/Grid2";
import CardData from "../../components/CardData";
import { getStatusLabel, getStatusLabelColor } from "@/utils/labelEntoVni";
import { ROLE } from "@/constants/roles";
import ViewCollection from "../../Display/Collections/components/ViewCollection";
import ApproveAndRejectCollecion from "../../Display/Collections/components/ApproveAndRejectCollection";
import CustomPagination from "@/components/Pagination/CustomPagination";

const DataStatus: DataStatusProps[] = [
  {
    id: 1,
    value: 'all',
    label: 'Tất cả',
  },
  {
    id: 2,
    value: 'pending',
    label: 'Bộ sưu tập chờ duyệt',
  },
  {
    id: 3,
    value: 'reviewing',
    label: 'Bộ sưu tập đang duyệt',
  },
  {
    id: 4,
    value: 'approved',
    label: 'Bộ sưu tập đã phê duyệt',
  },
  {
    id: 5,
    value: 'rejected',
    label: 'Bộ sưu tập thất bại',
  },
];

const CollectionManagedByAdmin = () => {
    const [viewMode, setViewMode] = useState<'all' | 'pending' | 'reviewing' | 'approved' | 'rejected'>('all');
    const { profile } = useAuth();
    const [collection, setCollection] = useState<ICollection | null>(null);
    const [openCollection, setOpenCollection] = useState<{open: boolean, type: string}>({
        open: false,
        type: ''
    })

    const { 
        listData,
        searchTerm,
        loading,
        error,
        handlePageChange,
        handleSearch,
        total,
        page,
        rowsPerPage,
        fetchData,
    } = useDataList<ICollection>((params) => getObjectDisplay(params, 'collections'), 8, viewMode)

    // Chi tiết bộ sưu tập
    const handleOpenViewCollection = (data: ICollection) => {
        setCollection(data)
        setOpenCollection({ open: true, type: 'view' })
    }

    const handleCloseViewCollection = () => {
        setCollection(null);
        setOpenCollection({ open: false, type: 'view' })
    }

    // Phê duyệt bộ sưu tập
    const handleOpenApproveCollection = (data: ICollection) => {
        setCollection(data);
        setOpenCollection({ open: true, type: 'approve'})
    }
    
    const handleCloseApproveCollection = () => {
        setCollection(null)
        setOpenCollection({ open: false, type: 'approve'})
        fetchData(page, rowsPerPage, viewMode)
    }

    // Từ chối tác phẩm
    const handleOpenRejectCollection = (data: ICollection) => {
        setCollection(data);
        setOpenCollection({ open: true, type: 'reject'})
    }
    
    const handleCloseRejectCollection = () => {
        setCollection(null)
        setOpenCollection({ open: false, type: 'reject'})
        fetchData(page, rowsPerPage, viewMode)
    }
    return(
        <Box>
            {!openCollection.open && (
                <>
                    <SearchBox
                        initialValue={searchTerm}
                        onSearch={handleSearch}
                        placeholder="Tìm kiếm theo tên, chủ đề...."
                    />
                    <Box m={2}>
                        <FilterTabs data={DataStatus} viewMode={viewMode} onChange={setViewMode}/>
                    </Box>
                    {loading && <Backdrop open={loading}/>}
                    {error && !loading && (
                        <Alert severity="error" sx={{ my: 2}}>{error}</Alert>
                    )}
                    {!loading && !error && (
                        <>
                            <Grid sx={{ px: 1.5 }} container spacing={3}>
                                {listData.length === 0 ? (
                                    <Typography>Không tồn tại bản ghi nào.</Typography>
                                ) : (
                                    listData.map((collection, index) => {
                                        return (
                                            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3}}>
                                                <CardData
                                                    data={collection}
                                                    imageUrl={collection.imageUrl}
                                                    title={collection.name}
                                                    onOpenDetail={handleOpenViewCollection}
                                                    renderData={(collection) => (
                                                        <>
                                                            <Stack px={2} pb={2} direction='column'>
                                                                <Stack display='flex' justifyContent='flex-end'>
                                                                    {collection.status && (
                                                                        <Chip
                                                                            label={getStatusLabel(collection.status)}
                                                                            color={getStatusLabelColor(collection.status).color}
                                                                        />
                                                                    )}
                                                                </Stack>
                                                                <Typography fontWeight={700} fontSize={{ xs: '16px', md: '20px'}}>{collection.name}</Typography>
                                                                <Typography 
                                                                    fontSize={{ xs: '14px', md: '15px'}}
                                                                    sx={{
                                                                        opacity: 0.8, 
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        display: '-webkit-box',
                                                                        WebkitLineClamp: 2,
                                                                        WebkitBoxOrient: 'vertical',
                                                                        whiteSpace: 'normal',
                                                                        wordBreak: 'break-word',  
                                                                    }}
                                                                >
                                                                    {collection.description}
                                                                </Typography>
                                                            </Stack>
                                                            <Box px={2} pb={2}>
                                                                {(collection.status === 'pending' && profile?.role === ROLE.MOD) && (
                                                                    <Box display='flex' justifyContent='space-between'>
                                                                        <Button
                                                                            fullWidth
                                                                            variant="outlined"
                                                                            sx={{ border: '1px solid #000', color: '#000', mr: 1.5}}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                collection && handleOpenApproveCollection(collection)
                                                                            }}
                                                                        >
                                                                            Duyệt
                                                                        </Button>
                                                                        <Button
                                                                            fullWidth
                                                                            variant="outlined"
                                                                            sx={{ border: '1px solid #000', color: '#000'}}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                collection && handleOpenRejectCollection(collection)
                                                                            }}
                                                                        >
                                                                            Từ chối
                                                                        </Button>
                                                                    </Box>
                                                                )}
                                                                {(collection.status === 'reviewing' && profile?.role === ROLE.ADMIN) && (
                                                                    <Box display='flex' justifyContent='space-between'>
                                                                        <Button
                                                                            fullWidth
                                                                            variant="outlined"
                                                                            sx={{ border: '1px solid #000', color: '#000', mr: 1.5 }}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                collection && handleOpenApproveCollection(collection)
                                                                            }}
                                                                        >
                                                                            Duyệt
                                                                        </Button>
                                                                        <Button
                                                                            fullWidth
                                                                            variant="outlined"
                                                                            sx={{ border: '1px solid #000', color: '#000'}}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                collection && handleOpenRejectCollection(collection)
                                                                            }}
                                                                        >
                                                                            Từ chối
                                                                        </Button>
                                                                    </Box>
                                                                )}
                                                            </Box>
                                                        </>
                                                    )}
                                                />
                                            </Grid>
                                        )
                                    })
                                )}
                            </Grid>
                            <Box display='flex' justifyContent='center'>
                                <CustomPagination
                                    page={page}
                                    count={total}
                                    rowsPerPage={rowsPerPage}
                                    onPageChange={handlePageChange}
                                />
                            </Box>
                        </>
                    )}
                </>
            )}
            {openCollection.open && openCollection.type === 'view' && collection && (
                <ViewCollection
                    data={collection}
                    onClose={handleCloseViewCollection}
                />
            )}
            {openCollection.open && openCollection.type === 'approve' && collection && (
                <ApproveAndRejectCollecion
                    data={collection}
                    type={openCollection.type}
                    onClose={handleCloseApproveCollection}
                />
            )}
            {openCollection.open && openCollection.type === 'reject' && collection && (
                <ApproveAndRejectCollecion
                    data={collection}
                    type={openCollection.type}
                    onClose={handleCloseRejectCollection}
                />
            )}
        </Box>
    )
}
export default CollectionManagedByAdmin;

