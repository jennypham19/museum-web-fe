import { useDataList } from "@/hooks/useDataList";
import { getPaintings } from "@/services/display-service";
import { DataStatusProps, IPainting } from "@/types/display";
import { Alert, Box, Button, Chip, Stack, Typography } from "@mui/material";
import { useState } from "react";
import SearchBox from "../../components/SearchBox";
import FilterTabs from "../../components/FilterTabs";
import Backdrop from "@/components/Backdrop";
import Grid from "@mui/material/Grid2";
import CardData from "../../components/CardData";
import { getStatusLabel, getStatusLabelColor } from "@/utils/labelEntoVni";
import useAuth from "@/hooks/useAuth";
import { ROLE } from "@/constants/roles";
import CustomPagination from "@/components/Pagination/CustomPagination";
import ViewPainting from "../../Display/Picture/components/ViewPainting";
import ApproveAndRejectPainting from "../../Display/Picture/components/ApproveAndRejectPainting";

const DataStatus: DataStatusProps[] = [
  {
    id: 1,
    value: 'all',
    label: 'Tất cả',
  },
  {
    id: 2,
    value: 'pending',
    label: 'Tác phẩm chờ duyệt',
  },
  {
    id: 3,
    value: 'reviewing',
    label: 'Tác phẩm đang duyệt',
  },
  {
    id: 4,
    value: 'approved',
    label: 'Tác phẩm đã phê duyệt',
  },
  {
    id: 5,
    value: 'rejected',
    label: 'Tác phẩm thất bại',
  },
];

const PaintingManagedByAdmin = () => {
    const [viewMode, setViewMode] = useState<'all' | 'pending' | 'reviewing' | 'approved' | 'rejected'>('all');
    const { profile } = useAuth();
    const [openViewPainting, setOpenViewPainting] = useState(false);
    const [painting, setPainting] = useState<IPainting | null>(null);
    const [openPainting, setOpenPainting] = useState<{open: boolean, type: string}>({
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
    } = useDataList<IPainting>(getPaintings, 8, viewMode);

    const handleOpenViewPainting = (data: IPainting) => {
        setOpenViewPainting(true)
        setPainting(data)
    }

    const handleOpenApprovePainting = (data: IPainting) => {
        setPainting(data);
        setOpenPainting({ open: true, type: 'approve'})
    }

    const handleOpenRejectPainting = (data: IPainting) => {
        setPainting(data);
        setOpenPainting({ open: true, type: 'reject'})
    }

    const handleClosePainting = () => {
        setPainting(null);
        if(openPainting.type === 'approve') {
            setOpenPainting({ open: false, type: 'approve'});
        }else{
            setOpenPainting({ open: false, type: 'reject'});
        }
        fetchData(page, rowsPerPage, viewMode)
    }

    return (
        <Box>
            {!openPainting.open && (
                <>
                    <SearchBox
                        initialValue={searchTerm}
                        onSearch={handleSearch}
                        placeholder="Tìm kiếm theo tên, tác giả, thời kỳ..."
                    />
                    <Box m={2}>
                        <FilterTabs data={DataStatus} viewMode={viewMode} onChange={setViewMode}/>
                    </Box>
                    {loading && <Backdrop open={loading} />}
                    {error && !loading && (
                    <Alert severity='error' sx={{ my: 2 }}>
                        {error}
                    </Alert>
                    )}
                    {!loading && !error && (
                        <>
                            <Grid sx={{ px: 1.5 }} container spacing={3}>
                                {listData.length === 0 ? (
                                    <Typography>Không tồn tại bản ghi nào.</Typography>
                                ) : (
                                    listData.map((painting, index) => {
                                        return(
                                            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                                <CardData
                                                    data={painting}
                                                    imageUrl={painting.imageUrl}
                                                    title={painting.name}
                                                    onOpenDetail={handleOpenViewPainting}
                                                    renderData={(painting) => (
                                                        <>
                                                            <Stack px={2} pb={2} direction='column'>
                                                                <Stack display='flex' justifyContent='flex-end'>
                                                                    {painting.status && (
                                                                        <Chip
                                                                        label={getStatusLabel(painting.status)}
                                                                        color={getStatusLabelColor(painting.status).color}
                                                                        />
                                                                    )}
                                                                </Stack>
                                                                <Typography
                                                                    fontWeight={700}
                                                                    fontSize={{ xs: '16px', md: '20px' }}
                                                                >
                                                                    {painting.name}
                                                                </Typography>
                                                                <Typography
                                                                    fontSize={{ xs: '14px', md: '15px' }}
                                                                >
                                                                    {`Nghệ sĩ: ${painting.author}`}
                                                                </Typography>
                                                                <Typography
                                                                    fontSize={{ xs: '14px', md: '15px' }}
                                                                >
                                                                    {`Thời gian: ${painting.period}`}
                                                                </Typography>
                                                            </Stack>
                                                            <Box px={2} pb={2}>
                                                                {(painting.status === 'pending' && profile?.role === ROLE.MOD) && (
                                                                    <Box display='flex' justifyContent='space-between'>
                                                                        <Button
                                                                            fullWidth
                                                                            variant="outlined" sx={{ border: '1px solid #000', color: '#000', mr: 1.5 }}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                painting && handleOpenApprovePainting(painting)
                                                                            }}
                                                                        >
                                                                            Duyệt
                                                                        </Button>
                                                                        <Button
                                                                            fullWidth
                                                                            variant="outlined" sx={{ border: '1px solid #000', color: '#000'}}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                painting && handleOpenRejectPainting(painting)
                                                                            }}
                                                                        >
                                                                            Từ chối
                                                                        </Button>
                                                                    </Box>
                                                                )}
                                                                {painting.status === 'reviewing' && profile?.role === ROLE.ADMIN && (
                                                                    <Box display='flex' justifyContent='space-between'>
                                                                        <Button
                                                                            fullWidth
                                                                            variant="outlined" sx={{ border: '1px solid #000', color: '#000', mr: 1.5 }}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                painting && handleOpenApprovePainting(painting)
                                                                            }}
                                                                        >
                                                                            Duyệt
                                                                        </Button>
                                                                        <Button
                                                                            fullWidth
                                                                            variant="outlined" sx={{ border: '1px solid #000', color: '#000'}}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                painting && handleOpenRejectPainting(painting)
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
                            <CustomPagination
                                page={page}
                                rowsPerPage={rowsPerPage}
                                count={total}
                                onPageChange={handlePageChange}
                                sx={{ my: 1.5 }}
                            />
                        </>
                    )}                
                </>
            )}

            {openViewPainting && painting && (
                <ViewPainting
                    open={openViewPainting}
                    data={painting}
                    onClose={() => {
                        setOpenViewPainting(false);
                        setPainting(null)
                    }}
                />
            )}
            {openPainting.open && painting && (
                <ApproveAndRejectPainting
                    type={openPainting.type}
                    data={painting}
                    onClose={handleClosePainting}
                />
            )}
        </Box>
    )
}

export default PaintingManagedByAdmin;
