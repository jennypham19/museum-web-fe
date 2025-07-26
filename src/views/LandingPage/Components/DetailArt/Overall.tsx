import { DATA_OVERALL } from "@/constants/data";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ReportIcon from '@mui/icons-material/Report';

const Overall = () => {
    return(
        <Grid container spacing={{ xs: 3, md: 10}}>
            <Grid size={{ xs: 12, md: 8}}>
                {DATA_OVERALL.split('\n').map((data, idx) => {
                    return(
                        <Stack pb={2} key={idx}>
                            <Typography fontSize={{ xs: '13px', md: '16px'}}>{data}</Typography>
                        </Stack>
                    )
                })}
            </Grid>
            <Grid size={{ xs: 12, md: 4}}>
                <Box display='flex' flexDirection='column'>
                    <Stack direction='row' pb={1.5}>
                        <CalendarMonthIcon/>
                        <Typography fontWeight={700} fontSize={{ xs: '14px', md: '16px'}}>Ngày 31/05/2025 _ Đang diễn ra</Typography>
                    </Stack>
                    <Stack direction='row' pb={1.5}>
                        <PlaceIcon/>
                        <Typography fontWeight={700} fontSize={{ xs: '14px', md: '16px'}}>Hiện đang được trưng bày tại Bảo tàng Tiffany tại khu vực số 5</Typography>
                    </Stack>
                    <Stack direction='row' pb={1.5}>
                        <ConfirmationNumberIcon/>
                        <Typography fontWeight={700} fontSize={{ xs: '14px', md: '16px'}}>Miễn phí vé vào cửa</Typography>
                    </Stack>
                    <Stack direction='row'>
                        <ReportIcon/>
                        <Typography fontWeight={700} fontSize={{ xs: '14px', md: '16px'}}>Thông tin tác phẩm tại bảo tàng</Typography>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Overall;