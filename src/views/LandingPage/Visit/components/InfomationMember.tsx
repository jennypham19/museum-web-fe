import IconButton from "@/components/IconButton/IconButton";
import { IPackageMember } from "@/types/landingpage";
import { ArrowBack, MenuBook } from "@mui/icons-material";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";

interface InformationMemberProps{
    inforMember: IPackageMember,
    handleBack: () => void;
}

interface FormDataMember{
    full_name: string,
    email: string,
    phone: string,
    role_package: string

}

type FormErrors = {
    [K in keyof FormDataMember]?: string
}

const renderTitleCardApplying = (inforMember: IPackageMember): string  => {
  // Tạo chuỗi quyền lợi từ benefits
  const benefitsStr = inforMember.benefits
    .split("\n")
    .map((el) => `- ${el}`) // thêm dấu gạch đầu dòng
    .join("\n"); // xuống dòng
  
  return `Quyền lợi ${inforMember.title}: ${inforMember.includes}\n${benefitsStr}`;
};

const InformationMember: React.FC<InformationMemberProps> = ({ inforMember, handleBack}) => {
    const [formData, setFormData] = useState<FormDataMember>({
        full_name: '',
        email: '',
        phone: '',
        role_package: renderTitleCardApplying(inforMember)
    })

    const [errors, setErrors] = useState<FormErrors>({});

    const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;

    const handleInputChange = (name: string, value: any) => {
        const validName = name as keyof FormDataMember;

        setFormData(prev => ({ ...prev, [name]: value }));
        
        //regex email
        if(validName === 'email' && typeof value === 'string'){
            const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setErrors(prev => ({
                    ...prev,
                    email: "Email không hợp lệ"
                }));
                return;
            }
        }
        //regex phone
        if (validName === 'phone' && typeof value === 'string') {
            const phone = value.replace(/\s|-/g, '');
            if (!/^\d+$/.test(phone)) {
                setErrors(prev => ({
                    ...prev,
                    phone: 'Số điện thoại chỉ chứa số',
                }));
                return;
            }
            if(phone.startsWith('0') && phone.length !== 10){
                setErrors(prev => ({
                    ...prev,
                    phone: 'Số điện thoại phải có 10 chữ số (nếu bắt đầu bằng 0)',
                }));
                return;
            }

            if(phone.startsWith('+84') && (phone.length < 11 || phone.length > 12)){
                setErrors(prev => ({
                    ...prev,
                    phone: 'Số điện thoại phải có 11-12 chữ số (nếu bắt đầu bằng +84)',
                }));
                return;
            }

            if(!phoneRegex.test(phone)){
                setErrors(prev => ({
                    ...prev,
                    phone_number: 'Số điện thoại không đúng định dạng (bắt đầu từ +84|03|05|07|08|09',
                }));
                return;
            }
        }
        if(errors[name as keyof typeof errors]){
            setErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }
    return (
        <Box px={{ xs: 3, md: 10}} mb={{ xs: 2, md: 6}}>
            <Box borderBottom='1px solid grey' display='flex' flexDirection='row' mb={1} mt={{ xs: 4, md: 5}}>
                <IconButton
                    handleFunt={handleBack}
                    icon={<ArrowBack sx={{ width: { xs: 20, md: 20}, height: { xs: 20, md: 20}, color: '#000'}}/>}
                    title="Quay lại"
                />
                <Typography fontSize={{ xs: '1.2rem', sm: '1.8rem'}} fontWeight={600}>Thông tin hội viên</Typography>
            </Box>
            <Stack py={1.5} direction={{ xs: 'column', md: 'row'}}>
                <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}}>Thông tin cơ bản:</Typography>
                {['Họ tên', 'Email', 'Số điện thoại', 'Ngày gia nhập', 'Ngày hết hạn', 'Quyền lợi']. map((item, index) => (
                    <Typography 
                        key={index}
                        px={{ xs: 0, md: 2}}
                        fontSize={{ xs: '14px', md: '18px'}}
                        fontWeight={600}
                    >
                        {item}
                    </Typography>
                ))}
            </Stack>

            {/* Thông tin thành viên */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8}}>
                    <Typography pt={4} pb={1} sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem'}}} fontWeight={600}>Thông tin thành viên</Typography>
                    <Typography> Bạn hãy nhập thông tin chính xác của mình tại đây</Typography>
                    <Box pr={{ xs: 0, md: 20}}>
                    <Grid sx={{ mt: 3}} container spacing={3}>
                        <Grid size={{ xs: 12}}>
                            <Typography fontWeight={700} fontSize='15px'>Họ và tên</Typography>
                            <InputText
                                name="full_name"
                                onChange={handleInputChange}
                                type="text"
                                label=""
                                placeholder="Nhập thông tin"
                                margin="none"
                                value={formData.full_name}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6}}>
                            <Typography fontWeight={700} fontSize='15px'>Email</Typography>
                            <InputText
                                name="email"
                                onChange={handleInputChange}
                                type="text"
                                label=""
                                placeholder="Nhập thông tin"
                                margin="none"
                                value={formData.email}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6}}>
                            <Typography fontWeight={700} fontSize='15px'>Số điện thoại</Typography>
                            <InputText
                                name="phone"
                                onChange={handleInputChange}
                                type="text"
                                label=""
                                placeholder="Nhập thông tin"
                                margin="none"
                                value={formData.phone}
                                error={!!errors.phone}
                                helperText={errors.phone}
                            />
                        </Grid>
                        <Grid size={{ xs: 12}}>
                            <Typography fontWeight={700} fontSize='15px'>Quyền lợi gói</Typography>
                            <InputText
                                name="phone"
                                onChange={handleInputChange}
                                type="text"
                                label=""
                                placeholder="Nhập thông tin"
                                margin="none"
                                multiline
                                rows={6}
                                value={formData.role_package}
                                disabled
                            />
                        </Grid>
                    </Grid>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4}}>
                    <Box display='flex' justifyContent='center'>
                        <Paper sx={{ bgcolor: '#E6E6E6', p: { xs: 3, md: 4}, display: 'flex', flexDirection: 'column', borderRadius: '10px'}}>
                            <Stack direction='row' mb={2}>
                                <MenuBook sx={{ fontSize: { xs: '20px', md: '30px'}}}/>
                                <Typography px={{ xs: 1, md: 2}} fontSize={{ xs: '14px', md: '20px'}} fontWeight={600}>
                                    Hướng dẫn đăng ký gói thành viên cho hội viên mới:
                                </Typography>
                            </Stack>
                            <Typography fontSize={{ xs: '13px', md: '17px'}}>
                                1. Bước 1: Bạn chọn gói thành viên muốn tham gia <b>Tham gia &gt; Thông tin thành viên &gt; Nhập thông tin</b>
                            </Typography>
                            <Typography fontSize={{ xs: '13px', md: '17px'}}>
                                2. Bước 2: Sau khi bạn nhập thông tin, màn hình website sẽ tự động điều hướng tới trang tiếp theo để kiểm tra thông tin. <b>Bạn vui lòng chờ khoảng 15 giây.</b>
                            </Typography>
                            <Typography fontSize={{ xs: '13px', md: '17px'}}>
                                3. Bước 3: Bạn vui lòng kiểm tra kỹ thông tin. Thông tin chính xác hãy <b>Thanh toán &gt; Chờ 15 phút &gt; Thông báo thành công.</b> Thông báo sẽ được gửi qua email hoặc số điện thoại bạn đã đăng ký. Vui lòng kiểm tra và xác nhận.
                            </Typography>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
            {/* End thông tin thành viên */}
        </Box>
    )
}

export default InformationMember;