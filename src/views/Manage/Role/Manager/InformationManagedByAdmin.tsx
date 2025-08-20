import IconButton from "@/components/IconButton/IconButton";
import { AdminPanelSettings, AttachFile, ChevronRight, Delete, Visibility } from "@mui/icons-material";
import { Box, Stack, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import avatar from "@/assets/images/users/avatar.png";
import CardInformation from "../../Information/components/CardInfomation";
import { useState } from "react";
import ShowAllInformationEmployee from "../../Information/components/ShowAllInformationEmployee";
import { IMember, IUser } from "@/types/user";
import { getRoleLabel } from "@/utils/labelEntoVni";
import ShowAllInformationMember from "../../Information/components/ShowAllInformationMember";


export const DATA_INFOR_MEMBER: IMember[] = [
    {
        id: 1,
        code: 'KH 120978',
        full_name: 'Nguyễn Văn Quyết',
        member: 'hạng Bạc',
        startedDate: '20/08/2025'
    },
    {
        id: 2,
        code: 'KH 120998',
        full_name: 'Nguyễn Văn',
        member: 'hạng Vàng',
        startedDate: '20/08/2025'
    },
    {
        id: 3,
        code: 'KH 130928',
        full_name: 'Đỗ Hồng Ngọc',
        member: 'hạng Titan',
        startedDate: '20/08/2025'
    },
    {
        id: 4,
        code: 'KH 120978',
        full_name: 'Nguyễn Văn Quyết',
        member: 'hạng Bạc',
        startedDate: '20/08/2025'
    },
    {
        id: 5,
        code: 'KH 120998',
        full_name: 'Nguyễn Văn',
        member: 'hạng Vàng',
        startedDate: '20/08/2025'
    },
    {
        id: 6,
        code: 'KH 130928',
        full_name: 'Đỗ Hồng Ngọc',
        member: 'hạng Titan',
        startedDate: '20/08/2025'
    }
]

const DATA_INFOR_EMPLOYEE: IUser[] = [
    {
        id: 1,
        code: 'NV 135',
        full_name: 'Nguyễn Văn Quyết',
        role: 'employee',
        permission: 'Quản lý bài viết'
    },
    {
        id: 2,
        code: 'NV 357',
        full_name: 'Nguyễn Văn Quyết',
        role: 'employee',
        permission: 'Quản lý khách hàng'
    },
    {
        id: 3,
        code: 'NV 785',
        full_name: 'Nguyễn Văn Quyết',
        role: 'employee',
        permission: 'Quản lý doanh thu'
    },
    {
        id: 4,
        code: 'NV 286',
        full_name: 'Nguyễn Văn Quyết',
        role: 'employee',
        permission: 'Quản lý bài viết, khách hàng'
    },
    {
        id: 5,
        code: 'NV 246',
        full_name: 'Nguyễn Văn Quyết',
        role: 'employee',
        permission: 'Quản lý bài viết'
    },
    {
        id: 6,
        code: 'NV 798',
        full_name: 'Nguyễn Văn Quyết',
        role: 'employee',
        permission: 'Quản lý bài viết'
    }
]

const InformationManagedByAdmin = () => {
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.down('md'));
    const [showAll, setShowAll] = useState(false);
    const [showInformationMember, setShowInformationMember] = useState(false);
    const [showInformationEmployee, setShowInformationEmployee] = useState(false);

    const handleShowMember = () => {
        setShowAll(true);
        setShowInformationMember(true)
    }

    const handleShowEmployee = () => {
        setShowAll(true);
        setShowInformationEmployee(true)
    }
    return (
        <>
        {!showAll && (
            <Box p={2}>
                <Stack direction='row' justifyContent='space-between'>
                    {mdUp ? (
                        <>
                            <Typography fontWeight={700}>Quản lý khách hàng</Typography>
                            <Tooltip title = 'Xem tất cả'>
                                <IconButton
                                    handleFunt={handleShowMember}
                                    icon={<ChevronRight/>}
                                    backgroundColor="transparent"
                                />
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Typography fontWeight={700} fontSize='20px'>Quản lý khách hàng</Typography>
                            <Stack direction='row' onClick={handleShowMember} sx={{ cursor: 'pointer'}}>
                                <Typography pt={1} fontWeight={500} fontSize='14px'>Xem tất cả</Typography>
                                <IconButton
                                    handleFunt={() => {}}
                                    icon={<ChevronRight/>}
                                    backgroundColor="transparent"
                                />
                            </Stack>
                        </>
                    )}
                </Stack>
                <Grid mt={2} container spacing={3} gap={3}>
                    {DATA_INFOR_MEMBER.slice(0,6).map((data, index) => {
                        return (
                            <Grid key={index} size={{ xs: 12, md: 4}}>
                                <CardInformation
                                    avatar={avatar}
                                >
                                    <Stack direction='row' justifyContent='space-between'>
                                        <Typography fontSize={{ xs: '14px', md: '16px'}} pt={1} fontWeight={700}>{data.code}</Typography>
                                        <IconButton
                                            title="Xem chi tiết"
                                            handleFunt={() => {}}
                                            icon={<Visibility color="warning"/>}
                                            backgroundColor="transparent"
                                        />
                                    </Stack>
                                    <Typography fontSize={{ xs: '14px', md: '16px'}} mb={1}>{`Họ tên: ${data.full_name}`}</Typography>
                                    <Typography fontSize={{ xs: '14px', md: '16px'}} mb={1}>{`Thành viên: ${data.member}`}</Typography>
                                    <Typography fontSize={{ xs: '14px', md: '16px'}}>{`Ngày kết nạp: ${data.startedDate}`}</Typography>
                                </CardInformation>
                            </Grid>    
                        )
                    })}
                </Grid>

                {/* Quản lý phân quyền */}
                <Stack mt={4} direction='row' justifyContent='space-between'>
                    {mdUp ? (
                        <>
                            <Typography fontWeight={700}>Quản lý phân quyền</Typography>
                            <Tooltip title = 'Xem tất cả'>
                                <IconButton
                                    handleFunt={handleShowEmployee}
                                    icon={<ChevronRight/>}
                                    backgroundColor="transparent"
                                />
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Typography fontWeight={700} fontSize='20px'>Quản lý phân quyền</Typography>
                            <Stack direction='row' onClick={handleShowEmployee} sx={{ cursor: 'pointer'}}>
                                <Typography pt={1} fontWeight={500} fontSize='14px'>Xem tất cả</Typography>
                                <IconButton
                                    handleFunt={() => {}}
                                    icon={<ChevronRight/>}
                                    backgroundColor="transparent"
                                />
                            </Stack>
                        </>
                    )}
                </Stack>
                <Grid mt={2} container spacing={3} gap={3}>
                    {DATA_INFOR_EMPLOYEE.slice(0,6).map((data, index) => {
                        return (
                            <Grid key={index} size={{ xs: 12, md: 4}}>
                                <CardInformation
                                    avatar={avatar}
                                >
                                    <Stack direction='row' justifyContent='space-between'>
                                        <Typography fontSize={{ xs: '14px', md: '16px'}} pt={1} fontWeight={700}>{data.code}</Typography>
                                        <Stack direction='row'>
                                            <IconButton
                                                title="Xem chi tiết"
                                                handleFunt={() => {}}
                                                icon={<Visibility color="warning"/>}
                                                backgroundColor="transparent"
                                                width='0'
                                                height='0'
                                            />
                                            <IconButton
                                                title="Gán quyền"
                                                handleFunt={() => {}}
                                                icon={<AdminPanelSettings color="warning"/>}
                                                backgroundColor="transparent"
                                                width='0'
                                                height='0'
                                            />
                                            <IconButton
                                                title="Xóa"
                                                handleFunt={() => {}}
                                                icon={<Delete color="error"/>}
                                                backgroundColor="transparent"
                                                width='0'
                                                height='0'
                                            />
                                        </Stack>
                                    </Stack>
                                    <Typography fontSize={{ xs: '14px', md: '16px'}} mb={1}>{`Họ tên: ${data.full_name}`}</Typography>
                                    <Typography fontSize={{ xs: '14px', md: '16px'}} mb={1}>{`Chức vụ: ${getRoleLabel(data.role)}`}</Typography>
                                    <Typography fontSize={{ xs: '14px', md: '16px'}}>{`Phân quyền: ${data.permission}`}</Typography>
                                </CardInformation>
                            </Grid>    
                        )
                    })}
                </Grid>
            </Box>
        )}
        {showAll && showInformationEmployee && DATA_INFOR_EMPLOYEE &&  (
            <ShowAllInformationEmployee
                data={DATA_INFOR_EMPLOYEE}
                handleBack={() => {
                    setShowAll(false)
                    setShowInformationEmployee(false)
                }}
            />
        )}
        {showAll && showInformationMember && DATA_INFOR_MEMBER && (
            <ShowAllInformationMember
                data={DATA_INFOR_MEMBER}
                handleBack={() => {
                    setShowAll(false)
                    setShowInformationMember(false)
                }}
            />
        )}
        </>
    )
}

export default InformationManagedByAdmin;