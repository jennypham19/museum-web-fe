import { Box, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { DATA_EXPLORE } from "@/constants/data";


const ExploreMore = () => {
    return(
        <Box p={{ xs: 2, md: 6}}>
            <Box py={1}>
                <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2rem'}}} fontWeight={600}>Khám phá nhiều hơn</Typography>
            </Box>
            <Box p={3}>
                <Grid container spacing={3}>
                    {DATA_EXPLORE.slice(0,4).map((item, index) => {
                        return(
                            <Grid size={{ xs: 12, sm: 6, lg: 3}} key={item.id}>
                                <Box
                                    sx={{
                                        position:'relative',
                                        height: { xs: 400, md: 500},
                                        width: '100%',
                                        backgroundImage:`url(${item.image_url})`,
                                        backgroundSize: 'cover',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            zIndex: 1,
                                            color: 'white',
                                            bottom: 12,
                                            left: 35
                                        }}
                                    >
                                        <Typography fontSize={{ xs: '18px', md: '28px'}} fontWeight={500}>{item.title}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </Box>
    )
}

export default ExploreMore;