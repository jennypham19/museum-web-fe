import { Box, Typography } from "@mui/material";
import CommonNavbar from "../Components/CommonNavbar";
import image_plan_visit from "@/assets/images/users/image_plan_visit.png";
import { useState } from "react";
import InputSearch from "@/components/SearchBar";
import ListCollection from "./components/ListCollections";
import ListPaintingInCollection from "./components/ListPaintingInCollection";
import { useTranslation } from "react-i18next";
import { DATA_COLLECTION } from "@/constants/data";
import { IICommonLandingPage } from "@/types/landingpage";

const CollectionMuseum = () => {
    const { t } = useTranslation('art')
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [collection, setCollection] = useState<IICommonLandingPage | null>(null)
    const handleSearch = ( newItem: string) =>{
        setSearchTerm(newItem.trim())
    }
    const [openPainting, setOpenPainting] = useState(false);
    const handleOpenPainting = (data: IICommonLandingPage) => {
        setOpenPainting(true);
        setCollection(data)
    }

    const handleClosePainting = () => {
        setOpenPainting(false)
    }
    return(
        <Box>
            {!openPainting && (
                <>
                    <CommonNavbar
                        title={`/${t('breadcrumb_navigation')}`}
                    />
                    <Box
                        sx={{
                            height: { xs: 300, md: 480},
                            width: '100%',
                            backgroundImage: `url(${image_plan_visit})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}
                    />
                    <Box  px={{ xs: 3, md: 6}} mb={{ xs: 2, md: 4}} pt={{ xs: 3, md: 6}}>
                        <Box pb={3} borderBottom='1px solid #C1C1C1'>
                            <Typography fontWeight={700} fontSize={{ xs: '16px', md: '25px'}}>{t('title_art')}</Typography>
                            <Typography my={1.5} fontSize={{ xs: '14px', md: '16px'}}>
                                {t('description_art')}
                            </Typography>
                            <InputSearch
                                initialValue={searchTerm}
                                onSearch={handleSearch}
                                placeholder={t('search_art')}
                                color="black"
                                colorIcon="black"
                                borderRadius='5px'
                                borderColor="grey"
                                boxShadow="0px 1px 3px 1px rgba(0, 0, 0, 0.03), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)"
                            />
                        </Box>
                    </Box>
                    <Box px={{ xs: 2, md: 5}} pb={4}>
                        <ListCollection
                            onOpenListPaintings={handleOpenPainting}
                            collection={DATA_COLLECTION}
                        />
                    </Box>                
                </>
            )}
            {openPainting && collection && (
                <Box px={{ xs: 2, md: 5}} pb={4}>
                    <ListPaintingInCollection
                        onClose={handleClosePainting}
                        collection={collection}
                    />                    
                </Box>

            )}
        </Box>
    )
}

export default CollectionMuseum;