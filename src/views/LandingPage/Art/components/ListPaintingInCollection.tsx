import NavigateBack from "@/views/Manage/components/NavigateBack";
import { Box, Card, Checkbox, Collapse, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import InputSelect from "@/components/InputSelect";
import InputSearch from "@/components/SearchBar";
import { getFieldLabel } from "@/utils/labelEntoVni";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { DATA_OBJECT_ART } from "@/constants/data";
import CommonImage from "@/components/Image/index";
import IconButton from "@/components/IconButton/IconButton";
import { FormDataFilterBy } from "@/types/collection";
import { DATA_ART_STYLE, DATA_DATE_ERA, DATA_GEOGRAPHIC_LOCATION, DATA_ORIGIN_FACTORY, DATA_PATTERNS, DATA_TYPE_EXHIBIT } from "@/constants/filterBy";
import DetailPainting from "./DetailPainting";
import { IICommonLandingPage, IObjectArt } from "@/types/landingpage";
import { useTranslation } from "react-i18next";
import { useI18n } from "@/contexts/i18nContext";

interface ListPaintingInCollectionProps{
    onClose: () => void;
    collection: IICommonLandingPage;
}

const DATA_FIELDS: { id: number, label: { vi: string, en: string }, value: string }[] = [
    {
        id: 1,
        label: {
            vi: "Tất cả các trường",
            en: "All fields"
        },
        value: 'all_field',
    },
    {
        id: 2,
        label: {
            vi: "Nghệ sĩ",
            en: "Artist"
        },
        value: 'artist',
    },
    {
        id: 3,
        label: {
            vi: "Văn hóa",
            en: "Culture"
        },
        value: 'culture',
    },
    {
        id: 4,
        label: {
            vi: "Tiêu đề",
            en: "Title"
        },
        value: 'title',
    },
    {
        id: 5,
        label: {
            vi: "Mô tả",
            en: "Description"
        },
        value: 'description',
    },
    {
        id: 6,
        label: {
            vi: "Phòng trưng bày",
            en: "Gallery"
        },
        value: 'gallery',
    }
];

const DATA_TITLES: { id: number, label: string, value: string }[] = [
    {
        id: 1,
        label: 'Sự liên quan',
        value: 'relevance',
    },
    {
        id: 2,
        label: 'Tiêu đề (a - z)',
        value: 'title_(a_z)',
    },
    {
        id: 3,
        label: 'Tiêu đề (z - a)',
        value: 'title_(z_a)',
    },
    {
        id: 4,
        label: 'Ngày (mới nhất - cũ nhất)',
        value: 'date_(newest_oldest)',
    },
    {
        id: 5,
        label: 'Ngày (cũ nhất - mới nhất)',
        value: 'date_(oldest_newest)',
    },
    {
        id: 6,
        label: 'Nghệ sĩ (a - z)',
        value: 'artist_(a_z)',
    },
    {
        id: 7,
        label: 'Nghệ sĩ (z - a)',
        value: 'artist_(z_a)',
    }
]
const ListPaintingInCollection = (props: ListPaintingInCollectionProps) => {
    const { onClose, collection } = props;
    const { t } = useTranslation('art');
    const { locale } = useI18n(); 
    const [field, setField] = useState('all_field');
    const [title, setTitle] = useState('relevance');
    const [openFilterBy, setOpenFilterBy] = useState(true);
    const [filterData, setFilterData] = useState<FormDataFilterBy>({
        typeExhibit: '', artStyle: '', pattern: '', geographicLocation: '', dateEra: '', originFactory: ''
    });
    const [openDetailPainting, setOpenDetailPainting] = useState(false);
    const [detailPainting, setDetailPainting] = useState<IObjectArt | null>(null)

    const handleInputSelect = (name: string, value: any) => {
        setField(value);
    }

    const handleOpenFilterBy = () => {
        setOpenFilterBy(prev => !prev);
    }

    const handleInputChangeSelect = (name: string, value: any) => {
        setFilterData(prev => ({ ...prev, [name]: value }))
    }

    const handleOpenDetailPainting = (data: IObjectArt) => {
        setOpenDetailPainting(true);
        setDetailPainting(data)
    };

    const handleCloseDetailPainting = () => {
        setOpenDetailPainting(false)
    }
    return(
        <Box>
            {!openDetailPainting && (
                <>
                    <NavigateBack
                        onBack={onClose}
                        title={t('back_collection')}
                    />
                    <Divider sx={{ border: '1px solid #e2dfdfff'}}/>
                    <Typography my={1} fontWeight={700} variant="h6">{`${t('search_collection')}: ${collection.title[locale]}`}</Typography>
                    <Grid sx={{ mb: 2 }} container spacing={2}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <InputSelect
                                name="field"
                                label=""
                                value={field}
                                options={DATA_FIELDS}
                                transformOptions={(data) =>
                                    data.map((item) => ({
                                        label: item.label[locale],
                                        value: item.value
                                    }))
                                }
                                onChange={handleInputSelect}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 9 }}>
                            <InputSearch
                                initialValue=""
                                onSearch={() => {}}
                                placeholder={`${t('search_field')} ${getFieldLabel(field).title[locale]}`}
                                colorIcon='#000'
                                borderRadius='8px'
                                color='#000'
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Box pb={1} borderBottom='1px solid #c7c4c4ff'>
                                <Stack onClick={handleOpenFilterBy} sx={{ cursor: 'pointer' }} direction='row' justifyContent='space-between'>
                                    <Typography fontWeight={700} variant="h6">{t('filter_by.name')}</Typography>
                                    <IconButton
                                        handleFunt={() => {}}
                                        icon={openFilterBy ? <ExpandLess/> : <ExpandMore/>}
                                        backgroundColor="transparent"
                                    />
                                </Stack>
                                {openFilterBy && (
                                    <Collapse in={openFilterBy} timeout='auto' unmountOnExit>
                                        <Grid container spacing={2}>
                                            <Grid size={{ xs: 12, md: 4 }}>
                                                <InputSelect
                                                    label=""
                                                    value={filterData.typeExhibit}
                                                    onChange={handleInputChangeSelect}
                                                    name="typeExhibit"
                                                    placeholder={t('filter_by.type_exhibit')}
                                                    options={DATA_TYPE_EXHIBIT}
                                                    transformOptions={(data) =>
                                                        data.map((item) => ({
                                                            label: item.label[locale],
                                                            value: item.value
                                                        }))
                                                    }
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 4 }}>
                                                <InputSelect
                                                    label=""
                                                    value={filterData.artStyle}
                                                    onChange={handleInputChangeSelect}
                                                    name="artStyle"
                                                    placeholder={t('filter_by.art_style')}
                                                    options={DATA_ART_STYLE}
                                                    transformOptions={(data) =>
                                                        data.map((item) => ({
                                                            label: item.label,
                                                            value: item.value
                                                        }))
                                                    }
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 4 }}>
                                                <InputSelect
                                                    label=""
                                                    value={filterData.pattern}
                                                    onChange={handleInputChangeSelect}
                                                    name="pattern"
                                                    placeholder={t('filter_by.pattern')}
                                                    optionGroups={DATA_PATTERNS}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 4 }}>
                                                <InputSelect
                                                    label=""
                                                    value={filterData.geographicLocation}
                                                    onChange={handleInputChangeSelect}
                                                    name="geographicLocation"
                                                    placeholder={t('filter_by.geographic_location')}
                                                    optionGroups={DATA_GEOGRAPHIC_LOCATION}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 4 }}>
                                                <InputSelect
                                                    label=""
                                                    value={filterData.dateEra}
                                                    onChange={handleInputChangeSelect}
                                                    name="dateEra"
                                                    placeholder={t('filter_by.date_era')}
                                                    options={DATA_DATE_ERA}
                                                    transformOptions={(data) =>
                                                        data.map((item) => ({
                                                            label: item.label,
                                                            value: item.value
                                                        }))
                                                    }
                                                    // loading={true}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 4 }}>
                                                <InputSelect
                                                    label=""
                                                    value={filterData.originFactory}
                                                    onChange={handleInputChangeSelect}
                                                    name="originFactory"
                                                    placeholder={t('filter_by.origin_factory')}
                                                    options={DATA_ORIGIN_FACTORY}
                                                    transformOptions={(data) =>
                                                        data.map((item) => ({
                                                            label: item.label,
                                                            value: item.value
                                                        }))
                                                    }
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12 }}>
                                                <Typography mt={1} fontWeight={600} fontSize='16px'>{`${t('filter_by.only_show')}:`}</Typography>
                                                <Box mt={1} mb={2} display='flex' flexDirection={{ xs: 'column', md: 'row'}} gap={{ xs: 2, md: 5 }}>
                                                    <Stack direction='row'>
                                                        <Checkbox/>
                                                        <Typography>{t('filter_by.highlights')}</Typography>
                                                    </Stack>
                                                    <Stack direction='row'>
                                                        <Checkbox/>
                                                        <Typography>{t('filter_by.artworks_with_image')}</Typography>
                                                    </Stack>
                                                    <Stack direction='row'>
                                                        <Checkbox/>
                                                        <Typography>{t('filter_by.artworks_on_display')}</Typography>
                                                    </Stack>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Collapse>
                                )}
                            </Box>                    
                        </Grid>

                        <Grid size={{ xs: 12, md: 8.5 }}>
                            <Typography fontWeight={600} color="text.secondary">Hiển thị kết quả</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 3.5 }}>
                            <Box display='flex' flexDirection='row' alignItems='center' sx={{ whiteSpace: "nowrap"}}>
                                <Typography mr={1} fontWeight={600} color="text.secondary">Sắp xếp theo: </Typography>
                                <InputSelect
                                    name="title"
                                    label=""
                                    value={title}
                                    options={DATA_TITLES}
                                    transformOptions={(data) =>
                                        data.map((item) => ({
                                            label: item.label,
                                            value: item.value
                                        }))
                                    }
                                    onChange={(name: string, value: any) => {
                                        setTitle(value)
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        {DATA_OBJECT_ART.map((data, index) => {
                            return(
                                <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                                    <Card
                                        onClick={() => handleOpenDetailPainting(data)}
                                        sx={{ height: '100%', cursor: 'pointer' }}
                                    >
                                        <CommonImage
                                            src={data.image_url}
                                            alt={data.title}
                                            sx={{ height: { xs: 200, md: 250 }, width: '100%', p: 2 }}
                                        />
                                        <Stack px={2} pb={2} direction='column'>
                                            <Typography fontWeight={700} fontSize={{ xs: '16px', md: '20px'}}>{data.title}</Typography>
                                            <Typography fontSize={{ xs: '14px', md: '15px'}}>{`Nghệ sĩ: ${data.artist}`}</Typography>
                                            <Typography fontSize={{ xs: '14px', md: '15px'}}>{`Thời gian: ${data.time}`}</Typography>
                                        </Stack>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>                
                </>
            )}
            {openDetailPainting && detailPainting && (
                <DetailPainting
                    onBack={handleCloseDetailPainting}
                    data={detailPainting}
                />
            )}
        </Box>
    )
}

export default ListPaintingInCollection;