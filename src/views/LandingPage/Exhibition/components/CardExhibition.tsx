import { IICommonLandingPage } from "@/types/landingpage";
import React from "react";
import Grid from "@mui/material/Grid2";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CardExhibitionProps{
    data: IICommonLandingPage[],
}

const CardExhibition: React.FC<CardExhibitionProps> = ({ data }) => {
    const navigate = useNavigate()
    return(
        <Grid container spacing={3} sx={{ mt: { xs: 2, md: 0}}}>
            {data.slice(0,3).map((data, index) => {
                return(
                    <Grid key={index} size={{ xs: 12, sm: 4}}>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                cursor: 'pointer'
                            }}
                            onClick={() => navigate(`${data.url}`)}
                        >
                            <CardMedia
                                component='img'
                                image={data.image_url}
                                alt={data.title}
                                sx={{
                                    objectFit: 'fill',
                                    bgcolor: '#f5f5f5',
                                    height: { xs: 200, md: 250},
                                    width: '100%'
                                }}
                            />
                            <CardContent>
                                <Typography py={1.5} fontSize={{ xs: '16px', sm: '23px', md: '25px'}} fontWeight={600}>{data.title}</Typography>
                                <Typography variant="subtitle2">{data.content}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default CardExhibition;