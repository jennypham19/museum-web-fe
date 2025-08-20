import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchBox from "../../components/SearchBox";
import { COLORS } from "@/constants/colors";
import { AccountBox, Add, AdminPanelSettings, ChevronLeft, Delete, Visibility } from "@mui/icons-material";
import { IUser } from "@/types/user";
import IconButton from "@/components/IconButton/IconButton";
import Grid from "@mui/material/Grid2";
import CardInformation from "./CardInfomation";
import avatar from "@/assets/images/users/avatar.png";
import { getRoleLabel } from "@/utils/labelEntoVni";
import DialogAddEmployee from "./DialogAddEmployee";

interface ShowAllInformationEmployeeProps{
    handleBack: () => void;
    data: IUser[]
}

const ShowAllInformationEmployee: React.FC<ShowAllInformationEmployeeProps> = ({ handleBack, data}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState<IUser[]>([]);
    const [employee, setEmployee] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [pages, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const [openCreateEmployee, setOpenCreateEmployee] = useState(false);
    
    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    }

    const handleSearch = (value: string) => {
        setSearchTerm(value.trim());
    }

    const handleOpenAddEmployee = () => {
        setOpenCreateEmployee(true)
    }
    return (
        <Box>
            <SearchBox
                initialValue={searchTerm}
                onSearch={handleSearch}
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
                    disabled={employees.length === 0}
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
            <Grid m={2} container spacing={3} gap={3}>
                {data.map((item, idx) => {
                    return (
                        <Grid key={idx} size={{ xs: 12, md: 4}}>
                            <CardInformation
                                avatar={avatar}
                            >
                                <Stack direction='row' justifyContent='space-between'>
                                    <Typography fontSize={{ xs: '14px', md: '16px'}} pt={1} fontWeight={700}>{item.code}</Typography>
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
                                <Typography fontSize={{ xs: '14px', md: '16px'}} mb={1}>{`Họ tên: ${item.full_name}`}</Typography>
                                <Typography fontSize={{ xs: '14px', md: '16px'}} mb={1}>{`Chức vụ: ${getRoleLabel(item.role)}`}</Typography>
                                <Typography fontSize={{ xs: '14px', md: '16px'}}>{`Phân quyền: ${item.permission}`}</Typography>
                            </CardInformation>
                        </Grid>
                    )
                })}
            </Grid>
            {openCreateEmployee && (
                <DialogAddEmployee
                    open={openCreateEmployee}
                    onClose={() => {
                        setOpenCreateEmployee(false)
                    }}
                />
            )}
        </Box>
    )
}

export default ShowAllInformationEmployee;