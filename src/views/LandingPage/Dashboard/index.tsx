import { Box} from "@mui/material"
import ImageCarousel from "./components/ImageCarousel";
import LiveStream from "./components/LiveStream";
import LocationAndTime from "./components/LocationAndTime";
import ExploreMore from "./components/ExploreMore";
import Page from "@/components/Page";
import image_slide from "@/assets/images/users/slide.png";
import { useTranslation } from "react-i18next";

const DashboardHome = () => {
    const { t } = useTranslation('home');
    return (
        <Page title='Art Glass Museum'>
            <Box bgcolor='white'>
                <ImageCarousel
                    image_url={image_slide}
                    label={t('label_banner')}
                    labelBtn={t('label_button')}
                />
                <LiveStream title={t('livestream.name_livestream')}/>
                <LocationAndTime/>
                <ExploreMore/>
            </Box>
        </Page>
    )
}

export default DashboardHome;