import { useState } from "react";



import { NavigateBefore } from "@mui/icons-material";
import { Alert, Box, Chip, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Backdrop from "@/components/Backdrop";
import IconButton from "@/components/IconButton/IconButton";



import { useDataList } from "@/hooks/useDataList";
import { getPaintings } from "@/services/display-service";
import { DataStatusProps, IPainting } from "@/types/display";
import CardData from "@/views/Manage/components/CardData";
import FilterTabs from "@/views/Manage/components/FilterTabs";
import SearchBox from "@/views/Manage/components/SearchBox";
import { getStatusLabel, getStatusLabelColor } from "@/utils/labelEntoVni";


interface AllPaintingsProps {
    onBack: () => void;
}

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

const AllPaintings: React.FC<AllPaintingsProps> = ({ onBack }) => {
    const [viewMode, setViewMode] = useState<'all' | 'pending' | 'reviewing' | 'approved' | 'rejected'>('all');

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

    console.log('listData: ', listData);
    
    return (
      <Box>
        <SearchBox
          initialValue={searchTerm}
          onSearch={handleSearch}
          placeholder='Tìm kiếm theo tên, tác giả, thời kỳ....'
        />
        <Stack my={1}>
          <IconButton
            handleFunt={onBack}
            icon={<NavigateBefore sx={{ width: '28px', height: '28px' }} />}
          />
          <Typography pt={0.2} fontWeight={600} variant='h6'>
            Trạng thái tác phẩm
          </Typography>
        </Stack>
        <Box m={2}>
          <FilterTabs data={DataStatus} viewMode={viewMode} onChange={setViewMode} />
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
                        return (
                          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                            <CardData
                              data={painting}
                              imageUrl={painting.imageUrl}
                              title={painting.name}
                              onOpenDetail={() => {}}
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
                                    >{`Nghệ sĩ: ${painting.author}`}</Typography>
                                    <Typography
                                      fontSize={{ xs: '14px', md: '15px' }}
                                    >{`Thời gian: ${painting.period}`}</Typography>
                                  </Stack>
                                </>
                              )}
                            />
                          </Grid>
                        );
                    })
                )}
            </Grid>
          </>
        )}
      </Box>
    );
}

export default AllPaintings;