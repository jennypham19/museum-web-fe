import IconButton from "@/components/IconButton/IconButton";
import { Home } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import image_policy from "@/assets/images/users/image_policy.png";
import CommonCard from "../../Components/CommonCard";
import { IICommonLandingPage } from "@/types/landingpage";
import { DATA_ABOUT_MATERIAL } from "@/constants/data";
import DetailMaterial from "./DetailMaterial";
import ContactInformation from "./ContactInformation";

interface MaterialPolicyProps{
    handleBack: () => void;
}

const MaterialPolicy: React.FC<MaterialPolicyProps> = ({ handleBack }) => {
    const [openMaterialPolicyDetail, setOpenMaterialPolicyDetail] = useState(false);
    const [openContactInformation, setOpenContactInformation] = useState(false);
    const [open, setOpen] = useState(false);

    const handleNavigatePolicy = (data: IICommonLandingPage) => {
        switch (data.type) {
            case 'policy_material_detail':
                setOpenMaterialPolicyDetail(true);
                setOpen(true)
                break;
            case 'contact-information': 
                setOpenContactInformation(true);
                setOpen(true);
                break;
        }

    }
 
    return (
        <>
            {!open && (
                <Box>
                    <Box display='flex' flexDirection='row' py={{ xs: 0, md: 1.5}} px={{ xs: 2, md: 10}}>
                        <IconButton
                            handleFunt={handleBack}
                            icon={<Home sx={{ width: { xs: 20, md: 30}, height: { xs: 20, md: 30}, color: '#000'}}/>}
                        />
                        <Typography mt={{ xs: 1, md: 1}} fontWeight={600} fontSize={{ xs: '12px', md: '18px'}}>/ About us/ Chính sách tài liệu</Typography>
                    </Box>
                    <Box
                        sx={{
                            height: { xs: 300, md: 480},
                            width: '100%',
                            backgroundImage: `url(${image_policy})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Box mt={{ xs: 1, md: 2}} px={{ xs: 2, md: 6}} pt={4}>
                        <Typography fontWeight={700} fontSize={{ xs: '16px', md: '25px'}}>Chính sách & tài liệu</Typography>
                    </Box>
                    <Box mt={{ xs: 1, md: 2}} px={{ xs: 2, md: 6}} pb={4}>
                        <CommonCard
                            data={DATA_ABOUT_MATERIAL}
                            handleNavigate={handleNavigatePolicy}
                        />
                    </Box>
                </Box>                
            )}
            {openMaterialPolicyDetail && open && (
                <DetailMaterial
                    handleBack={() => {
                        setOpenMaterialPolicyDetail(false);
                        setOpen(false)
                    }}
                />
            )}
            {openContactInformation && open && (
                <ContactInformation
                    handleBack={() => {
                        setOpenContactInformation(false);
                        setOpen(false)
                    }}
                />
            )}
            {}
        </>
    )
}

export default MaterialPolicy;