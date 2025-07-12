import { Box} from "@mui/material"
import ImageCarousel from "./components/ImageCarousel";
import ExhibitionDashBoard from "./components/ExhibitionDashBoard";
import IntroAboutMuseum from "./components/IntroAboutMuseum";
import CollectionDashboard from "./components/CollectionDashboard";
import InforOfTicket from "./components/InforOfTicket";
import ServicesDashboard from "./components/ServicesDashboard";

const DashboardHome = () => {
    return (
        <Box bgcolor='#FFFEF2'>
            <ImageCarousel/>
            <ExhibitionDashBoard/>
            <IntroAboutMuseum/>
            <CollectionDashboard/>
            <InforOfTicket/>
            <ServicesDashboard/>
        </Box>
    )
}

export default DashboardHome;