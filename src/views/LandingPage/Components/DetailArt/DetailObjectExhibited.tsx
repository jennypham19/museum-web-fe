import DialogComponent from "@/components/DialogComponent";
import { IObjectArt } from "@/types/landingpage";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2"
import CommonImage from "@/components/Image/index";

interface DetailObjectExhibitedProps{
    open: boolean,
    data: IObjectArt,
    onClose: () => void;
}

const DetailObjectExhibited: React.FC<DetailObjectExhibitedProps> = ({ open, data, onClose }) => {
    const handleClose = () => {
        onClose()
    }
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={handleClose}
            isActiveFooter={false}
            maxWidth='lg'
        >
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6}}>
                    <Stack direction='column'>
                        <Typography fontWeight={700} fontSize={{ xs: '18px', md: '25px'}}>{data.title}</Typography>
                        <Typography fontSize={{ xs: '14px', md: '15px'}}>{`Nghệ sĩ: ${data.artist}`}</Typography>
                        <Typography pb={2} fontSize={{ xs: '14px', md: '15px'}}>{`Thời gian: ${data.time}`}</Typography>
                        {data.content.split('\n').map((item, idx) => {
                            return(
                                <Stack key={idx} direction='column' mb={2}>
                                    <Typography fontSize={{ xs: '14px', md: '15px'}}>{item}</Typography>
                                </Stack>
                            )
                        })}
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 6}}>
                    <CommonImage
                        src={data.image_url}
                        alt={data.title}
                        sx={{
                            width: '100%',
                            height: { xs: 200, md: 380}
                        }}
                    />
                </Grid>
            </Grid>
            <Box height='100%' borderTop={{ xs: '1px solid', md: 'none'}} mt={2} display='flex' justifyContent='flex-start' flexDirection={{ xs: 'column', md: 'row'}}>
                {data.images?.map((img, index) => {
                    return(
                            <CommonImage
                                key={index}
                                src={img.image_detail_url}
                                alt={img.name}
                                sx={{
                                    width: { xs: '100%', md: 160},
                                    height: { xs: 200, md: 160},
                                    px: 1,
                                    py: { xs: 1, md: 0},
                                    margin: '0 auto'
                                }}
                            />
                        )
                    })}
            </Box>
        </DialogComponent>
    )
}

export default DetailObjectExhibited;