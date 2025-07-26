import IconButton from "@/components/IconButton/IconButton";
import { Box, Card, CardMedia, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import Grid from "@mui/material/Grid2"
import { DATA_COLLECTION } from "@/constants/data";

const ExploreMore = () => {
    const navigate = useNavigate();
    const handleNavigate = (id: number) => {
        navigate(`detail-article/${id}`)
    }
    return (
        <Box>
            <Box display='flex' flexDirection='row' py={{ xs: 0, md: 1.5}} px={{ xs: 2, md: 10}}>
                <IconButton
                    handleFunt={() => navigate(-1)}
                    icon={<HomeIcon sx={{ width: { xs: 20, md: 30 }, height: { xs: 20, md: 30 }, color: '#000'}}/>}
                />
                <Typography mt={{ xs: 1, md: 1}} fontWeight={600} fontSize={{ xs: '12px', md: '18px'}}>/ Kế hoạch thăm quan/ Khám phá nhiều hơn</Typography> 
            </Box>
            <Box display='flex' flexDirection='column' py={{ xs: 1.5, md: 2}} px={{ xs: 2, md: 10}}>
                <Typography variant="h5" fontWeight={600}>Các tác phẩm nổi tiếng của Tiffany</Typography>
                <Typography fontSize={{ xs: '13px', md: '16px'}} pt={3} pb={2} sx={{ whiteSpace: 'normal', wordBreak: 'break-word', borderBottom: '1px solid grey'}}>
                    Những mảnh ghép đầy màu sắc quy tụ lên một tác phẩm nghệ thuật mang đầy sự tinh tế và đẹp lấp lánh đến từ đèn tiffany, v.v
                </Typography>
            </Box>
            <Box display='flex' flexDirection='column' px={{ xs: 2, md: 10}} py={{ xs: 1.5, md: 2.5}}>
                <Typography pb={2.5} variant="h5" fontWeight={600}>Bộ sưu tập nhà SEN</Typography>
                <Grid container spacing={3}>
                    {DATA_COLLECTION.map((data, index) => {
                        return(
                            <Grid key={index} size={{ xs: 12, sm: 6, md: 3}}>
                                <Card onClick={() => data.id && handleNavigate(data.id)} sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '0', bgcolor: '#f5f5f5', cursor: 'pointer'}}>
                                    <CardMedia
                                        component='img'
                                        image={data.image_url}
                                        alt={data.title}
                                        sx={{
                                            height: { xs: 150, md: 250},
                                            objectFit: 'cover',
                                            backgroundColor: '#f5f5f5',
                                        }}
                                    />
                                    <Stack p={{ xs: 2, md: 3}} direction='column'>
                                        <Typography fontWeight={600} fontSize={{ xs: '14px', md: '18px'}}>{data.title}</Typography>
                                        <Typography sx={{ whiteSpace: 'normal', wordBreak: 'break-word'}} fontSize={{ xs: '12px', md: '14px'}}>{data.content}</Typography>
                                    </Stack>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </Box>
    )
}

export default ExploreMore;