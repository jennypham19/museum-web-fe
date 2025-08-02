import { Box } from "@mui/material";
import { IICommonLandingPage } from "@/types/landingpage";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import HistoryMuseum from "./components/HistoryMuseum";
import SeniorLeader from "./components/SeniorLeader";
import MaterialPolicy from "./components/MaterialPolicy";
import ContactInformation from "./components/ContactInformation";

const Main = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [openHistoryMuseum, setOpenHistoryMuseum] = useState(false);
    const [openSeniorLeader, setOpenSeniorLeader] = useState(false);
    const [openMaterialPolicy, setOpenMaterialPolicy] = useState(false);
    const [openContactInformation, setOpenContactInformation] = useState(false);
    const [openCareerOppotunities, setOpenCareerOppotunities] = useState(false);
    const [openInteship, setOpenInteship] = useState(false);
    const [openKnowledgeProgram, setOpenKnowledgeProgram] = useState(false);

    const locationRef = useRef<HTMLDivElement>(null);
    const scrollToLocation = () => {
        locationRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleNavigate = (data: IICommonLandingPage) => {
        switch (data.type) {
            case 'history_museum':
                setOpenHistoryMuseum(true);
                setOpen(true);
                break;
            case 'senior_leader':
                setOpenSeniorLeader(true);
                setOpen(true);
                break;
            default:
                navigate('/museum-collection');
                break;
        }
    }

    const handleNavigateInfo = (data: IICommonLandingPage) => {
        switch(data.type) {
            case 'policy_material':
                setOpenMaterialPolicy(true);
                setOpen(true);
                break;
            case 'contact-information':
                setOpenContactInformation(true);
                setOpen(true);
                break;
            case 'career_opportunities':
                setOpenCareerOppotunities(true);
                setOpen(true);
                break;
            case 'intership':
                setOpenInteship(true);
                setOpen(true);
                break;
            case 'knowledge_program':
                setOpenKnowledgeProgram(true);
                setOpen(true);
                break;
            default: 
                scrollToLocation();
                break
        }
    }

    return(
        <Box>
            {!open && (
                <AboutUs ref={locationRef} handleNavigate={handleNavigate} handleNavigateInfo={handleNavigateInfo}/>
            )}
            {openHistoryMuseum && open && (
                <HistoryMuseum handleBack={() => {
                    setOpenHistoryMuseum(false)
                    setOpen(false)
                }}/>
            )}
            {openSeniorLeader && open && (
                <SeniorLeader
                    handleBack={() => {
                        setOpenSeniorLeader(false)
                        setOpen(false)
                    }}
                />
            )}
            {openMaterialPolicy && open && (
                <MaterialPolicy
                    handleBack={() => {
                        setOpenMaterialPolicy(false)
                        setOpen(false)
                    }}
                />
            )}
            {openContactInformation && open && (
                <ContactInformation
                    handleBack={() => {
                        setOpenContactInformation(false)
                        setOpen(false)
                    }}
                />
            )}
        </Box>
    )
}

export default Main;