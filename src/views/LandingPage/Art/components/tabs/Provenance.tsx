import { Box, Typography } from "@mui/material";

interface ProvenanceProps{

}

const Provenance = (props: ProvenanceProps) => {
    const { } = props;
    return(
        <Box>
            <Typography fontSize={{ xs: '16px', md: '18px'}}>
                Ambroise Vollard (người Pháp); Daniel de Monfried (người Pháp); Galerie Beyeler, Basel (Thụy Sĩ); 
                Bộ sưu tập cá nhân, mua từ Galerie Beyeler năm 1960; bán đấu giá, Sotheby's, London, ngày 3 tháng 12 năm 1991, lô 19; 
                Sotheby's, New York, ngày 8 tháng 11 năm 1994, lô 13; bán đấu giá, Sotheby's, New York, ngày 12 tháng 11 năm 1996, bán đấu giá 6913, lô 7; 
                Người bán: Sotheby's, New York, ngày 12 tháng 11 năm 1996, bán đấu giá 6913, lô 7 
            </Typography> 
        </Box>
    )
}

export default Provenance;