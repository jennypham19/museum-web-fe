import CommonImage from "@/components/Image/index";
import { DATA_OBJECT_ART } from "@/constants/data";
import { IObjectArt } from "@/types/landingpage";
import { Card, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import DetailObjectExhibited from "./DetailObjectExhibited";

const ObjectExhibited = () => {
    const [open, setOpen] = useState(false);
    const [objectArtDetail, setObjectArtDetail] = useState<IObjectArt | null>(null);
    const handleOpenDetail = (data: IObjectArt) => {
        setObjectArtDetail(data);
        setOpen(true)
    }

    return(
        <Grid container spacing={3}>
            {DATA_OBJECT_ART.map((data, index) => {
                return(
                    <Grid key={index} size={{ xs: 12, sm: 6, md: 3}}>
                        <Card
                            onClick={() => handleOpenDetail(data)}
                            sx={{ height: '100%', cursor: 'pointer'}}
                        >
                            <CommonImage
                                src={data.image_url}
                                alt={data.title}
                                sx={{ height: { xs: 200, md: 250}, width: '100%', p:2}}
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
            {open && objectArtDetail && (
                <DetailObjectExhibited
                    open={open}
                    data={objectArtDetail}
                    onClose={() => {
                        setOpen(false)
                    }}
                />
            )}
        </Grid>
    )
}

export default ObjectExhibited;