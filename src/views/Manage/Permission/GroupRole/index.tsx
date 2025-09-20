import Page from "@/components/Page";
import useNotification from "@/hooks/useNotification";
import { Alert, Box, Button, Checkbox, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react";
import SearchBox from "../../components/SearchBox";
import { COLORS } from "@/constants/colors";
import { Add, Delete, Edit } from "@mui/icons-material";
import { IMenu, IPermission } from "@/types/permisstion";
import { createRoleGroup, getAllModules, getPermissions, getPermissionWithMenuAction, updateRoleGroup } from "@/services/permission-service";
import IconButton from "@/components/IconButton/IconButton";
import TableData from "../../components/TableData";
import CustomPagination from "@/components/Pagination/CustomPagination";
import { useDataList } from "@/hooks/useDataList";

const GroupRole = () => {
    const notify = useNotification();
    const [permissionData, setPermissionData] = useState<IPermission | null>(null);
    const [openRoleGroup, setOpenRoleGroup] = useState<{type: string, open: boolean}>({
        type: '',
        open: false
    });
    const [modules, setModules] = useState<IMenu[]>([]);
    const [groupName, setGroupName] = useState("");
    const [errorGroupName, setErrorGroupName] = useState<string>('');
    const [errorCheckedAction, setErrorCheckedAction] = useState<string>('');
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const { listData, searchTerm, loading, error, handlePageChange, handleSearch, total, page, rowsPerPage, fetchData } = useDataList<IPermission>(getPermissions);

    const getModules = async() => {
        const res = await getAllModules();
        const data = res.data as any as IMenu[];
        setModules(data);
    };

    useEffect(() => {
        if(openRoleGroup.open){
            getModules();
        }
    },[openRoleGroup.open]);


    const handleOpenAddRoleGroup = () => {
        setOpenRoleGroup({
            type: 'add',
            open: true
        });
        setGroupName('')
        setChecked({})  
    }

    const extractChecked = (permissions: IMenu[]) => {
        const checkedMap: Record<string, boolean> = {};

        const dfs = (menu: IMenu) => {
            if(menu.actions) {
                menu.actions.forEach((act) => {
                    checkedMap[`${menu.code}_${act.name}`] = true;
                });
            }
            if(menu.children){
                menu.children.forEach(dfs);
            }
        };

        permissions.forEach(dfs);
        return checkedMap;
    }

    const handleOpenEditRoleGroup = async(id: number) => {
        setOpenRoleGroup({
            type: 'edit',
            open: true
        })
        const res = await getPermissionWithMenuAction(id);
        const data = res.data as any as IPermission;
        setPermissionData(data)
        setGroupName(data.name);
        if(data.permissions) {
            const checkedMap = extractChecked(data.permissions);
            setChecked(checkedMap)
        }
    }

    const handleClose = () => {
        switch (openRoleGroup.type) {
            case 'add':
                setOpenRoleGroup({
                    type: 'add',
                    open: false
                });
                break;
            case 'edit': 
                setOpenRoleGroup({
                    type: 'edit',
                    open: false
                });
                break;
            default:
                break;
        } 
        setGroupName('')
        setChecked({})
        fetchData(page, rowsPerPage)                            
    }
    
    const validateForm = () : boolean => {
        let newErrors: string = '';
        if(!groupName.trim()){
            newErrors = 'Tên nhóm quyền không được để trống'
        }
        setErrorGroupName(newErrors)
        return !!groupName;
    }

    // tìm tất cả action unique
    const allActions = Array.from(
        new Set(modules.flatMap((m) => m.actions && m.actions.map((a) => a.name)))
    );

    const handleChangeGroupName = (value: any) => {
        setGroupName(value);
        setErrorGroupName('')
    }

    const handleCheck = (moduleCode: string, actionName: string | undefined) => (event: React.ChangeEvent<HTMLInputElement>) => { 
        const key = `${moduleCode}_${actionName}`;
        setChecked({
            ...checked,
            [key]: event.target.checked
        });
        setErrorCheckedAction('')
    };

    // Kiểm tra có ít nhất 1 true trong checked
    const hasAnyChecked = Object.values(checked).some((val) => val === true);

    // Hàm đệ quy để lấy menu + actions đã được check
    const buildPermission = (menu: IMenu, checked: Record<string, boolean>) => {
        // Lấy action được check
        const actions = menu.actions && menu.actions
            .filter((a) => checked[`${menu.code}_${a.name}`])
            .map((a) => ({
                id: a.id,
                code: a.code,
                name: a.name,
            }))
        
        // Duyệt children đệ quy
        const children: any = (menu.children ?? [])
            .map((child) => buildPermission(child, checked))
            .filter((c) => c !== null); // bỏ các node không có action và không có children hợp lệ

        // Nếu node hiện tại không có action và children => bỏ qua (return null)
        if (actions && actions.length === 0 && children.length === 0) {
            return null;
        }

        return {
            ...menu,
            actions,
            children
        }
    }

    const handleSave = async () => {
        if(!validateForm()) {
            return;
        }

        if(!hasAnyChecked) {
            setErrorCheckedAction('Bạn phải chọn ít nhất 1 quyền/ hành động.')
        }

        // prepare payload
        const permissions = modules.map((m) => buildPermission(m, checked)).filter((p) => p !== null);

        const data = {
            "name": groupName,
            permissions
        }

        try {
            let res: any;
            switch (openRoleGroup.type) {
                case 'add':
                    res = await createRoleGroup(data);
                    setChecked({})
                    setGroupName('')
                    break;
                case 'edit':
                    res = permissionData && await updateRoleGroup(permissionData?.id, data);
                    setGroupName(res.data.name)
                    if(res.permissions) {
                        const checkedMap = extractChecked(data.permissions);
                        setChecked(checkedMap)
                    }
                    break;
                default:
                    break;
            }
            
            notify({
                message: res.message,
                severity: 'success'
            })

        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }
        
    }
    
    // Render đệ quy menu + children
    const renderModuleRow = (mod: IMenu, level = 1) => {
        return(
            <React.Fragment key={mod.id}>
                <TableRow>
                    <TableCell sx={{ pl: level * 3}}>
                        {mod.name}
                    </TableCell>
                    {allActions.map((action) => {
                        return (
                            <TableCell key={action} align="center">
                                {mod.actions && mod.actions.some((a) => a.name === action) ? (
                                    <Checkbox
                                        checked={checked[`${mod.code}_${action}`] || false}
                                        onChange={handleCheck(mod.code, action)}
                                    />
                                ) : null}
                            </TableCell>
                        )
                    })}
                </TableRow>
                {/* render children nếu có */}
                {mod.children && mod.children.length > 0 &&
                    mod.children.map((child) => renderModuleRow(child, level + 1))
                }
            </React.Fragment>
        )
    }
    return (
        <Page title="Quản lý quyền - Nhóm quyền">
            <Box>
                <SearchBox
                    initialValue={searchTerm}
                    onSearch={handleSearch}
                    placeholder="Tìm kiếm theo mã, tên"
                >
                    <Button
                        sx={{ border: COLORS.BUTTON, bgcolor: COLORS.BUTTON}}
                        endIcon={<Add/>}
                        onClick={handleOpenAddRoleGroup}
                    >
                        Thêm nhóm quyền
                    </Button>
                </SearchBox>
                {!openRoleGroup.open && (
                    <>
                        {loading && (
                            <Box display='flex' justifyContent='center' my={3}>
                                <CircularProgress/>
                            </Box>
                        )}
                        {error && !loading && (
                            <Alert severity="error" sx={{ my: 2}}>{error}</Alert>
                        )}
                        {!error && !loading && (
                            <Box my={2}>
                                <TableData
                                    label="role-group"
                                    array={['STT', 'Tên', 'Thao tác']}
                                    data={listData}
                                    colSpan={3}
                                    renderRow={(permission, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{permission.name}</TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    handleFunt={() => permission && handleOpenEditRoleGroup(permission.id)}
                                                    icon={<Edit color="info"/>}
                                                    tooltip="Chỉnh sửa"
                                                />
                                                <IconButton
                                                    handleFunt={() => {}}
                                                    icon={<Delete color="error"/>}
                                                    tooltip="Xóa"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                />
                                <Box display='flex' justifyContent='center'>
                                    <CustomPagination
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        count={total}
                                        onPageChange={handlePageChange}
                                    />
                                </Box>
                            </Box>
                        )}
                    </>
                )}
                {openRoleGroup.open && (
                    <Paper variant="outlined" sx={{ p: 2, m: 2 }}>
                        <Typography align="center" variant="h6" fontWeight={600} gutterBottom>Tạo nhóm quyền</Typography>
                        <Box mb={2}>
                            <TextField
                                label="Tên nhóm"
                                value={groupName}
                                onChange={(e) => handleChangeGroupName(e.target.value)}
                                fullWidth
                                name="name"
                                error={!!errorGroupName}
                                helperText={errorGroupName}
                            />
                        </Box>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ height: 50}}>
                                        <TableCell sx={{ fontWeight: 700, bgcolor: '#a6cfebff'}}>Quyền/ Hành động</TableCell>
                                        {allActions.map((action, idx) => (
                                            <TableCell sx={{ fontWeight: 700, bgcolor: '#a6cfebff'}} key={idx} align="center">{action}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {modules.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={1 + allActions.length} align="center">Không tồn tại bản ghi nào</TableCell>
                                        </TableRow>
                                    ) : (
                                        modules.map((mod) => renderModuleRow(mod))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {errorCheckedAction && (
                            <Typography mt={2} fontWeight={700} variant="subtitle2" color="error">{errorCheckedAction}</Typography>
                        )}
                        <Box mt={3} display='flex' justifyContent='center'>
                            <Button 
                                sx={{ width: '150px', bgcolor: COLORS.BUTTON, color: 'white', mr: 2}} 
                                variant="contained"
                                onClick={handleSave}
                            >
                                Lưu nhóm quyền
                            </Button>
                            <Button 
                                sx={{ width: '150px', border:"1px solid #1C1A1B", color: '#000'}} 
                                variant="outlined" 
                                onClick={handleClose}
                            >
                                Hủy
                            </Button>
                        </Box>
                    </Paper>
                )}
            </Box>
        </Page>
    )
}

export default GroupRole;