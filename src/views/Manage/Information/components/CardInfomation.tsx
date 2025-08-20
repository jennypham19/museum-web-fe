import { Avatar, Box, Card } from "@mui/material";
import { ReactNode } from "react";
import Grid from "@mui/material/Grid2"

interface CardInformationProps{
    avatar: string,
    children: ReactNode
}
const CardInformation = ({ avatar, children } : CardInformationProps) => {
    return (
        <Card
            sx={{
                bgcolor: 'white',
                boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.03), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
                borderRadius: 2
            }}
        >
            <Box p={1}>
                <Grid container>
                    <Grid size={{ xs: 12, md: 4}}>
                        <Box height='100%' display='flex' justifyContent='center' alignItems='center'>
                            <Avatar
                                src={avatar}
                                sx={{ width: 80, height: 80}}
                            />
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 8}}>
                        {children}
                    </Grid>
                </Grid>
            </Box>
        </Card>
    )
}
export default CardInformation;