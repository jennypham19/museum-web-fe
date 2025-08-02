import { IICommonLandingPage } from "@/types/landingpage";
import React from "react";
import Grid from "@mui/material/Grid2"
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface CommonCardProps{
    data: IICommonLandingPage[],
    sm?: number,
    handleNavigate: (item: IICommonLandingPage) =>  void;
}

const CommonCard: React.FC<CommonCardProps> = ({ data, sm, handleNavigate }) => {
    return(
        <Grid container spacing={3}>
            {data.map((item, index) => {
                return(
                    <Grid key={index} size={{ xs: 12, sm: sm ? sm : 4}}>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                cursor: 'pointer'
                            }}
                            onClick={() => item && handleNavigate(item)}
                        >
                            <CardMedia
                                component='img'
                                image={item.image_url}
                                alt={item.title}
                                sx={{
                                    objectFit: 'fill',
                                    bgcolor: '#f5f5f5',
                                    height: { xs: 200, md: 250},
                                    width: '100%'
                                }}
                            />
                            <CardContent>
                                <Typography fontWeight={600}>{item.title}</Typography>
                                <Typography variant="subtitle2">{item.content}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default CommonCard;