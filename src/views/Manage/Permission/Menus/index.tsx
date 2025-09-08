import Page from "@/components/Page";
import useNotification from "@/hooks/useNotification";
import { IMenu } from "@/types/permisstion";
import { Alert, Box, Button, CircularProgress, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useState } from "react";
import SearchBox from "../../components/SearchBox";
import { COLORS } from "@/constants/colors";
import { Add, Delete, Edit } from "@mui/icons-material";
import IconButton from "@/components/IconButton/IconButton";
import CustomPagination from "@/components/Pagination/CustomPagination";
import Grid from "@mui/material/Grid2"
import InputText from "@/components/InputText";
import InputSearch from "@/components/SearchBar";
import InputSelect from "@/components/InputSelect";
import DialogAction from "./components/DialogAction";

export interface FormDataActionMenu {
    code: string;
    name: string;
}

export interface FormDataMenus{
    code: string;
    name: string;
    parentCode?: string;
    path?: string;
    icon?: string | null;
    actions: FormDataActionMenu[];
}

type FormErrors = {
    [K in keyof FormDataMenus]?: string
}

const Menus = () => {
    const notify = useNotification();
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [openMenu, setOpenMenu] = useState<{type: string, open: boolean}>({
        type: '',
        open: false
    });
    const [openDialogAction, setOpenDialogAction] = useState(false);
    const [menus, setMenus] = useState<IMenu[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<FormDataMenus>({
        code: '', name: '', parentCode: '', path: '', icon: '', actions: []
    })
    const [errors, setErrors] = useState<FormErrors>({});
    const [menu, setMenu] = useState<IMenu | null>(null);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const handleOpenAddMenu = () => {
        setOpenMenu({
            type: 'add',
            open: true
        });
        setFormData({
            code: '', name: '', parentCode: '', path: '', icon: '', actions: []
        })
    }

    const handleInputChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value}))
    }

    const handleCancel = () => {
        openMenu.type === 'edit' ? 
            setOpenMenu({
                type: 'edit',
                open: false
            }) :
            setOpenMenu({
                type: 'add',
                open: false
            })
        setFormData({
           code: '', name: '', parentCode: '', path: '', icon: '', actions: [] 
        })
    }

    const handleSave = async() => {

    }

    const handleOpenDialogAction = () => {
        setOpenDialogAction(true)
    }

    const handleSaveAction = (data: {code: string, name: string}) => {
        setFormData(prev => ({
            ...prev,
            actions: [...prev.actions, data]
        }));
    }

    console.log("data: ", formData);
    
    return (
        <Page title="Quản lý chung - Chức năng">
            <Box>
                <SearchBox
                    initialValue={searchTerm}
                    onSearch={handleSearch}
                >
                    <Button
                        sx={{ border: COLORS.BUTTON, bgcolor: COLORS.BUTTON}}
                        endIcon={<Add/>}
                        onClick={handleOpenAddMenu}
                    >
                        Thêm chức năng
                    </Button>
                </SearchBox>
                {!openMenu.open && (
                    <>
                        {loading && (
                            <Box display='flex' justifyContent='center' my={3}>
                                <CircularProgress/>
                            </Box>
                        )}
                        {error && !loading && (
                            <Alert severity="error" sx={{ my: 2}}>{error}</Alert>
                        )}
                        {!loading && !error && (
                            <Box my={2}>
                                <TableContainer component={Paper}>
                                    <Table stickyHeader aria-label="action">
                                        <TableHead>
                                            <TableRow sx={{ height: 50}}>
                                                {['STT', 'Mã', 'Tên chức năng', 'Chức năng cha', 'Thao tác'].map((header, index) => (
                                                    <TableCell key={index} align="center" sx={{ fontWeight: 700, bgcolor: '#a6cfebff'}}>{header}</TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {menus.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} align="center">
                                                        Không tồn tại bản ghi nào
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                menus.map((menu, index) => {
                                                    return(
                                                        <TableRow key={index}>
                                                            <TableCell align="center">{index + 1}</TableCell>
                                                            <TableCell align="center">{menu.code}</TableCell>
                                                            <TableCell align="center">{menu.name}</TableCell>
                                                            <TableCell align="center">{menu.parentCode}</TableCell>
                                                            <TableCell align="center">
                                                                <IconButton
                                                                    handleFunt={() => {}}
                                                                    icon={<Edit color="info"/>}
                                                                />
                                                                <IconButton
                                                                    handleFunt={() => {}}
                                                                    icon={<Delete color="error"/>}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Box display='flex' justifyContent='center' mt={2}>
                                    <CustomPagination
                                        count={total}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        onPageChange={handlePageChange}
                                    />
                                </Box>
                            </Box>
                        )}
                    </>
                )}
                {openMenu.open && (
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 5}}>
                            <Box m={3} bgcolor='#fff' p={2}>
                                <Typography mb={1} textAlign='center' fontWeight={700} variant="h5">
                                    {openMenu.type === 'edit' ? 'Chỉnh sửa chức năng' : 'Thêm mới chức năng'}
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12}}>
                                        <Typography fontWeight={700} fontSize='15px'>Chức năng cha</Typography>
                                        <InputSelect
                                            name="parentCode"
                                            label=""
                                            value={formData.parentCode ? formData.parentCode : ''}
                                            onChange={handleInputChange}
                                            options={[]}
                                            placeholder="Chọn thông tin"
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12}}>
                                        <Typography fontWeight={700} fontSize='15px'>Mã</Typography>
                                        <InputText
                                            name="code"
                                            onChange={handleInputChange}
                                            value={formData.code}
                                            type="text"
                                            label=""
                                            placeholder="Nhập thông tin"
                                            margin="none"
                                            error={!!errors.code}
                                            helperText={errors.code}
                                            disabled={openMenu.type === 'edit'}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12}}>
                                        <Typography fontWeight={700} fontSize='15px'>Tên chức năng</Typography>
                                        <InputText
                                            name="name"
                                            onChange={handleInputChange}
                                            value={formData.name}
                                            type="text"
                                            label=""
                                            placeholder="Nhập thông tin"
                                            margin="none"
                                            error={!!errors.name}
                                            helperText={errors.name}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12}}>
                                        <Typography fontWeight={700} fontSize='15px'>Đường dẫn</Typography>
                                        <InputText
                                            name="path"
                                            onChange={handleInputChange}
                                            value={formData.path}
                                            type="text"
                                            label=""
                                            placeholder="Nhập thông tin"
                                            margin="none"
                                            error={!!errors.path}
                                            helperText={errors.path}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12}}>
                                        <Typography fontWeight={700} fontSize='15px'>Biểu tượng</Typography>
                                        <InputText
                                            name="icon"
                                            onChange={handleInputChange}
                                            value={formData.icon}
                                            type="text"
                                            label=""
                                            placeholder="Nhập thông tin"
                                            margin="none"
                                            error={!!errors.icon}
                                            helperText={errors.icon}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12}}>
                                        <Box mb={1} display='flex' justifyContent='space-between' flexDirection='row'>
                                            <Typography fontWeight={600} fontSize='16px'>Thao tác</Typography>
                                            <Button
                                                sx={{ border: COLORS.BUTTON, bgcolor: COLORS.BUTTON}}
                                                onClick={handleOpenDialogAction}
                                                disabled={!formData.code}
                                            >
                                                Thêm
                                            </Button>
                                        </Box>
                                        <TableContainer component={Paper}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        {['STT', 'Mã', 'Tên', 'Thao tác'].map((header, index) => (
                                                            <TableCell align="center" key={index}>{header}</TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {formData.actions.length === 0 ? (
                                                        <TableRow>
                                                            <TableCell colSpan={4} align="center">
                                                                Không có thao tác
                                                            </TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        formData.actions.map((action, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell align="center">{index + 1}</TableCell>
                                                                <TableCell align="center">{action.code}</TableCell>
                                                                <TableCell align="center">{action.name}</TableCell>
                                                                <TableCell align="center">
                                                                    <IconButton
                                                                        handleFunt={() => {
                                                                            setFormData(prev => ({
                                                                                ...prev,
                                                                                actions: prev.actions.filter((_, i) => i !== index)
                                                                            }))
                                                                        }}
                                                                        icon={<Delete color="error"/>}
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    <Grid size={{ xs: 12}} sx={{ display: 'flex', justifyContent: 'center'}}>
                                        <Button
                                            onClick={handleSave}
                                            sx={{
                                                mr: 1.5,
                                                border: COLORS.BUTTON,
                                                bgcolor: COLORS.BUTTON
                                            }}
                                        >
                                            Lưu
                                        </Button>
                                        <Button
                                            onClick={handleCancel}
                                            variant="outlined"
                                            sx={{
                                                border: '1px solid #000',
                                                color: '#000'
                                            }}
                                        >
                                            Hủy
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 7}}>
                            <>
                                {loading && (
                                    <Box display='flex' justifyContent='center' my={3}>
                                        <CircularProgress/>
                                    </Box>
                                )}
                                {error && !loading && (
                                    <Alert severity="error" sx={{ my: 2}}>{error}</Alert>
                                )}
                                {!loading && !error && (
                                    <Box my={3} mr={3}>
                                        <TableContainer component={Paper}>
                                            <Table stickyHeader aria-label="action">
                                                <TableHead>
                                                    <TableRow sx={{ height: 50}}>
                                                        {['STT', 'Mã', 'Tên chức năng', 'Chức năng cha', 'Thao tác'].map((header, index) => (
                                                            <TableCell key={index} align="center" sx={{ fontWeight: 700, bgcolor: '#a6cfebff'}}>{header}</TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {menus.length === 0 ? (
                                                        <TableRow>
                                                            <TableCell colSpan={5} align="center">
                                                                Không tồn tại bản ghi nào
                                                            </TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        menus.map((menu, index) => {
                                                            return(
                                                                <TableRow key={index}>
                                                                    <TableCell align="center">{index + 1}</TableCell>
                                                                    <TableCell align="center">{menu.code}</TableCell>
                                                                    <TableCell align="center">{menu.name}</TableCell>
                                                                    <TableCell align="center">{menu.parentCode}</TableCell>
                                                                    <TableCell align="center">
                                                                        <IconButton
                                                                            handleFunt={() => {}}
                                                                            icon={<Edit color="info"/>}
                                                                        />
                                                                        <IconButton
                                                                            handleFunt={() => {}}
                                                                            icon={<Delete color="error"/>}
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <Box display='flex' justifyContent='center' mt={2}>
                                            <CustomPagination
                                                count={total}
                                                page={page}
                                                rowsPerPage={rowsPerPage}
                                                onPageChange={handlePageChange}
                                            />
                                        </Box>
                                    </Box>
                                )}
                            </>
                        </Grid>
                    </Grid>
                )}
            </Box>
            {openDialogAction && (
                <DialogAction
                    open={openDialogAction}
                    onClose={() => {
                        setOpenDialogAction(false)
                    }}
                    menuCode={formData.code}
                    onSave={handleSaveAction}
                />
            )}
        </Page>
    )
}

export default Menus;