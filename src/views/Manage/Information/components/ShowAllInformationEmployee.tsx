import { Alert, Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import SearchBox from "../../components/SearchBox";
import { COLORS } from "@/constants/colors";
import { AccountBox, Add, AdminPanelSettings, ChevronLeft, Delete, ToggleOff, ToggleOn, Visibility } from "@mui/icons-material";
import { IUser } from "@/types/user";
import IconButton from "@/components/IconButton/IconButton";
import Grid from "@mui/material/Grid2";
import CardInformation from "./CardInfomation";
import avatar from "@/assets/images/users/avatar.png";
import { getRoleLabel } from "@/utils/labelEntoVni";
import DialogAddEmployee from "./DialogAddEmployee";
import CustomPagination from "@/components/Pagination/CustomPagination";
import { IStatus } from "@/types/status";
import { activeUser, deleteUser, getUsers, unactiveUser, UserPayload } from "@/services/user-service";
import { debounce } from "lodash";
import useNotification from "@/hooks/useNotification";
import DialogConfirm from "../../components/DialogConfirm";
import DialogConfirmSuccess from "../../components/DialogConfirmSuccess";

interface ShowAllInformationEmployeeProps{
    handleBack: () => void;
}

const STATUS_USER: IStatus[] = [
    {
        id: 1,
        label: 'Tất cả',
        value: 'all'
    },
    {
        id: 2,
        label: 'Hoạt động',
        value: 1
    },
    {
        id: 3,
        label: 'Không hoạt động',
        value: 0
    },

]

const ShowAllInformationEmployee: React.FC<ShowAllInformationEmployeeProps> = ({ 
    handleBack, 
}) => {
    const notify = useNotification();
    const [openCreateEmployee, setOpenCreateEmployee] = useState(false);
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1);
    const [rowPerPage, setRowPerPage] = useState(12);
    const [users, setUsers] = useState<IUser[]>([]);
    const [user, setUser] = useState<IUser | null>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [status, setStatus] = useState<any>('all')

    //action
    const [openDialogConfirmUnactive, setOpenDialogConfirmUnactive] = useState(false);
    const [openDialogConfirmUnactiveSuccess, setOpenDialogConfirmUnactiveSuccess] = useState(false);
    const [openDialogConfirmActive, setOpenDialogConfirmActive] = useState(false);
    const [openDialogConfirmActiveSuccess, setOpenDialogConfirmActiveSuccess] = useState(false);
    const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState(false);
    const [openDialogConfirmDeleteSuccess, setOpenDialogConfirmDeleteSuccess] = useState(false);

    const fetchUsersData = useCallback(async (currentPage: number, currentSize: number, role: string, status?: number |string, searchTerm?: string) => {
        setLoading(true)
            try {
                const usersResponse = await getUsers(currentPage, currentSize, role,  status, searchTerm);
                const newUser = usersResponse.users as any as IUser[];
                const listUsers: IUser[] = newUser.map((data, index) => {
                    return {
                        ...data,
                        code: `${data.id}${index}${index + 1}`
                    }
                })
                setUsers(listUsers);
                usersResponse.totalUsers && setTotal(usersResponse.totalUsers)
            } catch (error: any) {
                setError(error.message)
            }finally{
                setLoading(false);
            }
    },[])

    const debounceGetListUsers = useMemo(
        () => debounce((currentPage: number, currentLimit: number, role: string, status?: number | string, searchTerm?: string) => {
            fetchUsersData(currentPage, currentLimit, role, status, searchTerm);
        }, 500),
        [fetchUsersData]
    )

    useEffect(() => {
        // Luôn debounce, kể cả khi có 1 hoặc cả 2 filter
        if(searchTerm || (searchTerm && status)){
            debounceGetListUsers(page, rowPerPage, 'employee', status, searchTerm); 
        }else{
            debounceGetListUsers.cancel();
            fetchUsersData(page, rowPerPage, 'employee', status)
        }
    }, [page, rowPerPage, searchTerm, status])

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }

    const handleSearch = (newSearch: string) => {
        setSearchTerm(newSearch)
    }

    const handleChangeStatus = (value: any) => {
        setStatus(value)
    }
    
    const handleOpenAddEmployee = () => {
        setOpenCreateEmployee(true)
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

    // Kích hoạt
    const handleOpenDialogConfirmActive = (user: IUser) => {
        setUser(user);
        setOpenDialogConfirmActive(true)
    }
    
    const handleActive = async() => {
        try {
            const data: UserPayload = {
                is_active: 1
            }
            user && await activeUser(user.id, data);
            setOpenDialogConfirmActive(false)
            setOpenDialogConfirmActiveSuccess(true)
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
    return (
        <Box>
            <SearchBox
                initialValue={searchTerm}
                onSearch={handleSearch}
                status={status}
                listStatus={STATUS_USER}
                onChangeStatus={handleChangeStatus}
                from="status-user"
            >
                <Button
                    sx={{ border: COLORS.BUTTON, bgcolor: COLORS.BUTTON, mr: 2}}
                    endIcon={<Add/>}
                    onClick={handleOpenAddEmployee}
                >
                    Thêm mới
                </Button>
                <Button
                    sx={{ border: COLORS.BUTTON, bgcolor: COLORS.BUTTON}}
                    endIcon={<AccountBox/>}
                    disabled={users.length === 0}
                >
                    Chọn tài khoản
                </Button>
            </SearchBox>
            <Stack mt={1.5} direction='row'>
                <IconButton
                    handleFunt={handleBack}
                    icon={<ChevronLeft/>}
                    backgroundColor="transparent"
                />
                <Typography pt={0.5} fontWeight={700} fontSize='20px'>Quản lý phân quyền</Typography>
            </Stack>
            {loading && (
                <Box display='flex' justifyContent='center' my={3}><CircularProgress/></Box>
            )}
            {error && !loading && (
                <Alert severity="error" sx={{ my: 2}}>{error}</Alert>
            )}
            {!loading && !error && (            
                <Grid m={2} container spacing={3} gap={3}>
                    {users.length === 0 && (
                        <Typography fontWeight={700}>Không tồn tại bản ghi nào cả</Typography>
                    )}
                    {users.map((item, idx) => {
                        return (
                            <Grid key={idx} size={{ xs: 12, md: 4}}>
                                <CardInformation
                                    avatar={item.avatar_url ? item.avatar_url : avatar}
                                >
                                    <Stack direction='row' justifyContent='space-between'>
                                        <Typography fontSize={{ xs: '14px', md: '16px'}} pt={1} fontWeight={700}>{`NV ${item.code}`}</Typography>
                                        {item.is_active === 1 && (
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
                                                    icon={<AdminPanelSettings color="primary"/>}
                                                    backgroundColor="transparent"
                                                    width='0'
                                                    height='0'
                                                />
                                                <IconButton
                                                    title="Vô hiệu hóa"
                                                    handleFunt={() => item && handleOpenDialogConfirmUnactive(item)}
                                                    icon={<ToggleOff color="success"/>}
                                                    backgroundColor="transparent"
                                                    width='0'
                                                    height='0'
                                                />
                                                <IconButton
                                                    title="Xóa"
                                                    handleFunt={() => item && handleOpenDialogConfirmDelete(item)}
                                                    icon={<Delete color="error"/>}
                                                    backgroundColor="transparent"
                                                    width='0'
                                                    height='0'
                                                />
                                            </Stack>
                                        )}
                                        {item.is_active === 0 && (
                                                <IconButton
                                                    title="Kích hoạt"
                                                    handleFunt={() => item && handleOpenDialogConfirmActive(item)}
                                                    icon={<ToggleOn color="error"/>}
                                                    backgroundColor="transparent"
                                                    width='0'
                                                    height='0'
                                                />
                                        )}
                                    </Stack>
                                    <Typography fontSize={{ xs: '14px', md: '16px'}} my={1}>{`Họ tên: ${item.full_name}`}</Typography>
                                    <Typography fontSize={{ xs: '14px', md: '16px'}} mb={1}>{`Chức vụ: ${getRoleLabel(item.role)}`}</Typography>
                                    {item.permission && <Typography fontSize={{ xs: '14px', md: '16px'}}>{`Phân quyền: ${item.permission}`}</Typography>}
                                </CardInformation>
                            </Grid>
                        )
                    })}
                </Grid>
            )}
            <Box display='flex' justifyContent='center' alignItems='center'>
                <CustomPagination
                    count={total}
                    page={page}
                    rowsPerPage={rowPerPage}
                    onPageChange={handlePageChange}
                    sx={{ mt: 1.5}}
                />
            </Box>
            {openCreateEmployee && (
                <DialogAddEmployee
                    open={openCreateEmployee}
                    onClose={() => {
                        setOpenCreateEmployee(false)
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
                        fetchUsersData(page, rowPerPage, 'employee', status)
                    }}
                    title={`Bạn đã vô hiệu hóa tài khoản thành công.`}
                />
            )}
            {openDialogConfirmActive && user && (
                <DialogConfirm
                    open={openDialogConfirmActive}
                    onClose={() => {
                        setOpenDialogConfirmActive(false)
                    }}
                    title={`Bạn có muốn kích hoạt tài khoản của ${user.full_name} này không?`}
                    handleAgree={handleActive}
                />
            )}
            {openDialogConfirmActiveSuccess && (
                <DialogConfirmSuccess
                    open={openDialogConfirmActiveSuccess}
                    onClose={() => {
                        setOpenDialogConfirmActiveSuccess(false)
                        fetchUsersData(page, rowPerPage, 'employee', status)
                    }}
                    title={`Bạn đã kích hoạt tài khoản thành công.`}
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
                        fetchUsersData(page, rowPerPage, 'employee', status)
                    }}
                    title={`Bạn đã xóa tài khoản thành công.`}
                />
            )}
        </Box>
    )
}

export default ShowAllInformationEmployee;