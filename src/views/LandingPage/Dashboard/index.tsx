import { Box} from "@mui/material"
import ImageCarousel from "./components/ImageCarousel";
import LiveStream from "./components/LiveStream";
import LocationAndTime from "./components/LocationAndTime";
import ExploreMore from "./components/ExploreMore";
import Page from "@/components/Page";

const DashboardHome = () => {
    return (
        <Page title='Tiffany Museum'>
            <Box bgcolor='white'>
                <ImageCarousel/>
                <LiveStream title="Xem trực tiếp"/>
                <LocationAndTime/>
                <ExploreMore/>
            </Box>
        </Page>
    )
}

export default DashboardHome;