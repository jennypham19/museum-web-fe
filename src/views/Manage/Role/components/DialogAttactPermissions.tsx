import DialogComponent from "@/components/DialogComponent";
import useNotification from "@/hooks/useNotification";
import { assignedGroupToUser, getRoleGroupsWithMenu, getRoleGroupToUser } from "@/services/permission-service";
import { IMenu, IPermission } from "@/types/permisstion";
import { IUser } from "@/types/user";
import { Alert, Box, Button, Checkbox, CircularProgress, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import React, {useEffect, useState } from "react";
import SearchBox from "../../components/SearchBox";
import Grid from "@mui/material/Grid2";
import { ArrowLeft, ArrowRight, Circle, ExpandLess, ExpandMore } from "@mui/icons-material";
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

    const { listData, searchTerm, loading, error, handlePageChange, handleSearch, total, page, rowsPerPage, fetchData } = useDataList<IPermission>(getRoleGroupsWithMenu);

    //Danh sách id nhóm chưa gán
    const unassignedGroups = listData.filter(
        (group) => assignedGroups?.id !== group.id
    )

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
            <SearchBox
                initialValue={searchTerm}
                onSearch={handleSearch}
                placeholder="Tìm kiếm theo tên"
                isPermission={true}
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
                            {unassignedGroups.length === 0 ? (
                                <Paper variant="outlined" sx={{ height: 185, overflow: "auto" }}>
                                    <Typography m={1} variant="body2" fontWeight={600}>Không tồn tại nhóm quyền nào cả</Typography>
                                </Paper>
                            ) : (
                                <Paper variant="outlined" sx={{ overflow: "auto" }}>
                                    <Typography variant="subtitle2" fontWeight={600} p={1} borderBottom='solid 1px #d3cfd1ff'>Danh sách nhóm quyền chưa được gán</Typography>
                                        {renderGroupListLeft(unassignedGroups)}
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