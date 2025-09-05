import { Alert, Box, Button, Card, CardContent, CircularProgress, List, ListItem, ListItemText, Typography } from "@mui/material";
import SearchBox from "../components/SearchBox";
import { useCallback, useEffect, useMemo, useState } from "react";
import { COLORS } from "@/constants/colors";
import { Add, Person } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import { IPackageMember } from "@/types/landingpage";
import InputText from "@/components/InputText";
import { createPackage, getPackages } from "@/services/package-service";
import { debounce } from "lodash";
import useNotification from "@/hooks/useNotification";
import Page from "@/components/Page";


export interface FormDataPackages{
    title: string,
    price: string,
    members: number | null,
    guests: number | null,
    includes: string,
    benefits: string
}

type FormErrors = {
    [K in keyof FormDataPackages]?: string
}

const Packages = () => {
    const notify = useNotification();
    const [searchTerm, setSearchTerm] = useState('');
    const [openAddPackage, setOpenAddPackage] = useState(false);
    const [page, setPages] = useState(1);
    const [rowsPerPage, setRowPerPages] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [packages, setPackages] = useState<IPackageMember[]>([]);
    const [formData, setFormData] = useState<FormDataPackages>({
        title: '',
        price: '',
        members: null,
        guests: null,
        includes: '',
        benefits: ''
    })
    const [members, setMembers] = useState<number | null>(null);
    const [guests, setGuests] = useState<number | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});

    const handleInputChange = (name: string, value: any) => {
        const validName = name as keyof FormDataPackages;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if(validName === 'members'){
            setMembers(value)
        }

        if(validName === 'guests'){
            setGuests(value)
        }

        if(errors[name as keyof typeof errors]){
            setErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }

    useEffect(() => {
        if(members !== null && guests !== null){
            setFormData(prev => ({ ...prev, includes: `${members} thẻ thành viên + ${guests} thẻ khách`}))
        }
    }, [members, guests]);

    const fetchPackagesData = useCallback(async (page: number, size: number, searchTerm?: string) => {
        setLoading(true);
        try {
            const packageResponse = await getPackages({ page: page, limit: size, searchTerm: searchTerm});
            const data = packageResponse.data?.packages as any as IPackageMember[];
            setPackages(data);
            packageResponse.data?.totalPackages && setTotal(packageResponse.data?.totalPackages);
        } catch (error: any) {
            setError(error.message);
            setPackages([]);
            setTotal(0)
        }finally{
            setLoading(false)
        }
    },[])

    const debounceGetPackages = useMemo(
        () => debounce((page: number, size: number, searchTerm?: string) => {
            fetchPackagesData(page, size, searchTerm);
        }, 500),
        [fetchPackagesData]
    )

    useEffect(() => {
        if(searchTerm) {
            debounceGetPackages(page, rowsPerPage, searchTerm)
        }else {
            debounceGetPackages.cancel();
            fetchPackagesData(page, rowsPerPage)
        }
    }, [page, rowsPerPage, searchTerm]);

    const handlePageChange = (newPage: number) => {
        setPages(newPage);
    }

    const handleSearch = (value: string) => {
        setSearchTerm(value.trim());
    }

    const handleOpenAddPackage = () => {
        setOpenAddPackage(true)
    }

    const handleCancel = () => {
        setOpenAddPackage(false);
        setMembers(null);
        setGuests(null);
        setFormData({
            title: '',
            price: '',
            members: null,
            guests: null,
            includes: '',
            benefits: ''
        })
        setErrors({})
    }

    const validateForm = () : boolean => {
        const newErrors: FormErrors = {};
        if(!formData.title) newErrors.title = 'Vui lòng nhập tên gói';
        if(!formData.price) newErrors.price = 'Vui lòng nhập giá';
        if(!formData.members) newErrors.members = 'Vui lòng nhập số lượng thành viên';
        if(!formData.guests) newErrors.guests = 'Vui lòng nhập số lượng khách';
        if(!formData.benefits) newErrors.benefits = 'Vui lòng nhập quyền lợi';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSave = async() => {
        if(!validateForm()) {
            return;
        }

        const payload = {
            ...formData
        }
        const res = await createPackage(payload);
        notify({
            message: res.message,
            severity: 'success'
        })
        setMembers(null);
        setGuests(null);
        setFormData({
            title: '',
            price: '',
            members: null,
            guests: null,
            includes: '',
            benefits: ''
        })
        fetchPackagesData(page, rowsPerPage);
    }

    return (
        <Page title="Quản lý gói thành viên">
            <Box>
                <SearchBox
                    initialValue={searchTerm}
                    onSearch={handleSearch}
                >
                    <Button 
                        sx={{ border: COLORS.BUTTON, bgcolor: COLORS.BUTTON}}
                        endIcon={<Add/>}
                        onClick={handleOpenAddPackage}
                    >
                        Thêm gói thành viên
                    </Button>
                </SearchBox>
                {!openAddPackage && (
                    <>
                        {packages.length === 0 ? (
                            <Typography m={3} fontWeight={700}>Không tồn tại bản ghi nào!</Typography>
                        ) : (
                            <>
                                {loading && (
                                    <Box display='flex' justifyContent='center' my={3}><CircularProgress/></Box>
                                )}
                                {error && !loading && (
                                    <Alert severity="error" sx={{ my: 2}}>{error}</Alert>
                                )}
                                {!loading && !error && (
                                    <Grid sx={{ p: 2}} container spacing={3}>
                                        {packages.map((item, index) => {
                                            return (
                                                <Grid size={{ xs: 12, sm: 6, lg: 3}} key={index}>
                                                    <Card
                                                        sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.03), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)'}}
                                                    >
                                                        <CardContent sx={{ flexGrow: 1,  px: { xs: 2, md: 4}}}>
                                                            <Typography fontWeight={500} fontSize='18px'>{item.title}</Typography>
                                                            <Typography fontWeight={800} fontSize='14px' mt={1}>
                                                                {`${item.price}/ năm`}
                                                            </Typography>
                                                            <Box mt={2} display='flex' flexDirection='row'>
                                                                {[...Array(item.members)].map((_, i) => (
                                                                    <Box mr={1.5} pt={1} border='1px solid' borderRadius={2}>
                                                                        <Person key={`m-${i}`} sx={{ mx: 0.5, width: 20, height: 20}}/>
                                                                    </Box>
                                                                ))}
                                                                <Typography fontWeight={700} fontSize='20px'> + </Typography>
                                                                {[...Array(item.guests)].map((_, i) => (
                                                                    <Box ml={1} pt={1}>
                                                                        <Person key={`g-${i}`} sx={{  width: 20, height: 20}}/>
                                                                    </Box>
                                                                ))}
                                                            </Box>
                                                            <Typography fontWeight={600} fontSize={{ xs: '13px', md: '14px'}} mt={1}>
                                                                Gói bao gồm: {item.includes}
                                                            </Typography>
                                                        </CardContent>
                                                        <Box height={{ xs: '100%', md: 250}} bgcolor='#E6E6E6' sx={{ px: { xs: 2, md: 4}, py: 2}}>
                                                            <Typography fontWeight={700} fontSize='14px'>
                                                                {`QUYỀN LỢI CHO HẠNG ${item.title.split(' ')[2].toUpperCase()}`}
                                                            </Typography>
                                                            <List dense disablePadding>
                                                                {item.benefits.split('\n').map((benefit, index) => (
                                                                    <ListItem key={index}>
                                                                        <ListItemText primary={`• ${benefit}`}/>
                                                                    </ListItem>
                                                                ))}
                                                            </List>
                                                        </Box>
                                                    </Card>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                )}
                            </>
                        )}
                    </>
                )}
                {openAddPackage && (
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 4}}>
                            <Box m={3} bgcolor='#fff' p={4}>
                                <Typography mb={1} textAlign='center' fontWeight={700} variant="h5">Thêm mới gói thành viên</Typography>
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12}}>
                                        <Typography fontWeight={700} fontSize='15px'>Tên gói</Typography>
                                        <InputText
                                            name="title"
                                            onChange={handleInputChange}
                                            type="text"
                                            label=""
                                            placeholder="Nhập thông tin"
                                            margin="none"
                                            value={formData.title}
                                            error={!!errors.title}
                                            helperText={errors.title}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12}}>
                                        <Typography fontWeight={700} fontSize='15px'>Giá</Typography>
                                        <InputText
                                            name="price"
                                            onChange={handleInputChange}
                                            type="text"
                                            label=""
                                            placeholder="Nhập thông tin"
                                            margin="none"
                                            value={formData.price}
                                            error={!!errors.price}
                                            helperText={errors.price}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6}}>
                                        <Typography fontWeight={700} fontSize='15px'>Số thành viên</Typography>
                                        <InputText
                                            name="members"
                                            onChange={handleInputChange}
                                            type="text"
                                            label=""
                                            placeholder="Nhập thông tin"
                                            margin="none"
                                            value={formData.members}
                                            error={!!errors.members}
                                            helperText={errors.members}
                                            onlyPositiveNumber={true}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6}}>
                                        <Typography fontWeight={700} fontSize='15px'>Số khách</Typography>
                                        <InputText
                                            name="guests"
                                            onChange={handleInputChange}
                                            type="text"
                                            label=""
                                            placeholder="Nhập thông tin"
                                            margin="none"
                                            value={formData.guests}
                                            error={!!errors.guests}
                                            helperText={errors.guests}
                                            onlyPositiveNumber={true}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12}}>
                                        <Typography fontWeight={700} fontSize='15px'>Bao gồm</Typography>
                                        <InputText
                                            name="includes"
                                            onChange={handleInputChange}
                                            type="text"
                                            label=""
                                            placeholder="Nhập thông tin"
                                            margin="none"
                                            value={formData.includes}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12}}>
                                        <Typography fontWeight={700} fontSize='15px'>Quyền lợi</Typography>
                                        <InputText
                                            multiline
                                            rows={5}
                                            name="benefits"
                                            onChange={handleInputChange}
                                            type="text"
                                            label=""
                                            placeholder="Nhập thông tin"
                                            margin="none"
                                            value={formData.benefits}
                                            error={!!errors.benefits}
                                            helperText={errors.benefits}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12}} sx={{ display: 'flex', justifyContent: 'center'}}>
                                        <Button onClick={handleSave} sx={{ mr: 1.5, border: COLORS.BUTTON, bgcolor: COLORS.BUTTON}}>Lưu</Button>
                                        <Button onClick={handleCancel} variant="outlined" sx={{ border: '1px solid #000', color: '#000'}}>Hủy</Button>
                                    </Grid>                                
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 8}}>
                            {packages.length === 0 ? (
                                <Typography m={3} fontWeight={700}>Không tồn tại bản ghi nào!</Typography>
                            ) : (
                                <>
                                    {loading && (
                                        <Box display='flex' justifyContent='center' my={3}><CircularProgress/></Box>
                                    )}
                                    {error && !loading && (
                                        <Alert severity="error" sx={{ my: 2}}>{error}</Alert>
                                    )}
                                    {!loading && !error && (
                                        <Box>
                                            <Grid sx={{ p: 3}} container spacing={3}>
                                                {packages.map((item, index) => {
                                                    return (
                                                        <Grid size={{ xs: 12, sm: 6, md: 6}} key={index}>
                                                            <Card
                                                                sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.03), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)'}}
                                                            >
                                                                <CardContent sx={{ flexGrow: 1,  px: { xs: 2, md: 4}}}>
                                                                    <Typography fontWeight={500} fontSize='18px'>{item.title}</Typography>
                                                                    <Typography fontWeight={800} fontSize='14px' mt={1}>
                                                                        {`${item.price}/ năm`}
                                                                    </Typography>
                                                                    <Box mt={2} display='flex' flexDirection='row'>
                                                                        {[...Array(item.members)].map((_, i) => (
                                                                            <Box mr={1.5} pt={1} border='1px solid' borderRadius={2}>
                                                                                <Person key={`m-${i}`} sx={{ mx: 0.5, width: 20, height: 20}}/>
                                                                            </Box>
                                                                        ))}
                                                                        <Typography fontWeight={700} fontSize='20px'> + </Typography>
                                                                        {[...Array(item.guests)].map((_, i) => (
                                                                            <Box ml={1} pt={1}>
                                                                                <Person key={`g-${i}`} sx={{  width: 20, height: 20}}/>
                                                                            </Box>
                                                                        ))}
                                                                    </Box>
                                                                    <Typography fontWeight={600} fontSize={{ xs: '13px', md: '14px'}} mt={1}>
                                                                        Gói bao gồm: {item.includes}
                                                                    </Typography>
                                                                </CardContent>
                                                                <Box height={{ xs: '100%', md: 250}} bgcolor='#E6E6E6' sx={{ px: { xs: 2, md: 4}, py: 1}}>
                                                                    <Typography fontWeight={700} fontSize='14px'>
                                                                        {`QUYỀN LỢI CHO HẠNG ${item.title.split(' ')[2].toUpperCase()}`}
                                                                    </Typography>
                                                                    <List dense disablePadding>
                                                                        {item.benefits.split('\n').map((benefit, index) => (
                                                                            <ListItem key={index}>
                                                                                <ListItemText primary={`• ${benefit}`}/>
                                                                            </ListItem>
                                                                        ))}
                                                                    </List>
                                                                </Box>
                                                            </Card>
                                                        </Grid>
                                                    )
                                                })}
                                            </Grid>
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

export default Packages;