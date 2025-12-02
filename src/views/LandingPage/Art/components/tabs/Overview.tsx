import { IObjectArt } from "@/types/landingpage";
import { Box, Stack, Typography } from "@mui/material";

interface OverviewProps{
    data: IObjectArt;
}

const Overview = (props: OverviewProps) => {
    const { data } = props;
    return(
        <Box>
            <Stack mb={1.5} direction='row'>
                <Typography fontSize={{ xs: '16px', md: '18px'}} fontWeight={600}>Tiêu đề:</Typography>
                <Typography fontSize={{ xs: '16px', md: '18px'}}>{data.title}</Typography>   
            </Stack>
            <Stack mb={1.5} direction='row'>
                <Typography fontSize={{ xs: '16px', md: '18px'}} fontWeight={600}>Nghệ sĩ:</Typography>
                <Typography fontSize={{ xs: '16px', md: '18px'}}>{data.artist}</Typography>   
            </Stack>
            <Stack mb={1.5} direction='row'>
                <Typography fontSize={{ xs: '16px', md: '18px'}} fontWeight={600}>Thời gian:</Typography>
                <Typography fontSize={{ xs: '16px', md: '18px'}}>{data.time}</Typography>   
            </Stack>
            <Stack mb={1.5} direction='row'>
                <Typography fontSize={{ xs: '16px', md: '18px'}} fontWeight={600}>Văn hóa:</Typography>
                <Typography fontSize={{ xs: '16px', md: '18px'}}>Pháp</Typography>   
            </Stack>
            <Stack mb={1.5} direction='row'>
                <Typography fontSize={{ xs: '16px', md: '18px'}} fontWeight={600}>Chất liệu:</Typography>
                <Typography fontSize={{ xs: '16px', md: '18px'}}>Kính</Typography>   
            </Stack>
            <Stack mb={1.5} direction='row'>
                <Typography fontSize={{ xs: '16px', md: '18px'}} fontWeight={600}>Kích thước:</Typography>
                <Typography fontSize={{ xs: '16px', md: '18px'}}>132 × 102 inch</Typography>   
            </Stack>
            <Stack mb={1.5} direction='row'>
                <Typography fontSize={{ xs: '16px', md: '18px'}} fontWeight={600}>Bộ sưu tập:</Typography>
                <Typography fontSize={{ xs: '16px', md: '18px'}}>Nghệ thuật từ Châu Á</Typography>   
            </Stack>
            <Stack mb={1.5} direction='row'>
                <Typography fontSize={{ xs: '16px', md: '18px'}} fontWeight={600}>Phòng trưng bày:</Typography>
                <Typography fontSize={{ xs: '16px', md: '18px'}}>Phòng trưng bày 344</Typography>   
            </Stack>
        </Box>
    )
}

export default Overview;