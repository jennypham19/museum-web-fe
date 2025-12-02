import CommonImage from "@/components/Image/index";
import { useI18n } from "@/contexts/i18nContext";
import { IICommonLandingPage } from "@/types/landingpage";
import { Card, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface ListCollectionProps{
    onOpenListPaintings: (data: IICommonLandingPage) => void;
    collection: IICommonLandingPage[]
}
const ListCollection = (props: ListCollectionProps) => {
    const { onOpenListPaintings, collection } = props;
    const { locale } = useI18n();

    return(
        <Grid container spacing={3}>
            {collection.map((data, index) => {
                return(
                    <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card
                            onClick={() => data && onOpenListPaintings(data)}
                            sx={{ height: '100%', cursor: 'pointer' }}
                        >
                            <CommonImage
                                src={data.image_url}
                                alt={data.title[locale]}
                                sx={{ height: { xs: 200, md: 250 }, width: '100%', p: 2 }}
                            />
                            <Stack px={2} pb={2} direction='column'>
                                <Typography fontWeight={700} fontSize={{ xs: '16px', md: '20px' }}>{data.title[locale]}</Typography>
                            </Stack>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default ListCollection;