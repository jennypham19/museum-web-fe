import { Box, Typography } from "@mui/material";

const ServicesDashboard = () => {
    return(
        <Box p={{ xs: 2, md: 6}}>
            <Box py={1} borderBottom='1px solid black'>
                <Typography variant="h5" fontWeight={600}> Dịch vụ tiện ích</Typography>
            </Box>
        </Box>
    )
}

export default ServicesDashboard;