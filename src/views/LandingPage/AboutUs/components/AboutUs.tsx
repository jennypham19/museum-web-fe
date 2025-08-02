import { Box, Typography } from "@mui/material";
import slide from "@/assets/images/users/slide.png";
import { DATA_ABOUT_US, DATA_ABOUT_US_1, DATA_ABOUT_US_2, DATA_ABOUT_US_3 } from "@/constants/data";
import { IICommonLandingPage } from "@/types/landingpage";
import PlanVisit from "../../Dashboard/components/PlanVisit";
import CommonCard from "../../Components/CommonCard";
import ImageCarousel from "../../Dashboard/components/ImageCarousel";
import React, { forwardRef } from "react";

interface AboutUsProps{
    handleNavigate: (data:IICommonLandingPage) => void;
    handleNavigateInfo: (data: IICommonLandingPage) =>  void;
}

const AboutUs = forwardRef<HTMLDivElement, AboutUsProps>(( { handleNavigate, handleNavigateInfo }, ref) => {
       return(
        <Box ref={ref}>
            <ImageCarousel
                image_url={slide}
                label="About the Tiffany"
                title="The Tiffany presents over 5,000 years of art from around the world for everyone to experience and enjoy"
                isDisabled={true}
            />
            <Box mt={{ xs: 1, md: 2}} px={{ xs: 2, md: 6}} py={4}>
                <Box width={{ xs: '100%', md: '70%'}} display='flex' flexDirection='column'>
                    <Typography mb={2} fontWeight={700} fontSize={{ xs: '18px', md: '26px'}}>Về bảo tàng</Typography>
                    <Typography mb={2} fontSize={{ xs: '13px', md: '18px'}}>
                        The Metropolitan Museum of Art presents over 5,000 years of art from around the world for everyone to experience and enjoy. The Museum lives in two iconic sites in New York City. Millions of people also take part in The Met experience online.
                    </Typography>
                    <Typography mb={2} fontSize={{ xs: '13px', md: '18px'}}>
                        Since its founding in 1870, The Met has always aspired to be more than a treasury of rare and beautiful objects. Every day, art comes alive in the Museum's galleries and through its exhibitions and events, revealing new ideas and unexpected connections across time and across cultures.
                    </Typography>
                </Box>
                <Box mt={4} width={{ xs: '100%', md: '70%'}} display='flex' flexDirection='column'>
                    <Typography mb={2} fontWeight={700} fontSize={{ xs: '18px', md: '26px'}}>Tuyên bố sứ mệnh</Typography>
                    <Typography mb={2} fontSize={{ xs: '13px', md: '18px'}}>
                        The Metropolitan Museum of Art presents over 5,000 years of art from around the world for everyone to experience and enjoy. The Museum lives in two iconic sites in New York City. Millions of people also take part in The Met experience online.
                    </Typography>
                </Box>
            </Box>
            <PlanVisit data={DATA_ABOUT_US} label="Xem chi tiết" md={3} handleNavigate={handleNavigate}/>
            <Box mt={{ xs: 1, md: 2}} px={{ xs: 2, md: 6}} py={4}>
                <CommonCard
                    data={DATA_ABOUT_US_1.slice(0,3)}
                    handleNavigate={handleNavigateInfo}
                />
            </Box>
            <PlanVisit data={DATA_ABOUT_US_2} md={6}/>
            <Box mt={{ xs: 1, md: 2}} px={{ xs: 2, md: 6}} py={4}>
                <CommonCard
                    data={DATA_ABOUT_US_3.slice(0,3)}
                    handleNavigate={handleNavigateInfo}
                />
            </Box>
        </Box>
    )
})

export default AboutUs;