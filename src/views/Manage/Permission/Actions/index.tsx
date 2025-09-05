import Page from "@/components/Page";
import { Alert, Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useCallback, useEffect, useMemo, useState } from "react";
import SearchBox from "../../components/SearchBox";
import { COLORS } from "@/constants/colors";
import { Add, Delete, Edit } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";
import { IAction } from "@/types/permisstion";
import { createAction, getActions, updateAction } from "@/services/permission-service";
import useNotification from "@/hooks/useNotification";
import { debounce } from "lodash";
import IconButton from "@/components/IconButton/IconButton";
import CustomPagination from "@/components/Pagination/CustomPagination";

export interface FormDataActions {
    code: string;
    name: string;
}

type FormErrors = {
    [K in keyof FormDataActions]?: string
}

const Actions = () => {
    const notify = useNotification();
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [openAction, setOpenAction] = useState<{type: string, open: boolean}>({
        type: '',
        open: false
    });
    const [actions, setActions] = useState<IAction[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<FormDataActions>({
        code: '',
        name: '',
    })
    const [errors, setErrors] = useState<FormErrors>({});
    const [action, setAction] = useState<IAction | null>(null)

    const fetchActionsData = useCallback(async (page: number, limit: number, searchTerm?: string) => {
        setLoading(true);
        try {
            const actionsRes = await getActions({ page: page, limit: limit, searchTerm: searchTerm});
            const data = actionsRes.data?.actions as any as IAction[];
            setActions(data);
            actionsRes.data?.totalActions && setTotal(actionsRes.data.totalActions);
        } catch (error: any) {
            setError(error.message);
            setActions([]);
            setTotal(0);
        }finally {
            setLoading(false);
        }
    }, [])

    const debounceGetActions = useMemo(
        () => debounce((page: number, limit: number, searchTerm?: string) => {
            fetchActionsData(page, limit, searchTerm);
        }, 500),
        [fetchActionsData]
    )

    useEffect(() => {
        if(searchTerm) {
            debounceGetActions(page, rowsPerPage, searchTerm)
        }else {
            debounceGetActions.cancel();
            fetchActionsData(page, rowsPerPage)
        }
    }, [page, rowsPerPage, searchTerm]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    }
    const handleOpenAddActions = () => {
        setOpenAction({
            type: 'add',
            open: true
        })
        setFormData({
            code: '',
            name: ''
        })
    }

    const handleInputChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if(errors[name as keyof typeof errors]){
            setErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }

    const validateForm = () : boolean => {
        const newErrors: FormErrors = {};
        if(!formData.code) newErrors.code = 'Vui lòng nhập mã';
        if(!formData.name) newErrors.name = 'Vui lòng nhập tên';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSave = async() => {
        if(!validateForm()) {
            return
        }
        try {
            let res: any;
            if(openAction.type === 'add') {
                const payload = { ...formData };
                res = await createAction(payload);
            }else{
                const { code, ...payload} = formData;
                res = action && await updateAction(action.id,payload);
            }

            notify({
                message: res.message,
                severity: 'success'
            })
            setFormData({
                code: '',
                name: ''
            })
            fetchActionsData(page, rowsPerPage)
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }
    }

    const handleCancel = () => {
        openAction.type === 'edit' ?
            setOpenAction({
                type: 'edit',
                open: false
            })
            : 
            setOpenAction({
                type: 'add',
                open: false
            })
        setFormData({
            code: '',
            name: ''
        })
    }

    const handleOpenEditAction = (action: IAction) => {
        setAction(action)
        setOpenAction({
            type: 'edit',
            open: true
        })
        setFormData({
            code: action.code,
            name: action.name
        })
    }

    return (
        <Page title="Quản lý chung - Thao tác">
            <Box>
                <SearchBox
                    initialValue={searchTerm}
                    onSearch={handleSearch}
                >
                    <Button
                        sx={{ border: COLORS.BUTTON, bgcolor: COLORS.BUTTON}}
                        endIcon={<Add/>}
                        onClick={handleOpenAddActions}
                    >
                        Thêm thao tác
                    </Button>
                </SearchBox>
                {!openAction.open && (
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
                                    <Table stickyHeader aria-label="group-task">
                                        <TableHead>
                                            <TableRow sx={{ height: 50}}>
                                                {['STT', 'Mã', 'Tên', 'Thao tác'].map((header, index) => (
                                                    <TableCell sx={{ textAlign: 'center', fontWeight: 700, bgcolor: '#a6cfebff'}} key={index}>{header}</TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {actions.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={4} align="center">
                                                        Không tồn tại bản ghi nào
                                                    </TableCell>
                                                </TableRow>
                                            ): (
                                                actions.map((action, index) => {
                                                    return(
                                                        <TableRow key={index}>
                                                            <TableCell align="center">{index + 1}</TableCell>
                                                            <TableCell align="center">{action.code}</TableCell>
                                                            <TableCell align="center">{action.name}</TableCell>
                                                            <TableCell align="center">
                                                                <IconButton
                                                                    handleFunt={() => action && handleOpenEditAction(action)}
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
                {openAction.open && (
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 4}}>
                            <Box m={3} bgcolor='#fff' p={4}>
                                <Typography mb={1} textAlign='center' fontWeight={700} variant="h5">
                                    {openAction.type === 'edit' ? "Chỉnh sửa thao tác" : 'Thêm mới thao tác'}
                                </Typography>
                                <Grid container spacing={3}>
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
                                            disabled={openAction.type === 'edit'}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12}}>
                                        <Typography fontWeight={700} fontSize='15px'>Tên thao tác</Typography>
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
                                    <Grid size={{ xs: 12}} sx={{ display: 'flex', justifyContent: 'center'}}>
                                        <Button
                                            onClick={handleSave}
                                            sx={{
                                                mr: 1.5,
                                                border: COLORS.BUTTON,
                                                bgcolor: COLORS.BUTTON,
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
                        <Grid size={{ xs: 12, md: 8}}>
                            {actions.length === 0 ? (
                                <Typography m={3} fontWeight={700}>Không tồn tại bản ghi nào cả</Typography>
                            ) : (
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
                                                <Table stickyHeader aria-label="group-task">
                                                    <TableHead>
                                                        <TableRow sx={{ height: 50}}>
                                                            {['STT', 'Mã', 'Tên', 'Thao tác'].map((header, index) => (
                                                                <TableCell sx={{ textAlign: 'center', fontWeight: 700, bgcolor: '#a6cfebff'}} key={index}>{header}</TableCell>
                                                            ))}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {actions.length === 0 ? (
                                                            <TableRow>
                                                                <TableCell colSpan={4} align="center">
                                                                    Không tồn tại bản ghi nào
                                                                </TableCell>
                                                            </TableRow>
                                                        ): (
                                                            actions.map((action, index) => {
                                                                return(
                                                                    <TableRow key={index}>
                                                                        <TableCell align="center">{index + 1}</TableCell>
                                                                        <TableCell align="center">{action.code}</TableCell>
                                                                        <TableCell align="center">{action.name}</TableCell>
                                                                        <TableCell align="center">
                                                                            <IconButton
                                                                                handleFunt={() => action && handleOpenEditAction(action)}
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
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Page>
    )
}

export default Actions;