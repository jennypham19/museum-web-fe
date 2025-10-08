import { useState } from "react";
import { NavigateBefore } from "@mui/icons-material";
import { Alert, Box, Button, Chip, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Backdrop from "@/components/Backdrop";
import IconButton from "@/components/IconButton/IconButton";
import { useDataList } from "@/hooks/useDataList";
import { getPaintings, PaintingPublished, publishPainting } from "@/services/display-service";
import { DataStatusProps, FormDataPainting, IPainting } from "@/types/display";
import CardData from "@/views/Manage/components/CardData";
import FilterTabs from "@/views/Manage/components/FilterTabs";
import SearchBox from "@/views/Manage/components/SearchBox";
import { getStatusLabel, getStatusLabelColor } from "@/utils/labelEntoVni";
import CustomPagination from "@/components/Pagination/CustomPagination";
import useNotification from "@/hooks/useNotification";
import ViewPainting from "./ViewPainting";
import EditPainting from "./EditPainting";
import DialogConfirm from "@/views/Manage/components/DialogConfirm";
import NavigateBack from "@/views/Manage/components/NavigateBack";


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

export type FormErrors = {
    [K in keyof FormDataPainting]?: string;
};

const AllPaintings: React.FC<AllPaintingsProps> = ({ onBack }) => {
    const notify = useNotification();
    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState<FormDataPainting>({
        name: '',
        author: '',
        period: '',
        description: '',
        images: []
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [image, setImage] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [errorImg, setErrorImg] = useState<string>('');
    const [errorImgs, setErrorImgs] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [viewMode, setViewMode] = useState<'all' | 'pending' | 'reviewing' | 'approved' | 'rejected'>('all');
    const [openViewPainting, setOpenViewPainting] = useState(false);
    const [openEditPainting, setOpenEditPainting] = useState(false);
    const [openPublishPainting, setOpenPublishPainting] = useState(false);
    const [painting, setPainting] = useState<IPainting | null>(null);

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
      setOpenViewPainting(true);
      setPainting(data)
    }

    const handleOpenEditPainting = (data: IPainting) => {
      setOpenEditPainting(true);
      setFormData({
        name: data.name,
        author: data.author,
        period: data.period,
        description: data.description,
        images: data.images
      })
      setImage(data.imageUrl)
      setPainting(data)
    }

    const handleCloseViewPainting = () => {
      setOpenViewPainting(false);
      setPainting(null)
    }

    const handleOpenPublishPainting = (data: IPainting) => {
      setOpenPublishPainting(true)
      setPainting(data)
    }
    
    const handlePublishPaiting = async () => {
      try {
        const payload: PaintingPublished = {
          is_published: !painting?.isPublished
        };

        const res = painting && await publishPainting(painting?.id, payload);
        notify({ message: res?.message, severity: 'success' });
        setOpenPublishPainting(false)
        fetchData(page, rowsPerPage, viewMode)
      } catch (error: any) {
        notify({ message: error.message, severity: 'error' })
      } 
    }

    const handleCloseEditPainting = () => {
        setOpenEditPainting(false);
        setFormData({ name: '', author: '', period: '', description: '', images: []});
        setErrors({});
        setErrorImg('');
        setErrorImgs('');
        setImage(null);     // reset ảnh chính
        setImages([]);      // reset nhiều ảnh
        setImageFile(null);
        setImageFiles([]);
    }

    const handleInputChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value}));
        if(errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }
    const handleFileSelect = (file: File | null) => {
        setImageFile(file);
        setErrorImg('');
    }
    const handleFilesSelect = (files: File[]) => {
        setImageFiles(prev => [...prev, ...files]);
        setErrorImgs('')
    }
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if(!formData.name) newErrors.name = 'Vui lòng nhập tên.';
        if(!formData.author) newErrors.author = 'Vui lòng nhập tác giả';
        if(!formData.period) newErrors.period = 'Vui lòng nhập thời kỳ';
        if(!formData.description) newErrors.description = 'Vui lòng nhập mô tả';
        if(!imageFile) {
            setErrorImg('Vui lòng tải lên hình ảnh.');
        };
        if(imageFiles.length === 0) {
            setErrorImgs('Vui lòng tải lên các hình ảnh.')
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0 && !!imageFile && imageFiles.length > 0;
    }

    const handleSubmit = async () => {
      if(!validateForm()) {
        return;
      }
      
    }
    
    return (
      <Box>
        {(!openEditPainting) && (
          <>
            <SearchBox
              initialValue={searchTerm}
              onSearch={handleSearch}
              placeholder='Tìm kiếm theo tên, tác giả, thời kỳ....'
            />
            <NavigateBack onBack={onBack} title="Trạng thái tác phẩm"/>
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
                                        {(painting.status === 'pending' || painting.status === 'rejected') && (
                                          <Button
                                            fullWidth
                                            variant="outlined" sx={{ border: '1px solid #000', color: '#000'}}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              painting && handleOpenEditPainting(painting)
                                            }}
                                          >
                                            Chỉnh sửa
                                          </Button>
                                        )}
                                        {painting.status === 'approved' && (
                                          <Button
                                            fullWidth
                                            variant="outlined" sx={{ border: '1px solid #000', color: '#000'}}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              painting && handleOpenPublishPainting(painting)
                                            }}
                                          >
                                            {painting.isPublished ? 'Hủy đăng tải' : 'Đăng tải'}
                                          </Button>
                                        )}
                                      </Box>
                                    </>
                                  )}
                                />
                              </Grid>
                            );
                        })
                    )}
                </Grid>
                <Box display='flex' justifyContent='center' alignItems='center'>
                  <CustomPagination
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    count={total}
                    sx={{ my: 1.5 }}
                  />
                </Box>
              </>
            )}
          </>
        )}
        {openViewPainting && painting && (
          <ViewPainting
            open={openViewPainting}
            data={painting}
            onClose={handleCloseViewPainting}
          />
        )}
        {openEditPainting && painting && (
          <>
            <EditPainting
              data={painting}
              error={{ errorImg, errorImgs }}
              onFileSelect={handleFileSelect}
              onFilesSelect={handleFilesSelect}
              errors={errors}
              formData={formData}
              image={image}
              images={formData.images.map(img => img.url)}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onClose={handleCloseEditPainting}
            />
            <Backdrop open={isSubmitting} />
          </>
        )}
        {openPublishPainting && painting && (
          <DialogConfirm
            open={openPublishPainting}
            title={painting.isPublished ? "Bạn chắc chắn muốn hủy đăng tải tác phẩm?" :"Bạn chắc chắn muốn đăng tác phẩm lên page hay không?"}
            handleAgree={handlePublishPaiting}
            onClose={() => setOpenPublishPainting(false)}
          />
        )}
      </Box>
    );
}

export default AllPaintings;