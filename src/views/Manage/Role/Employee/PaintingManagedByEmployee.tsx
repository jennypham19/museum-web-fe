import { useMemo, useState } from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ViewPainting from "../../Display/Picture/components/ViewPainting";
import { FormDataPainting, IPainting } from "@/types/display";
import OverviewDataCreate from "../../components/OverviewDataCreate";
import OverviewData from "../../components/OverviewData";
import CardData from "../../components/CardData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPaintings } from "@/services/display-service";
import AllPaintingsCreated from "../../Display/Picture/components/AllPaintingsCreated";
import { getStatusLabel, getStatusLabelColor } from "@/utils/labelEntoVni";


interface PaintingManagedByEmployeeProps {
  
}

export type FormErrors = {
    [K in keyof FormDataPainting]?: string;
};

const PaintingManagedByEmployee = () => {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openPainting, setOpenPainting] = useState<{type: string, open: boolean}>({
        type: '',
        open: false
    });
    const [showAll, setShowAll] = useState(false);
    const [showAllPaintings, setShowAllPaintings] = useState<{open: boolean, type: string}>({
        open: false,
        type: ''
    });
    const [painting, setPainting] = useState<IPainting | null> (null);

    const { data } = useQuery({
      queryKey: ['data', 'created', page, rowsPerPage],
      queryFn: () => {
        return getPaintings({ page, limit: rowsPerPage, status: 'created'});
      },
      placeholderData: keepPreviousData
    });

    const paintingsCreated = data?.data?.data as any as IPainting[];

    const { data: paintings } = useQuery({
      queryKey: ['data', ['pending', 'reviewing', 'approved', 'rejected'], page, rowsPerPage],
      queryFn: () => {
        return getPaintings({ page, limit: rowsPerPage, status: ['pending', 'reviewing', 'approved', 'rejected'] });
      },
      placeholderData: keepPreviousData
    });
    const paintingsStatus = paintings?.data?.data as any as IPainting[];
  
    const handleOpenViewPainting = (data: IPainting) => {
        setOpenPainting({
            type: 'view',
            open: true
        });
        setPainting(data)
    }

    const handleCloseViewPainting = () => {
        setOpenPainting({
            type: 'view',
            open: false
        });
        setPainting(null)
    }

    const handleShowAllPaintingsCreate = () => {
      setShowAll(true)
      setShowAllPaintings({
        open: true,
        type: 'created'
      })
    }

    const handleShowAllPaintings = () => {
      setShowAll(true)
      setShowAllPaintings({
        open: true,
        type: 'all'
      })
    }

    // Tính toán danh sách hiển thị
    const displayedPaintingsCreated = useMemo(() => {
        if (paintingsCreated?.length === 0) return [];
        return showAllPaintings.type === 'created' ? paintingsCreated : paintingsCreated?.slice(0, 4);
    }, [paintingsCreated, showAllPaintings]);

    const displayedPaintings = useMemo(() => {
      if(paintingsStatus?.length === 0) return [];
      return showAllPaintings.type === 'all' ? paintingsStatus : paintingsStatus?.slice(0,4);
    }, [paintingsStatus, showAllPaintings])

    return (
      <Box>
        {!showAll && (
          <>
            <OverviewDataCreate
              title="Tác phẩm vừa tạo"
              onShowAllCreate={handleShowAllPaintingsCreate}
            >
              <Box px={2}>
                  <Grid container spacing={3}>
                    {displayedPaintingsCreated?.length === 0 && (
                      <Typography fontWeight={700} p={4}>Không tồn tại bản ghi nào cả</Typography>
                    )}
                    {displayedPaintingsCreated?.map((painting, index) => {
                      return(
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 3}}>
                          <CardData
                            data={painting}
                            imageUrl={painting.imageUrl}
                            title={painting.name}
                            onOpenDetail={handleOpenViewPainting}
                            renderData={(painting) => (
                              <Stack px={2} pb={2} direction='column'>
                                <Typography fontWeight={700} fontSize={{ xs: '16px', md: '20px'}}>{painting.name}</Typography>
                                <Typography fontSize={{ xs: '14px', md: '15px'}}>{`Nghệ sĩ: ${painting.author}`}</Typography>
                                <Typography fontSize={{ xs: '14px', md: '15px'}}>{`Thời gian: ${painting.period}`}</Typography>
                              </Stack>
                            )}
                          />
                        </Grid>
                      )
                    })}
                  </Grid>
              </Box>
            </OverviewDataCreate>
            <OverviewData
              title="Trạng thái tác phẩm"
              onShowAll={handleShowAllPaintings}
            >
              <Box px={2}>
                  <Grid container spacing={3}>
                    {displayedPaintings?.length === 0 && (
                      <Typography fontWeight={700} p={4}>Không tồn tại bản ghi nào cả</Typography>
                    )}
                    {displayedPaintings?.map((painting, index) => {
                      return (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                          <CardData
                            data={painting}
                            imageUrl={painting.imageUrl}
                            title={painting.name}
                            onOpenDetail={handleOpenViewPainting}
                            renderData={(painting) => (
                              <Stack px={2} pb={2} direction='column'>
                                <Stack display='flex' justifyContent='flex-end'>
                                    {painting.status && (
                                      <Chip
                                        label={getStatusLabel(painting.status)}
                                        // color={getStatusLabelColor(painting.status).color}
                                      />                                      
                                    )}
                                </Stack>
                                <Typography fontWeight={700} fontSize={{ xs: '16px', md: '20px'}}>{painting.name}</Typography>
                                <Typography fontSize={{ xs: '14px', md: '15px'}}>{`Nghệ sĩ: ${painting.author}`}</Typography>
                                <Typography fontSize={{ xs: '14px', md: '15px'}}>{`Thời gian: ${painting.period}`}</Typography>
                              </Stack>
                            )}
                          />
                        </Grid>
                      )
                    })}
                  </Grid>
              </Box>
            </OverviewData>
          </>
        )}
        {showAll && showAllPaintings.open && showAllPaintings.type === 'created' && (
          <AllPaintingsCreated
            onBack={() => {
              setShowAll(false)
              setShowAllPaintings({
                open: false,
                type: 'created'
              })
            }}
          />
        )}

        {/* Chi tiết bản ghi */}
        {openPainting.open && openPainting.type === 'view' && painting && (
          <ViewPainting
            open={openPainting.open}
            data={painting}
            onClose={handleCloseViewPainting}
          />
        )}
      </Box>
    );
}

export default PaintingManagedByEmployee;