import { Box, Button, Checkbox, Chip, List, ListItemButton, ListItemIcon, ListItemText, Paper, Popper, Stack, Typography } from "@mui/material"
import CommonNavbar from "../Components/CommonNavbar";
import Grid from "@mui/material/Grid2";
import { CalendarMonth, ExpandLess, ExpandMore, Signpost } from "@mui/icons-material";
import { useState } from "react";
import InputSearch from "@/components/SearchBar";
import { DATA_INFO_EVENT_PERFORMANCE, DATA_TYPE_EVENT } from "@/constants/data";
import CommonImage from "@/components/Image/index";
import IconButton from "@/components/IconButton/IconButton";
import InputText from "@/components/InputText";
import dayjs, { Dayjs } from "dayjs";
import SingleMonthCalendar from "./components/SingleMonthCalendar";

interface ContentEventAndPerformanceProps{
    handleOpen: (id: number) => void;
}

const ContentEventAndPerformance: React.FC<ContentEventAndPerformanceProps> = ({ handleOpen }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openId, setOpenId] = useState<number | null>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [checkedItem, setCheckedItem] = useState<{id: number; id_type: number}[]>([]);
    const [selectedDate, setSelectDate] = useState<Dayjs | null>(null)

    const handleSearch = ( newItem: string) =>{
        setSearchTerm(newItem.trim())
    }

    const toggleOpen = (id: number) => {
        setOpenId((prevId) => (prevId === id ? null : id))
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper-btn' : undefined;

    const handleChecked = (item: {id: number; id_type: number}) => {
        const exists = checkedItem.some((s) => s.id === item.id && s.id_type === item.id_type);
        if(exists){
            setCheckedItem((prev) => prev.filter((s) => !(s.id === item.id && s.id_type === item.id_type)));
        }else{
            setCheckedItem((prev) => [...prev, item]);
        }
    }

    const countSelectedInGroup = (idType: number) => checkedItem.filter((item) => item.id_type === idType).length;

    const handleSelectedDate = (date: Dayjs | null) => {
        setSelectDate(date)
    }
    return(
        <Box>
            <CommonNavbar
                title="/ Sự kiện và biểu diễn"
            />
            <Box px={{ xs: 3, md: 10}} mb={{ xs: 2, md: 6}}>
                <Box mb={1} mt={{ xs: 2, md: 3}}>
                    <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.8rem'}}} fontWeight={600}>Sự kiện và biểu diễn</Typography>
                </Box>
                <Box mb={1} mt={{ xs: 2, md: 3}}>
                    <Typography pb={1} fontSize={{ xs: '13px', md: '17px'}} borderBottom='1px solid grey'>Tất cả các sự kiện được bảo tàng tổ chức sắp diễn ra</Typography>
                </Box>
                <Grid sx={{ mt: { xs: 2, md: 3}}} container spacing={3}>
                    <Grid size={{ xs: 12, md: 8}}>
                        <InputSearch
                            initialValue={searchTerm}
                            onSearch={handleSearch}
                            placeholder="Tìm kiếm"
                            color="black"
                            colorIcon="black"
                            borderRadius='5px'
                            borderColor="grey"
                            boxShadow="0px 1px 3px 1px rgba(0, 0, 0, 0.03), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4}}>
                        <Box display='flex' justifyContent={{ xs: 'flex-start', md: 'flex-end'}}>
                            <Button
                                variant="outlined"
                                sx={{
                                    boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.03), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
                                    border: 'grey',
                                    color: 'black',
                                    py: 1.2,
                                    px: 2,
                                    fontSize: { xs: '13px', md: '15px'},
                                    width: { xs: '100%', lg: '50%'},
                                    "&:hover": {
                                        boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.03), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
                                        bgcolor: 'white'
                                    }
                                }}
                                startIcon={<CalendarMonth/>}
                                onClick={handleClick}
                                aria-describedby={id}
                            >
                                {selectedDate ? selectedDate.format("DD/MM/YYYY") : "Bạn muốn đi ngày nào"}
                            </Button>
                            <Popper
                                open={open}
                                id={id}
                                anchorEl={anchorEl}
                                placement="bottom-end"
                            >
                                <Box mt={2} display="flex" justifyContent="center">
                                    <SingleMonthCalendar handleSelectedDate={handleSelectedDate}/>
                                </Box>
                            </Popper>
                        </Box>
                    </Grid>
                </Grid>

                {/* Thông tin sự kiện */}
                    <Box mt={{ xs: 3, md: 5}}>
                        <Typography sx={{ fontSize: { xs: '1rem', sm: '1.5rem'}}} fontWeight={600}>
                            Thông tin sự kiện
                        </Typography>
                    </Box>
                    <Grid container spacing={{ xs: 3, md: 10}}>
                        <Grid size={{ xs: 12, lg:8}}>
                            {DATA_INFO_EVENT_PERFORMANCE.map((data, index) => {
                                return(
                                    <Paper key={index}
                                        sx={{
                                            boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.03), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
                                            my: 2,
                                            display: 'flex',
                                            flexDirection: { xs: 'column', md: 'row'},
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => data.id && handleOpen(data.id)}
                                    >
                                        <CommonImage
                                            src={data.image_url}
                                            alt={data.label}
                                            sx={{ width: { xs: '100%', md: 500}, height: 200, pt: 2, px:2}}
                                        />
                                        <Box py={{ xs: 1, md: 5}} px={2} display='flex' flexDirection='column' width='100%'>
                                            <Stack pb={1} direction='row' borderBottom='1px solid'>
                                                <Signpost sx={{ fontSize: { xs: '20px', md: '30px'}}}/>
                                                <Typography fontSize={{ xs: '15px', md: '20px'}} fontWeight={700}>{data.label}</Typography>
                                            </Stack>
                                            <Typography
                                                fontSize={{ xs: '12px', md: '15px'}}
                                                py={1}
                                                sx={{
                                                    mt: 1, opacity: 0.8,
                                                    overflow: 'hidden', 
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: { xs: 5, sm: 2, md: 4},
                                                    WebkitBoxOrient: 'vertical',
                                                    whiteSpace: 'normal',
                                                    wordBreak: 'break-word',
                                                    borderBottom: '1px solid #E6E6E6'
                                                }}
                                            >
                                                {`${data.content}...`}
                                            </Typography>
                                            <Stack direction='row' justifyContent='space-between' alignItems='center' py={1}>
                                                <Typography fontSize={{ xs: '12px', md: '15px'}}>{data.open}</Typography>
                                                <Typography fontSize={{ xs: '12px', md: '15px'}}>{data.hour}</Typography>
                                            </Stack>
                                        </Box>
                                    </Paper>
                                )
                            })}
                        </Grid>
                        <Grid size={{ xs: 12, lg: 4}}>
                            <Box py={1} borderBottom='1px solid'>
                                <Typography fontWeight={600} fontSize={{ xs: '15px', md: '18px'}}>Bộ lọc tìm kiếm theo chủ đề</Typography>
                            </Box>
                            {DATA_TYPE_EVENT.map((data, index) => {
                                return(
                                    <Box key={index} display='flex' flexDirection='column' py={{ xs: 1.5, md: 2}}>
                                        <Box onClick={() => data.id && toggleOpen(data.id)} display="flex" justifyContent="space-between" alignItems="center" sx={{ borderBottom: '1px solid grey', cursor: 'pointer'}}>
                                            <Stack direction='row'>
                                                <Typography fontSize={{ xs: '15px', md: '18px'}} variant="subtitle1" fontWeight={700}>
                                                    {data.label}
                                                </Typography>
                                                {countSelectedInGroup(data.id) > 0 && (
                                                    <Box mt={3}>
                                                        <Chip
                                                            label={countSelectedInGroup(data.id)}
                                                            size="small"
                                                            sx={{ bgcolor: '#000', color: '#fff', height: 20, fontSize: 12 }}
                                                        />
                                                    </Box>
                                                )}
                                            </Stack>
                                            <IconButton
                                                handleFunt={() => {}}
                                                icon={openId === data.id ? <ExpandLess/> : <ExpandMore/>}
                                                sx={{
                                                    "&:hover": {
                                                        bgcolor: '#F5F5F5'
                                                    }
                                                }}
                                            />
                                        </Box>
                                        {openId === data.id && (
                                            <Box mt={1}>
                                                {data.children.map((item, index) => {
                                                    return(
                                                        <List dense key={index}>
                                                            <ListItemButton
                                                                disabled={item.count === 0}
                                                                onClick={() => handleChecked({ id: item.id, id_type: item.id_type})}
                                                            >
                                                                <ListItemIcon>
                                                                    <Checkbox
                                                                        checked={checkedItem.some(
                                                                            (s) => s.id === item.id && s.id_type === item.id_type
                                                                        )}
                                                                        edge='start'
                                                                        sx={{
                                                                            bgcolor: item.count === 0 ? 'grey' : 'none'
                                                                        }}
                                                                    />
                                                                </ListItemIcon>
                                                                <ListItemText primary={`${item.label} (${item.count})`}/>
                                                            </ListItemButton>
                                                        </List>
                                                    )
                                                })}
                                            </Box>
                                        )}
                                    </Box>
                                )
                            })}
                        </Grid>
                    </Grid>
                {/* End thông tin sự kiện */}
            </Box>
        </Box> 
    )
}

export default ContentEventAndPerformance;