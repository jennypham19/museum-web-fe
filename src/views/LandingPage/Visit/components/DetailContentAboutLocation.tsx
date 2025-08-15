import IconButton from "@/components/IconButton/IconButton";
import InputText from "@/components/InputText";
import { DATA_DATE_THROUGH_LOCATION } from "@/constants/data";
import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DialogClickDate from "./DialogClickDate";
import DateTime from "@/utils/DateTime";
import { Dayjs } from "dayjs";
import useNotification from "@/hooks/useNotification";


interface ObjectItemProps{
    title: string,
    price: number | string, 
    count: number;
    onChange: (newCount: number) => void;
    isLast?: boolean
}

const ObjectItem: React.FC<ObjectItemProps> = ({ isLast = false, title, price, count, onChange }) => {
    return(
        <Box
            sx={{
                py: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: isLast ? 'none' : '1px solid #E6E6E6'
            }}
        >
            <Typography fontSize={{ xs: '13px', md: '16px'}} fontWeight={700}>{title}</Typography>
            <Stack direction='row' spacing={1} alignItems='center'>
                <Typography fontSize={{ xs: '13px', md: '16px'}}>{price}</Typography>
                <IconButton
                    handleFunt={() => onChange(Math.max(count - 1, 0))}
                    icon={<RemoveIcon/>}
                    sx={{
                        "&:hover":{
                            bgcolor: 'white'
                        }
                    }}
                    border="1px solid"
                    height={20}
                    width={20}
                    disabled={count === 0}
                />
                <Typography pt={0.5} px={2} color="text.secondary" textAlign='center'>{(count ?? 0).toString().padStart(2, '0')}</Typography>
                <IconButton
                    handleFunt={() => onChange(count + 1)}
                    icon={<AddIcon/>}
                    sx={{
                        "&:hover":{
                            bgcolor: 'white'
                        }
                    }}
                    border="1px solid"
                    height={20}
                    width={20}
                />
            </Stack>      
        </Box>
    )
}

interface VisitorCounts {
  adultCount: number;
  elderCount: number;
  studentCount: number;
  pupilUnder16Count: number;
  pupilUnder12Count: number;
  childrenCount: number;
}

interface CountMap {
    [locationId: number]: {
        [dateId: number]: VisitorCounts;
    }
}

interface DetailContentAboutLoctionProps{
    totalPrice: (total: number) => void;
    locationId: number | null;
}

const defaultCounts: VisitorCounts = {
  adultCount: 0,
  elderCount: 0,
  studentCount: 0,
  pupilUnder16Count: 0,
  pupilUnder12Count: 0,
  childrenCount: 0,
};

export interface DateItem {
  id: number;
  date: string;
  detail: string;
}

