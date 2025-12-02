import { COLORS } from "@/constants/colors";
import { useI18n } from "@/contexts/i18nContext";
import i18n from "@/i18n";
import { Translate } from "@mui/icons-material";
import {
  Box,
  ButtonBase,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
interface LanguageSelectProps{
    from?: string
}

const LanguageSelect = (props: LanguageSelectProps) => {
    const { from } = props;
    const { t } = useTranslation('header');
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [valueSelected, setValueSelected] = useState<{ type: string, value: string}>({
        type: '',
        value: ''
    });
    const { locale, setLocale } = useI18n();

    const handleClick = (event: any) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "lang-popper" : undefined;

    return (
        <Box>
            <ButtonBase
                sx={{
                borderRadius: 1,
                px: from ? 0 : 1.5,
                py: 0.7,
                mt: from ? 0 : 5.2,
                '&:hover': { bgcolor: 'secondary.lighter' },
                }}
                aria-label="Đổi ngôn ngữ"
                aria-controls={id}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Stack direction='row' alignItems={from ? 'start' : 'center'} sx={{ px: from ? 0 : 0.5 }}>
                    <Translate fontSize="small" />
                    <Typography fontWeight={500} sx={{ color: from ? '#000' : 'white', '&:hover': { fontWeight: 500}, fontSize: '16px', whiteSpace: 'nowrap' }}>{valueSelected.value ? valueSelected.value : t('menu_change_lang')}</Typography>
                </Stack>
            </ButtonBase>

            <Popper
                open={open}
                anchorEl={anchorEl}
                sx={{
                    zIndex: theme.zIndex.modal,
                    minWidth: 200,
                    marginTop: from ? 0 : "21px !important",
                    
                }}
            >
                <Paper sx={{ bgcolor: from ? '#fff' : COLORS.BUTTON, borderRadius: 0, boxShadow: from ? "0px 4px 12px rgba(0,0,0,0.15)" : '0' }} elevation={6}>
                    <ClickAwayListener onClickAway={handleClose}>
                        <Box sx={{ p: 0 }}>
                            <List disablePadding>
                                <ListItemButton
                                    data-value="🇻🇳 Tiếng Việt"
                                    onClick={(e) => {
                                        const value = e.currentTarget.dataset.value;
                                        value && setValueSelected({ type: 'vi', value: value })
                                        i18n.changeLanguage("vi");
                                        setLocale("vi")
                                        handleClose();
                                    }}
                                >
                                    {valueSelected.type === 'vi' ? (
                                        <ListItemText sx={{ color: from ? '#000' : '#fff' }} primary={valueSelected.value} />

                                    ) : (
                                        <ListItemText sx={{ color: from ? '#000' : '#fff' }} primary={'🇻🇳 Tiếng Việt'} />
                                    )}
                                </ListItemButton>

                                {from ? <hr/> : <Divider sx={{ border: 'solid 1.5px rgba(122, 119, 119, 0.5)'}}/>}

                                <ListItemButton
                                    data-value="🇺🇸 English"
                                    onClick={(e) => {
                                        const value = e.currentTarget.dataset.value;
                                        value && setValueSelected({ type: 'en', value: value })
                                        i18n.changeLanguage("en");
                                        setLocale("en")
                                        handleClose();
                                    }}
                                >
                                    {valueSelected.type === 'en' ? (
                                        <ListItemText sx={{ color: from ? '#000' : '#fff' }} primary={valueSelected.value} />
                                    ) : (
                                        <ListItemText sx={{ color: from ? '#000' : '#fff' }} primary={'🇺🇸 English'} />
                                    )}
                                </ListItemButton>
                            </List>
                        </Box>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </Box>
    );
};

export default LanguageSelect;
