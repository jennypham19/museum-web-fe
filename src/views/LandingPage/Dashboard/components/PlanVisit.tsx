import { IICommonLandingPage } from "@/types/landingpage";
import { Box, Button, Card, CardContent, CardMedia, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";

interface PlanVisitProps{
    data: IICommonLandingPage[];
    label: string;
    md?: number
}
const PlanVisit: React.FC<PlanVisitProps> = ({data, label, md}) => {
    return(
        <Box px={{ xs: 2, md: 6}} py={{ xs: 2, md: 4}}>
            <Grid container spacing={3}>
                {data.map((item, index) => {
                    return(
                        <Grid key={item.id} size={{ xs: 12, sm: 6, md: md}}>
                           <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '0', bgcolor: '#f5f5f5'}}>
                                <CardMedia
                                    component='img'
                                    image={item.image_url}
                                    alt={item.title}
                                    sx={{ 
                                        height: { xs: 150, md: 250},
                                        objectFit: 'fill',
                                        backgroundColor: '#f5f5f5',
                                    }}
                                />
                                <Stack p={{ xs: 2, md: 3}} direction='column'>
                                    <Typography fontWeight={600} fontSize={{ xs: '14px', md: '18px'}}>{item.title}</Typography>
                                    <Typography sx={{ whiteSpace: 'normal', wordBreak: 'break-word'}} fontSize={{ xs: '12px', md: '14px'}}>{item.content}</Typography>
                                </Stack>
                                <Box pb={2} pr={2} display='flex' justifyContent='flex-end'>
                                    <Button variant="outlined" sx={{ border: '1px solid #160E0D', color: '#160E0D', fontWeight: 600}}>{label}</Button>
                                </Box>
                           </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}
export default PlanVisit;