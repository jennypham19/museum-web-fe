import DialogComponent from "@/components/DialogComponent";
import useNotification from "@/hooks/useNotification";
import { assignedGroupToUser, getObjectPermisstion, getRoleGroupToUser } from "@/services/permission-service";
import { IMenu, IPermission } from "@/types/permisstion";
import { IUser } from "@/types/user";
import { Alert, Box, Button, Checkbox, CircularProgress, Collapse, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Pagination, Paper, TextField, Typography } from "@mui/material";
import React, {useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid2";
import { ArrowLeft, ArrowRight, Circle, ExpandLess, ExpandMore, Search } from "@mui/icons-material";
import { useDataList } from "@/hooks/useDataList";


interface DialogAttactPermissionProps{
    open: boolean,
    onClose: () => void;
    user: IUser;
}

const DialogAttactPermission: React.FC<DialogAttactPermissionProps> = ({ open, onClose, user }) => {
    const notify = useNotification();
    const [assignedGroups, setAssignedGroups] = useState<IPermission | null>(null);
    const [checked, setChecked] = useState<number | null>(null);
    const [openCollapse, setOpenCollapse] = useState<Record<number, boolean>>({});
    const [errorPer, setErrorPer] = useState<string>('');
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { listData, loading, error } = useDataList<IPermission>((params) => getObjectPermisstion(params, 'role-groups-with-menu'),5);

    //Danh sách id nhóm chưa gán
    const unassignedGroups = listData.filter(
        (group) => assignedGroups?.id !== group.id
    )

    // Bộ lọc theo tên
    const filteredRoleGroupsUnassigned = useMemo(
        () => 
            unassignedGroups.filter((a) => 
            a.name.toLowerCase().includes(search.toLowerCase())
        ),
        [unassignedGroups, search]
    )

    // Phân trang
    const totalPages = Math.ceil(filteredRoleGroupsUnassigned.length/5);
    const paginatedRoleGroupsUnassigned = useMemo(() => {
        const start = (page - 1) * 5;
        return filteredRoleGroupsUnassigned.slice(start, start + 8)
    }, [filteredRoleGroupsUnassigned, page])

    const getRoleGroupAssignedUser = async(id: number) => {
        const res = await getRoleGroupToUser(id);
        const data = res.data as any as IPermission;
        setAssignedGroups(data)
    }

    useEffect(() => {
        if(open && user){
            getRoleGroupAssignedUser(user.id)
        }
    },[open,user])

    const handleToggle = (value: number) => {
        if(checked === value){
            setChecked(null); // bỏ chọn
        } else {
            setChecked(value);
            setErrorPer('');
        }
    }

    const handleExpandClick = (groupId: number) => {
        setOpenCollapse(prev => ({
        ...prev,
        [groupId]: !prev[groupId]
        }));
    };

    const handleAdd = () => {
        if(checked === null) return;
        const newAssigned = unassignedGroups.find(g => checked === g.id);
        if(!newAssigned) return;
        setAssignedGroups(newAssigned);
        setChecked(null);
        setErrorPer('')
    }

    const handleRemove = () => {
        if(checked === null) return;
        if(assignedGroups?.id === checked) {
            setAssignedGroups(null);
            setChecked(null);
        }
    }

    const handleSave = async() => {
        if(!assignedGroups){
            setErrorPer("Bạn chưa chọn nhóm quyền");
            return;
        }
        const data = {
            userId: user.id,
            roleGroupId: assignedGroups.id
        }

        try {
            const res = await assignedGroupToUser(data);
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

    const handleClose = () => {
        onClose()
    }

    const renderMenuItem = (menu: IMenu, level = 0) => {
    return (
        <div key={menu.id} style={{ marginLeft: level * 20 }}>
        {/* Tên menu */}
        <ListItem key={menu.id} sx={{ pl:10}}>
            <ListItemIcon><Circle sx={{ fontSize: '10px'}}/></ListItemIcon>
            <Typography variant="subtitle2">{menu.name}</Typography>
        </ListItem>

        {/* Children (nếu có) */}
        {menu.children &&
            menu.children.length > 0 &&
            menu.children.map((child) => renderMenuItem(child, level + 1))}
        </div>
    );
    };
    const renderGroupListLeft = (groups: IPermission[]) => (
        <List dense>
            {groups.map((group) => (
                <React.Fragment key={group.id}>
                    <ListItemButton
                        disabled={!!assignedGroups}
                        onClick={() => {
                            if(!assignedGroups) handleToggle(group.id)
                        }}
                    >
                        <ListItemIcon>
                            <Checkbox
                                edge='start'
                                checked={checked === group.id}
                                disabled={checked !== null && checked !== group.id || !assignedGroups}
                            />
                        </ListItemIcon>
                        <ListItemText primary={group.name}/>
                        <Box onClick={(e) => { e.stopPropagation(); handleExpandClick(group.id)}}>
                            {openCollapse[group.id] ? <ExpandLess/> : <ExpandMore/>}
                        </Box>
                    </ListItemButton>
                    <Collapse in={openCollapse[group.id]} timeout='auto' unmountOnExit>
                        <List disablePadding>
                            {group.permissions.map((child) => renderMenuItem(child))}
                        </List>
                    </Collapse>
                </React.Fragment>
            ))}
        </List>
    )

    const renderGroupListRight = (group: IPermission | null) => (
        <List dense>
            {group && (
                <React.Fragment key={group.id}>
                <ListItemButton onClick={() => handleToggle(group.id)}>
                    <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked === group.id}
                        disabled={checked !== null && checked !== group.id}
                    />
                    </ListItemIcon>
                    <ListItemText primary={group.name} />
                    <Box onClick={(e) => { e.stopPropagation(); handleExpandClick(group.id)}}>
                    {openCollapse[group.id] ? <ExpandLess/> : <ExpandMore/>}
                    </Box>
                </ListItemButton>
                <Collapse in={openCollapse[group.id]} timeout='auto' unmountOnExit>
                    <List disablePadding>
                    {group.permissions?.map((child) => renderMenuItem(child))}
                    </List>
                </Collapse>
                </React.Fragment>
            )}
        </List>
    )

    return(
        <DialogComponent
            dialogKey={open}
            handleClose={handleClose}
            isActiveFooter={false}
            dialogTitle="Gán quyền"
            maxWidth='lg'
        >
            <TextField
                placeholder="Tìm kiếm nhóm quyền"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1)
                }}
                size="small"
                fullWidth
                sx={{ 
                    mt: 1,
                    "& .MuiInputBase-not": {
                        padding: 0,
                        borderRadius: 5,
                        color: '#000',
                    },
                    "& .MuiInputBase-input::placeholder": {
                        color: "#000"
                    }
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment
                            position="start"
                            sx={{
                                height:"100%", // Đảm bảo InputAdornment chiếm toàn bộ chiều cao của input
                                maxHeight:"none", // Override default maxHeight
                                marginRight:0, // Remove default margin-right
                                display: "flex",
                                alignItems: "center", // Căn giữa icon và divider theo chiều dọc
                                justifyContent: 'center', // Căn giữa nội dung trong adornment
                                paddingRight: "12px" // Padding cho divider bên phải
                            }}
                        >
                            <Search sx={{ fontSize: '25px' }}/>
                        </InputAdornment>
                    ),
                    sx:{
                        "& .MuiOutlinedInput-notchedOutline":{
                            borderColor:'#1C1A1B'
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: '#1C1A1B',
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            // borderColor: "rgba(0, 0, 0, 0.2)",
                            border:`1px solid '#1C1A1B''}`
                        },
                        ".MuiInputBase-input":{
                            // padding: "12px 14px", // Điều chỉnh padding cho text input, bỏ padding trái vì adornment đã lo
                            paddingLeft:0 // Bỏ padding mặc định bên trái vì đã có adornment,
                        },
                        // Áp dụng border radius cho chính input field
                        borderRadius: 5,
                        color: '#fff'
                    },
                }}
            />
            {loading && (
                <Box display='flex' justifyContent='center' my={3}>
                    <CircularProgress/>
                </Box> 
            )}
            {error && !loading && (
                <Alert severity="error" sx={{ my: 2}}>{error}</Alert>
            )}
            {!error && !loading && (
                <>
                   <Typography textAlign='center' sx={{ p: 1 }} variant="h6" fontWeight={600} gutterBottom>{`Gán nhóm quyền cho ${user.fullName}`}</Typography>
                    {errorPer && (
                        <Typography mb={2} variant="body2" fontWeight={600} color="error">{errorPer}</Typography>
                    )}
                    <Grid container spacing={2}>
                        {/* LEFT LIST */}
                        <Grid size={{ xs: 5}}>
                            {paginatedRoleGroupsUnassigned.length === 0 ? (
                                <Paper variant="outlined" sx={{ height: 185, overflow: "auto" }}>
                                    <Typography m={1} variant="body2" fontWeight={600}>Không tồn tại nhóm quyền nào cả</Typography>
                                </Paper>
                            ) : (
                                <Paper variant="outlined" sx={{ overflow: "auto" }}>
                                    <Typography variant="subtitle2" fontWeight={600} p={1} borderBottom='solid 1px #d3cfd1ff'>Danh sách nhóm quyền chưa được gán</Typography>
                                        {renderGroupListLeft(paginatedRoleGroupsUnassigned)}
                                    {totalPages > 1 && (
                                        <Box display="flex" justifyContent="center" mt={3} borderTop='1px solid #d3cfd1ff'>
                                            <Pagination
                                                count={totalPages}
                                                page={page}
                                                onChange={(_, val) => setPage(val)}
                                                color="primary"
                                            />
                                        </Box>
                                    )}
                                </Paper>
                            )}
                        </Grid>
                        {/* CENTER BUTTONS */}
                        <Grid size={{ xs: 2 }}>
                            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
                                <Button
                                    variant="outlined"
                                    onClick={handleAdd}
                                    disabled={checked === null || !unassignedGroups.some(g => g.id === checked)}
                                    sx={{ mb: 2 }}
                                >
                                    <ArrowRight 
                                        fontSize="large" 
                                        sx={{
                                        color: checked === null || !unassignedGroups.some(g => g.id === checked) ? 'grey.400' : 'primary.main'
                                        }}
                                    />
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={handleRemove}
                                    disabled={checked === null || assignedGroups?.id !== checked}
                                >
                                    <ArrowLeft 
                                        fontSize="large"
                                        sx={{
                                        color: checked === null || assignedGroups?.id !== checked ? 'grey.400' : 'primary.main'
                                        }}
                                    />
                                </Button>
                            </Box>
                        </Grid>
                        {/* LEFT LIST */}
                        <Grid size={{ xs: 5 }}>
                            {!assignedGroups ? (
                                <Paper variant="outlined" sx={{ overflow: "auto" }}>
                                    <Typography m={1} variant="body2" fontWeight={600}>Không tồn tại nhóm quyền nào cả</Typography>
                                </Paper>
                            ) : (
                                <Paper variant="outlined" sx={{ overflow: "auto" }}>
                                    <Typography variant="subtitle2" fontWeight={600} p={1} borderBottom='solid 1px #d3cfd1ff'>Danh sách nhóm quyền được gán</Typography>
                                        {renderGroupListRight(assignedGroups)}
                                </Paper>
                            )}
                        </Grid>
                    </Grid>
                    <Box mt={2} display='flex' justifyContent='center'>
                        <Button disabled={!!errorPer} onClick={handleSave} sx={{ width: '100px', position: 'relative', bgcolor:"#1C1A1B", color: 'white', mr: 2}}>Lưu</Button>
                        <Button onClick={handleClose} variant="outlined" sx={{ border: 'solid 1px #1C1A1B', color: '#1C1A1B', width: '100px'}}>Hủy</Button>
                    </Box>
                </>
            )}
        </DialogComponent>
    )
}

export default DialogAttactPermission;