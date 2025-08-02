import IconButton from "@/components/IconButton/IconButton";
import { ExpandLess, ExpandMore, Home, Signpost } from "@mui/icons-material";
import { Box, Button, Checkbox, Chip, List, ListItemButton, ListItemIcon, ListItemText, Paper, Popper, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import image_experience from "@/assets/images/users/image_experience.png";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputSearch from "@/components/SearchBar";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import { DATA_INFO_EXPERIENCE, DATA_TYPE } from "@/constants/data";
import CommonImage from "@/components/Image/index";
import CommonNavbar from "../Components/CommonNavbar";

const FreeExperience = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [openId, setOpenId] = useState<number | null>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [checkedItem, setCheckedItem] = useState<{id: number; id_type: number}[]>([]);


    const toggleOpen = (id: number) => {
        setOpenId((prevId) => (prevId === id ? null : id))
    };
    const handleSearch = ( newItem: string) =>{
        setSearchTerm(newItem.trim())
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper-btn' : undefined;

    const handleChecked = (item: { id: number; id_type: number}) => {
        const exists = checkedItem.some((s) => s.id === item.id && s.id_type === item.id_type);
        if (exists) {
            setCheckedItem((prev) => prev.filter((s) => !(s.id === item.id && s.id_type === item.id_type)));
        } else {
            setCheckedItem((prev) => [...prev, item]);
        }
    }

    const countSelectedInGroup = (idType: number) =>
        checkedItem.filter((item) => item.id_type === idType).length;
    return(
        <Box>
            <CommonNavbar
                title="/ Trải nghiệm miễn phí"
            />
            <Box
                sx={{
                    height: { xs: 300, md: 480},
                    width: '100%',
                    backgroundImage: `url(${image_experience})`,
                    backgroundSize: 'fill',
                    backgroundPosition: 'center'
                }}
            />
            <Box px={{ xs: 3, md: 6}} mb={{ xs: 2, md: 6}}>
                {/* Những tour trải nghiệm miễn phí */}
                <Box mb={1} mt={{ xs: 4, md: 5}}>
                    <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.8rem'}, borderBottom: '1px solid grey'}} fontWeight={600}>
                        Những tour trải nghiệm miễn phí
                    </Typography>
                    <Stack py={2} direction={{ xs: 'column', sm: 'row'}}>
                        <Typography fontSize={{ xs: '14px', md: '18px'}}>Lịch trải nghiệm: </Typography>
                        <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>
                            Tháng 6
                        </Typography>
                        <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>
                            Tháng 7
                        </Typography>
                        <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>
                            Tháng 8
                        </Typography>
                        <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>
                            Tháng 9
                        </Typography>
                        <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>
                            Tháng 10
                        </Typography>
                        <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>
                            Tháng 11
                        </Typography>
                        <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>
                            Tháng 12
                        </Typography>
                    </Stack>
                </Box>
                <Paper sx={{ bgcolor: '#FFFFFF', p: { xs: 3, md: 4}, display: 'flex', flexDirection: 'column', borderRadius: '10px', boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.03), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)'}}>
                    <Stack direction='row' mb={2}>
                        <CalendarMonthIcon sx={{ fontSize: { xs: '20px', md: '30px'}}}/>
                        <Typography px={{ xs: 1, md: 2}} fontSize={{ xs: '14px', md: '20px'}} fontWeight={600}>
                            Trải ngiệm tour theo lịch
                        </Typography>
                    </Stack>
                    <Typography fontWeight={500} fontSize={{ xs: '13px', md: '17px'}}>
                        Bạn muốn tham gia tour miễn phí hãy tìm kiếm tên sự kiện (nếu biết) hoặc bạn có thể lọc xem theo
                        từng ngày để biết dễ quan sát hơn bạn nhé.
                    </Typography>
                </Paper>
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
                                startIcon={<CalendarMonthIcon/>}
                                onClick={handleClick}
                                aria-describedby={id}
                            >
                                Bạn muốn đi ngày nào?
                            </Button>
                            <Popper
                                open={open}
                                id={id}
                                anchorEl={anchorEl}
                                placement="bottom-end"
                            >
                                <Box>
                                    fdsfdsf
                                </Box>
                            </Popper>
                        </Box>
                    </Grid>
                </Grid>

                {/* End những tour trải nghiệm miễn phí */}

                {/* Thông tin tour trải nghiệm */}
                <Box mt={{ xs: 3, md: 5}}>
                    <Typography sx={{ fontSize: { xs: '1rem', sm: '1.5rem'}}} fontWeight={600}>
                        Thông tin tour trải nghiệm
                    </Typography>
                </Box>                
                <Grid container spacing={{ xs: 3, md: 10}}>
                    <Grid size={{ xs: 12, lg: 8}}>
                        {DATA_INFO_EXPERIENCE.map((data, index) => {
                            return(
                                <Paper key={index}
                                    sx={{
                                        boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.03), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
                                        my: 2,
                                        display: 'flex',
                                        flexDirection: { xs: 'column', md: 'row'},
                                        cursor: 'pointer'
                                    }}
                                >
                                    <CommonImage
                                        src={data.image_url}
                                        alt={data.label}
                                        sx={{ width: { xs: '100%', md: 500}, height: 200, pt: 2, px: 2}}
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
                        {DATA_TYPE.map((data, index) => {
                            return(
                                <Box key={index} display='flex' flexDirection='column' py={{ xs: 1.5, md: 2}}>
                                    <Box onClick={() => data.id && toggleOpen(data.id)} display="flex" justifyContent="space-between" alignItems="center" sx={{ borderBottom: '1px solid grey', cursor: 'pointer'}}>
                                        <Stack direction='row'>
                                            <Typography fontSize={{ xs: '15px', md: '18px'}} variant="subtitle1" fontWeight={700}>
                                                {data.label}
                                            </Typography>
                                            {countSelectedInGroup(data.id) > 0  && (
                                                <Box mt={3}>
                                                    <Chip
                                                        label={countSelectedInGroup(data.id)}
                                                        size="small"
                                                        sx={{ bgcolor: '#000', color: '#fff', height: 20, fontSize: 12}}
                                                    />
                                                </Box>
                                            )}                                         
                                        </Stack>

                                        <IconButton
                                            handleFunt={() => data.id && toggleOpen(data.id)}
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
                                                {data.children.map((item, idx) => {
                                                    return(
                                                        <List dense key={idx}>
                                                            <ListItemButton onClick={() => handleChecked({ id: item.id, id_type: item.id_type })} disabled={item.count === 0}>
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
                {/* End thông tin tour trải nghiệm */}
            </Box>
        </Box>
    )
}

export default FreeExperience;