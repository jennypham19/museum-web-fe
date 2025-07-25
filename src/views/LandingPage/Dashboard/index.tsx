import { Box} from "@mui/material"
import ImageCarousel from "./components/ImageCarousel";
import LiveStream from "./components/LiveStream";
import LocationAndTime from "./components/LocationAndTime";
import ExploreMore from "./components/ExploreMore";

const DashboardHome = () => {
    return (
        <Box bgcolor='white'>
            <ImageCarousel/>
            <LiveStream/>
            <LocationAndTime/>
            <ExploreMore/>
        </Box>
    )
}

export default DashboardHome;