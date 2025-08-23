import IconButton from "@/components/IconButton/IconButton";
import { AdminPanelSettings, ChevronRight, Delete, ToggleOff, Visibility } from "@mui/icons-material";
import { Box, Stack, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import avatar from "@/assets/images/users/avatar.png";
import CardInformation from "../../Information/components/CardInfomation";
import { useEffect, useState } from "react";
import ShowAllInformationEmployee from "../../Information/components/ShowAllInformationEmployee";
import { IMember, IUser } from "@/types/user";
import { getRoleLabel } from "@/utils/labelEntoVni";
import ShowAllInformationMember from "../../Information/components/ShowAllInformationMember";
import { deleteUser, getUsers, unactiveUser, UserPayload } from "@/services/user-service";
import DialogConfirm from "../../components/DialogConfirm";
import useNotification from "@/hooks/useNotification";
import DialogConfirmSuccess from "../../components/DialogConfirmSuccess";
import DialogDetailUser from "../../Information/components/DialogDetailUser";


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


const InformationManagedByAdmin = () => {
    const notify = useNotification();
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.down('md'));
    //data
    const page = 1;
    const rowPerPage = 12;
    const [users, setUsers] = useState<IUser[]>([]);
    const [user, setUser] = useState<IUser | null>(null);

    //action
    const [showAll, setShowAll] = useState(false);
    const [showInformationMember, setShowInformationMember] = useState(false);
    const [showInformationEmployee, setShowInformationEmployee] = useState(false);
    const [openDialogConfirmUnactive, setOpenDialogConfirmUnactive] = useState(false);
    const [openDialogConfirmUnactiveSuccess, setOpenDialogConfirmUnactiveSuccess] = useState(false);
    const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState(false);
    const [openDialogConfirmDeleteSuccess, setOpenDialogConfirmDeleteSuccess] = useState(false);
    const [openDialogDetailUser, setOpenDialogDetailUser] = useState(false)

    const fetchUsersData = async(currentPage: number, currentSize: number, role: string, status?: number |string) => {
        const usersResponse = await getUsers(currentPage, currentSize, role,  status);
        const newUser = usersResponse.users as any as IUser[];
        const listUsers: IUser[] = newUser.map((data, index) => {
            return {
                ...data,
                code: `${data.id}${index}${index + 1}`
            }
        })
        setUsers(listUsers);
    }

    useEffect(() => {
        fetchUsersData(page, rowPerPage, 'employee', 1)
    }, [page, rowPerPage])

    const handleShowMember = () => {
        setShowAll(true);
        setShowInformationMember(true)
    }

    const handleShowEmployee = () => {
        setShowAll(true);
        setShowInformationEmployee(true)
    }

    // Vô hiệu hóa
    const handleOpenDialogConfirmUnactive = (user: IUser) => {
        setUser(user);
        setOpenDialogConfirmUnactive(true)
    }

    const handleUnactive = async() => {
        try {
            const data: UserPayload = {
                is_active: 0
            }
            user && await unactiveUser(user.id, data);
            setOpenDialogConfirmUnactive(false)
            setOpenDialogConfirmUnactiveSuccess(true)
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error' 
            })
        }
    }

    // Xóa
    const handleOpenDialogConfirmDelete = (user: IUser) => {
        setUser(user);
        setOpenDialogConfirmDelete(true)
    }

    const handleDelete = async() => {
        try {
            user && await deleteUser(user.id);
            setOpenDialogConfirmDelete(false)
            setOpenDialogConfirmDeleteSuccess(true)
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error' 
            })
        }
    }

    // Xem chi tiết
    const handleOpenDialogDetailUser = (user: IUser) => {
        setUser(user);
        setOpenDialogDetailUser(true)
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
                    {users.slice(0,6).map((data, index) => {
                        return (
                            <Grid key={index} size={{ xs: 12, md: 4}}>
                                <CardInformation
                                    avatar={data.avatar_url ? data.avatar_url : avatar}
                                >
                                    <Stack direction='row' justifyContent='space-between'>
                                        <Typography fontSize={{ xs: '14px', md: '16px'}} pt={1} fontWeight={700}>{`NV ${data.code}`}</Typography>
                                        <Stack direction='row'>
                                            <IconButton
                                                title="Xem chi tiết"
                                                handleFunt={() => data && handleOpenDialogDetailUser(data)}
                                                icon={<Visibility color="warning"/>}
                                                backgroundColor="transparent"
                                                width='0'
                                                height='0'
                                            />
                                            <IconButton
                                                title="Gán quyền"
                                                handleFunt={() => {}}
                                                icon={<AdminPanelSettings color="primary"/>}
                                                backgroundColor="transparent"
                                                width='0'
                                                height='0'
                                            />
                                            <IconButton
                                                title="Vô hiệu hóa"
                                                handleFunt={() => data && handleOpenDialogConfirmUnactive(data)}
                                                icon={<ToggleOff color="success"/>}
                                                backgroundColor="transparent"
                                                width='0'
                                                height='0'
                                            />
                                            <IconButton
                                                title="Xóa"
                                                handleFunt={() => data && handleOpenDialogConfirmDelete(data)}
                                                icon={<Delete color="error"/>}
                                                backgroundColor="transparent"
                                                width='0'
                                                height='0'
                                            />
                                        </Stack>
                                    </Stack>
                                    <Typography fontSize={{ xs: '14px', md: '16px'}} my={1}>{`Họ tên: ${data.full_name}`}</Typography>
                                    <Typography fontSize={{ xs: '14px', md: '16px'}} mb={1}>{`Chức vụ: ${getRoleLabel(data.role)}`}</Typography>
                                    {data.permission && <Typography fontSize={{ xs: '14px', md: '16px'}}>{`Phân quyền: ${data.permission}`}</Typography>}
                                </CardInformation>
                            </Grid>    
                        )
                    })}
                </Grid>
            </Box>
        )}
        {showAll && showInformationEmployee && users &&  (
            <ShowAllInformationEmployee
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
        {openDialogConfirmUnactive && user && (
            <DialogConfirm
                open={openDialogConfirmUnactive}
                onClose={() => {
                    setOpenDialogConfirmUnactive(false)
                }}
                title={`Bạn có muốn vô hiệu hóa tài khoản của ${user.full_name} này không?`}
                handleAgree={handleUnactive}
            />
        )}
        {openDialogConfirmUnactiveSuccess && (
            <DialogConfirmSuccess
                open={openDialogConfirmUnactiveSuccess}
                onClose={() => {
                    setOpenDialogConfirmUnactiveSuccess(false)
                    fetchUsersData(page, rowPerPage, 'employee', 1)
                }}
                title={`Bạn đã vô hiệu hóa tài khoản thành công.`}
            />
        )}
        {openDialogConfirmDelete && user && (
            <DialogConfirm
                open={openDialogConfirmDelete}
                onClose={() => {
                    setOpenDialogConfirmDelete(false)
                }}
                title={`Bạn có muốn xóa tài khoản của ${user.full_name} này không?`}
                handleAgree={handleDelete}
            />
        )}
        {openDialogConfirmDeleteSuccess && (
            <DialogConfirmSuccess
                open={openDialogConfirmDeleteSuccess}
                onClose={() => {
                    setOpenDialogConfirmDeleteSuccess(false)
                    fetchUsersData(page, rowPerPage, 'employee', 1)
                }}
                title={`Bạn đã xóa tài khoản thành công.`}
            />
        )}
        {openDialogDetailUser && user && (
            <DialogDetailUser
                open={openDialogDetailUser}
                onClose={() => {
                    setOpenDialogDetailUser(false)
                }}
                userDetail={user}
            />
        )}
        </>
    )
}

export default InformationManagedByAdmin;