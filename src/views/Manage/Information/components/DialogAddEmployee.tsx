import DialogComponent from "@/components/DialogComponent";
import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { ChangeEvent, useRef, useState } from "react";
import Grid from "@mui/material/Grid2";
import { getPathImage } from "@/utils/url";
import { PhotoCamera } from "@mui/icons-material";
import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import { resizeImage } from "@/utils/common";
import useNotification from "@/hooks/useNotification";

export interface FormDataEmployees{
    email: string,
    full_name: string,
    password: string,
    passwordConfirm: string,
    phone_number: string,
}

type FormErrors = {
    [K in keyof FormDataEmployees]?: string
}

interface DialogAddEmployeeProps{
    onClose: () => void;
    open: boolean;
}

const DialogAddEmployee: React.FC<DialogAddEmployeeProps> = ({ open, onClose }) => {
    const notify = useNotification();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [initialAvatarUrl, setInitialAvatarUrl] = useState<string | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [password, setPassword] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<FormDataEmployees>({
        email: '',
        full_name: '',
        password: '',
        passwordConfirm: '',
        phone_number: '',
    })

    let finalDisplayAvatarSrc: string | undefined = undefined;
    if (avatarPreview) {
        finalDisplayAvatarSrc = avatarPreview;
    } else if (initialAvatarUrl) {
        finalDisplayAvatarSrc = getPathImage(initialAvatarUrl);
    }
    const handleClose = () => {
        onClose()
    }

    const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;
    const handleInputChange = (name: string, value: any) => {
        const validName = name as keyof FormDataEmployees;
        setFormData(prev => ({ ...prev, [name]: value}));

        if(validName === 'email' && typeof value === 'string'){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // chuẩn email đơn giản
            if(!emailRegex.test(value)){
                setErrors(prev => ({...prev, email: 'Email không hợp lệ'}));
                return
            }
        }

        if(validName === 'password' && typeof value === 'string'){
            setPassword(value)
        }

        if(validName === 'passwordConfirm' && typeof value === "string"){
            if(value !== password){
                setErrors(prev => ({...prev, passwordConfirm: 'Mật khẩu và nhập lại mật khẩu không khớp'}));
                return
            }
        }

        if(validName === 'phone_number' && typeof value === 'string'){
            const phone = value.replace(/\s|-/g, '');
            if(!/^\d+$/.test(phone)){
                setErrors(prev => ({...prev, phone_number: 'Số điện thoại chỉ chứa số'}));
                return
            }

            if(phone.startsWith('0') && phone.length !== 10){
                setErrors(prev => ({...prev, phone_number: 'Số điện thoại phải có 10 chữ số (nếu bắt đầu bằng 0)'}));
                return
            }

            if(phone.startsWith('+84') && (phone.length < 11 || phone.length > 12)){
                setErrors(prev => ({...prev, phone_number: 'Số điện thoại phải có 11-12 chữ số (nếu bắt đầu bằng +84)'}));
                return
            }

            if(!phoneRegex.test(phone)){
                setErrors(prev => ({...prev, phone_number: 'Số điện thoại không đúng định dạng (bắt đầu từ +84|03|05|07|08|09)'}))
            }
        }

        if(errors[name as keyof typeof errors]){
            setErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }

    const validateForm = () : boolean => {
        const newErrors: FormErrors = {};
        if(!formData.email) newErrors.email = 'Vui lòng nhập email';
        if(!formData.full_name) newErrors.full_name = 'Vui lòng nhập họ tên';
        if(!formData.password) newErrors.password = 'Vui lòng nhập mật khẩu';
        if(!formData.password) newErrors.passwordConfirm = 'Vui lòng nhập lại mật khẩu';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleChangeAvatar = async(event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if(file && file.type.startsWith('image/')){
            const { blob, previewUrl } = await resizeImage(file, 800);
            const newFile = new File([blob], file.name, { type: "image/jpeg" });
            setImageFile(newFile)
            setAvatarPreview(previewUrl)
        }else{
            // if (!file) notify({ message: 'Vui lòng chọn file ảnh.', severity: 'warning' });
            setAvatarPreview(null);
            event.target.value = "";
        }
        //Reset lại input để onChange được gọi nếu chọn lại cùng 1 ảnh
        if(fileInputRef.current){
            fileInputRef.current.value = "";
        }
    }

    console.log("imageFile: ",imageFile);
    

    const handleSave = async() => {
        if(!validateForm()){
            return;
        }

        const newData = {
            ...formData,
            is_active: 1,
            is_change_type: 0.
        }

        const { passwordConfirm, ...payload} = newData;
        console.log("payload: ",payload);
        
    }
    
    return (
        <DialogComponent
            dialogKey={open}
            isActiveFooter={false}
            isActiveHeader={false}
            handleClose={handleClose}
        >
                <Typography textAlign='center' mb={1} fontWeight={700} variant="h5">Thêm mới nhân viên</Typography>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12}} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2.5 }}>
                        <Box sx={{ position: 'relative', width: 120, height: 120}}>
                            <Avatar
                                src={finalDisplayAvatarSrc}
                                sx={{ width: '100%', height: '100%', mb: 2, bgcolor: 'grey.600', borderRadius: '50%', boxShadow: 4}}
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: 'grey.300',
                                    borderRadius: '50%',
                                    minWidth: '30px',
                                    width: '30px',
                                    height: '30px',
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 5
                                }}
                                component='label'
                                startIcon={<PhotoCamera sx={{ width: '25px', height: '25px', ml: 1.2, color: '#1C1A1B'}}/>}
                            >
                                <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={handleChangeAvatar}/>
                            </Button>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12}}>
                        <Typography fontWeight={700} fontSize='15px'>Họ tên</Typography>
                        <InputText
                            name="full_name"
                            onChange={handleInputChange}
                            type="text"
                            label=""
                            placeholder="Nhập thông tin"
                            margin="none"
                            error={!!errors.full_name}
                            helperText={errors.full_name}
                        />
                    </Grid>
                    <Grid size={{ xs: 12}}>
                        <Typography fontWeight={700} fontSize='15px'>Email</Typography>
                        <InputText
                            name="email"
                            onChange={handleInputChange}
                            type="text"
                            label=""
                            placeholder="Nhập thông tin"
                            margin="none"
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid size={{ xs: 12}}>
                        <Typography fontWeight={700} fontSize='15px'>Mật khẩu</Typography>
                        <InputText
                            name="password"
                            onChange={handleInputChange}
                            type="text"
                            label=""
                            placeholder="Nhập thông tin"
                            margin="none"
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                    </Grid>
                    <Grid size={{ xs: 12}}>
                        <Typography fontWeight={700} fontSize='15px'>Nhập lại mật khẩu</Typography>
                        <InputText
                            name="passwordConfirm"
                            onChange={handleInputChange}
                            type="text"
                            label=""
                            placeholder="Nhập thông tin"
                            margin="none"
                            error={!!errors.passwordConfirm}
                            helperText={errors.passwordConfirm}
                        />
                    </Grid>
                    <Grid size={{ xs: 12}}>
                        <Typography fontWeight={700} fontSize='15px'>Số điện thoại</Typography>
                        <InputText
                            name="phone_number"
                            onChange={handleInputChange}
                            type="text"
                            label=""
                            placeholder="Nhập thông tin"
                            margin="none"
                        />
                    </Grid>
                    <Grid size={{ xs: 12}} sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Button onClick={handleSave} sx={{ mr: 1.5, border: COLORS.BUTTON, bgcolor: COLORS.BUTTON}}>Lưu</Button>
                        <Button onClick={handleClose} variant="outlined" sx={{ border: '1px solid #000', color: '#000'}}>Hủy</Button>
                    </Grid> 
                </Grid>
        </DialogComponent>
    )
}

export default DialogAddEmployee;