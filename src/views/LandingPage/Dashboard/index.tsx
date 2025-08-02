import { Box} from "@mui/material"
import ImageCarousel from "./components/ImageCarousel";
import LiveStream from "./components/LiveStream";
import LocationAndTime from "./components/LocationAndTime";
import ExploreMore from "./components/ExploreMore";
import Page from "@/components/Page";
import image_slide from "@/assets/images/users/slide.png";

const DashboardHome = () => {
    return (
        <Page title='Tiffany Museum'>
            <Box bgcolor='white'>
                <ImageCarousel
                    image_url={image_slide}
                    label="Chào mừng đến Tiffany"
                />
                <LiveStream title="Xem trực tiếp"/>
                <LocationAndTime/>
                <ExploreMore/>
            </Box>
        </Page>
    )
}

export default DashboardHome;