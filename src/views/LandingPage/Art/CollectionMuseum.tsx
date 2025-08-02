import { Box, Typography } from "@mui/material";
import CommonNavbar from "../Components/CommonNavbar";
import image_plan_visit from "@/assets/images/users/image_plan_visit.png";
import { useState } from "react";
import InputSearch from "@/components/SearchBar";
import ObjectExhibited from "../Components/DetailArt/ObjectExhibited";

const CollectionMuseum = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const handleSearch = ( newItem: string) =>{
        setSearchTerm(newItem.trim())
    }
    return(
        <Box>
            <CommonNavbar
                title="/ Nghệ thuật/ Bộ sưu tập bảo tàng"
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
                    <Typography fontWeight={700} fontSize={{ xs: '16px', md: '25px'}}>Nghệ thuật từ Châu Á</Typography>
                    <Typography my={1.5} fontSize={{ xs: '14px', md: '16px'}}>
                        Chúng tôi rất mong được chào đón bạn đến với bảo tàng. Vui lòng xem lại kỹ các hướng dẫn bên dưới trước khi bạn tới thăm. Chúng tôi có quyền từ chối bất kì khách 
                        hàng nào vi phạm quy định của bảo tàng. Xin cảm ơn
                    </Typography>
                    <InputSearch
                        initialValue={searchTerm}
                        onSearch={handleSearch}
                        placeholder="Tìm kiếm"
                        color="black"
                        colorIcon="black"
                        borderRadius='5px'
                        borderColor="grey"
                        boxShadow="0px 1px 3px 1px rgba(0, 0, 0, 0.03), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)"
                    />
                </Box>
            </Box>
            <Box px={{ xs: 2, md: 5}} pb={4}>
                <ObjectExhibited/>
            </Box>
        </Box>
    )
}

export default CollectionMuseum;