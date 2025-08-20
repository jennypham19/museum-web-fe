import { IMember } from "@/types/user";
import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchBox from "../../components/SearchBox";
import useAuth from "@/hooks/useAuth";
import { ROLE } from "@/constants/roles";
import IconButton from "@/components/IconButton/IconButton";
import { ChevronLeft, Visibility } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import CardInformation from "./CardInfomation";
import avatar from "@/assets/images/users/avatar.png";

interface ShowAllInformationMemberProps{
    handleBack?: () => void;
    data: IMember[]
}

const ShowAllInformationMember: React.FC<ShowAllInformationMemberProps> = ({ handleBack, data }) => {
    const { profile } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (value: string) => {
        setSearchTerm(value.trim());
    }

    return (
        <Box>
            <SearchBox
                initialValue={searchTerm}
                onSearch={handleSearch}
            />
            {profile?.role === ROLE.ADMIN && (
                <Stack mt={1.5} direction='row'>
                    <IconButton
                        handleFunt={handleBack}
                        icon={<ChevronLeft/>}
                        backgroundColor="transparent"
                    />
                    <Typography pt={0.5} fontWeight={700} fontSize='20px'>Quản lý khách hàng</Typography>
                </Stack>
            )}
                <Grid m={2} container spacing={3} gap={3}>
                    {data.slice(0,6).map((item, index) => {
                        return (
                            <Grid key={index} size={{ xs: 12, md: 4}}>
                                <CardInformation
                                    avatar={avatar}
                                >
                                    <Stack direction='row' justifyContent='space-between'>
                                        <Typography fontSize={{ xs: '14px', md: '16px'}} pt={1} fontWeight={700}>{item.code}</Typography>
                                        <IconButton
                                            title="Xem chi tiết"
                                            handleFunt={() => {}}
                                            icon={<Visibility color="warning"/>}
                                            backgroundColor="transparent"
                                        />
                                    </Stack>
                                    <Typography fontSize={{ xs: '14px', md: '16px'}} mb={1}>{`Họ tên: ${item.full_name}`}</Typography>
                                    <Typography fontSize={{ xs: '14px', md: '16px'}} mb={1}>{`Thành viên: ${item.member}`}</Typography>
                                    <Typography fontSize={{ xs: '14px', md: '16px'}}>{`Ngày kết nạp: ${item.startedDate}`}</Typography>
                                </CardInformation>
                            </Grid>    
                        )
                    })}
                </Grid>
        </Box>
    )
}

export default ShowAllInformationMember;