const DetailContentAboutLoction = forwardRef<HTMLDivElement, DetailContentAboutLoctionProps>(( { totalPrice, locationId }, ref ) => {
    const notify = useNotification();
    const [openDateLocation, setOpenDatekLocation] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openDialogClickDate, setOpenDialogClickDate] = useState(false);
    const [idDateLocation, setIdDateLocation] = useState<number | null>(null);
    const [countsMap, setCountsMap] = useState<CountMap>({});
    const [selectedDate, setSelectedDate] = useState('')

    const [adultPrice, setAdultPrice] = useState(120);
    const [studentPrice, setStudentPrice] = useState(80);
    const [pupilUnder16Price, setPupilUnder16Price] = useState(50);
    const [pupilUnder12Price, setPupilUnder12Price] = useState(20);

    const [locationDates, setLocationDates] = useState<DateItem[]>(DATA_DATE_THROUGH_LOCATION);

    const handleClick = (id: number) => {
        setIdDateLocation(id)
        setIsClick(true)
        setOpenDatekLocation(true)
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 400);
        totalPrice(0)
    }

    const handleChangeCount = (field: keyof VisitorCounts, value: number) => {
        if(idDateLocation === null || locationId === null) return;
        setCountsMap((prev) => ({
            ...prev,
            [locationId]: {
                ...prev[locationId],
                [idDateLocation]: {
                    ...prev[locationId]?.[idDateLocation],
                    [field]: value
                }
            }
        }))
    }

    const currentCounts: VisitorCounts = locationId != null && idDateLocation != null ? countsMap[locationId]?.[idDateLocation] ?? defaultCounts : defaultCounts;

    const total = (currentCounts.adultCount * adultPrice) + (currentCounts.studentCount * studentPrice) + (currentCounts.pupilUnder16Count * pupilUnder16Price)
            + (currentCounts.pupilUnder12Count * pupilUnder12Price);
    

    useEffect(() => {
    if (locationId && idDateLocation) {
        // Nếu chưa có thì tạo mới
        setCountsMap((prev) => {
        if (prev[locationId]?.[idDateLocation]) return prev; // đã có thì bỏ qua
        return {
            ...prev,
            [locationId]: {
            ...prev[locationId],
            [idDateLocation]: { ...defaultCounts }
            }
        };
        });
    }
    }, [locationId, idDateLocation]);
    
    useEffect(() => {
        if (totalPrice) {
            totalPrice(total);
        }
    }, [total]);

    const handleClickDate = () => {
        setOpenDialogClickDate(true)
    }

    const handleSelectDate = (date: Dayjs | null) => {
        if(!date) return;
        const formatted = DateTime.formatVietnameseData(date);
        const isExist = locationDates.some(item => item.detail === formatted);
        if(isExist){
            notify({
                message: "Ngày đã có trong danh sách, vui lòng chọn ngày khác.",
                severity: "warning"
            })
            return;
        }
        setSelectedDate(formatted)
        const newDate: DateItem = {
            id: locationDates.length + 1,
            date: 'Ngày khác',
            detail: formatted
        }
        handleClick(newDate.id);
        setLocationDates(prev => [...prev, newDate]);
        setOpenDialogClickDate(false)
    }

    return(
        <Box ref={ref}> 
            <Typography py={1} fontSize={{ xs: '13px', md: '15px'}}>
                Chọn một ngày cố định và chắc chắn rằng bạn sẽ tham dự buổi thăm quan.
            </Typography>
            <Box display='flex' flexDirection={{ xs: 'column', md: 'row'}}>
                {locationDates.map((data, index) => {
                    return(
                        <Paper onClick={() => handleClick(data.id)} key={index}
                            sx={{
                                mt: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                cursor: 'pointer',  
                                mr: 5,
                                py: 1,
                                px: 2,
                                borderRadius: 2,
                                bgcolor: isClick && idDateLocation === index + 1 ? 'black' : 'white',
                                color: isClick && idDateLocation === index + 1 ? 'white' : 'black'
                            }}
                        >
                        <Typography fontSize={{ xs: '13px', md: '15px'}}>{data.date}</Typography>
                        <Typography fontSize={{ xs: '13px', md: '15px'}}>{data.detail}</Typography>
                        </Paper>
                    )
                })}
                {!selectedDate && (
                    <Paper 
                        onClick={handleClickDate}
                        sx={{
                            mt: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            cursor: 'pointer',  
                            mr: 5,
                            py: 1,
                            px: 2,
                            borderRadius: 2,
                        }}
                    >
                        <Typography fontSize={{ xs: '13px', md: '15px'}}>Ngày khác</Typography>
                        <Typography fontSize={{ xs: '13px', md: '15px'}}>Chọn một ngày cụ thể</Typography>
                    </Paper>
                )}
            </Box>
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}><CircularProgress /></Box>
            )}
            {!isLoading && openDateLocation && (
                <Box>
                    <Typography py={4} sx={{ fontSize: { xs: '1.2rem', sm: '1.6rem'}}} fontWeight={600}>Đối tượng thăm quan</Typography>
                    <Typography sx={{ fontSize: { xs: '15px', sm: '18px'}}} fontWeight={700}>
                        Lựa chọn đối tượng thăm quan
                    </Typography>
                    <Typography py={1} fontSize={{ xs: '13px', md: '15px'}}>
                        Lựa chọn số lượng người tham gia thăm quan bảo tàng
                    </Typography>
                    <Stack mt={{ xs: 1.5, md: 3}} direction='column'>
                        <Typography fontWeight={700} fontSize={{ xs: '13px', md: '14px'}}>Nhập mã giảm giá (nếu có)</Typography>
                        <InputText
                            label=""
                            type="text"
                            name="voucher"
                            value=""
                            onChange={() => {}}
                            placeholder="Nhập mã giảm giá (nếu có)"
                        />
                    </Stack>
                    <Typography my={{ xs: 2, md: 3}} fontSize={{ xs: '13px', md: '14px'}}>Tổng số lượng người tham gia tính cả những suất vé miễn phí</Typography>
                    <Typography fontSize={{ xs: '14px', md: '16px'}} borderBottom='1px solid #3E3E3E'>Giá vé với các đối tượng khách hàng</Typography>
                    <ObjectItem title="Người trưởng thành" price={`${adultPrice}.000 VNĐ`} count={currentCounts.adultCount} onChange={(val) => handleChangeCount('adultCount', val)}/>
                    <ObjectItem title="Người cao tuổi (trên 65 tuổi)" price="Miễn phí" count={currentCounts.elderCount} onChange={(val) => handleChangeCount('elderCount', val)}/>
                    <ObjectItem title="Sinh viên (từ 16 tuổi trở lên)" price={`${studentPrice}.000 VNĐ`} count={currentCounts.studentCount} onChange={(val) => handleChangeCount('studentCount', val)}/>
                    <ObjectItem title="Học sinh (từ dưới 16 tuổi)" price={`${pupilUnder16Price}.000 VNĐ`} count={currentCounts.pupilUnder16Count} onChange={(val) => handleChangeCount('pupilUnder16Count', val)}/>
                    <ObjectItem title="Học sinh (từ dưới 12 tuổi)" price={`${pupilUnder12Price}.000 VNĐ`} count={currentCounts.pupilUnder12Count} onChange={(val) => handleChangeCount('pupilUnder12Count', val)}/>
                    <ObjectItem title="Trẻ em (0 - 3 tuổi)" price="Miễn phí" count={currentCounts.childrenCount} onChange={(val) => handleChangeCount('childrenCount', val)} isLast={true}/>
                </Box>
            )}

            {openDialogClickDate && (
                <DialogClickDate
                    open={openDialogClickDate}
                    onClose={() => {
                        setOpenDialogClickDate(false)
                    }}
                    onConfirm={handleSelectDate}
                />
            )}
        </Box>
    )
});

export default DetailContentAboutLoction;