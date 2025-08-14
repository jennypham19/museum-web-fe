import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import ControllerTextField from '@/components/ControllerField/ControllerTextField';
import Page from '@/components/Page';

import { ROUTE_PATH } from '@/constants/routes';
import useBoolean from '@/hooks/useBoolean';
import useNotification from '@/hooks/useNotification';
import { loginSchema } from '@/schemas/auth-schema';
import { signIn } from '@/services/auth-service';
import { setIsAuth } from '@/slices/auth';
import { setProfile } from '@/slices/user';
import { useAppDispatch } from '@/store';
import { setAccessToken } from '@/utils/AuthHelper';
import Grid from "@mui/material/Grid2";
import logo_museum from "@/assets/images/users/logo_museum.png";
import CommonImage from '@/components/Image/index';
import { FcGoogle } from "react-icons/fc";
import ImageLogoCommon from './components/ImageLogoCommon';

export const ID_USER = 'user_id'
interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });
  const { t } = useTranslation('auth');
  const [_loading, setLoading] = useBoolean();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notify = useNotification();
  const [_error, setError] = useState('');
  const [showPassword, setShowPassword] = useBoolean(false);
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);


  const onSubmit = async (values: LoginFormInputs) => {
    setLoading.on();
    try {
      const respAuth = await signIn({
        email: values.email,
        password: values.password,
      });
      const accessToken = respAuth.data?.accessToken;
      const userProfile = respAuth.data?.user;
      if (accessToken && userProfile) {
        setAccessToken(accessToken);

        // Xét trường is_change_type
        if(userProfile.is_change_type === 1){
          localStorage.setItem(ID_USER, String(userProfile.id));
          navigate(`/${ROUTE_PATH.AUTH}/${ROUTE_PATH.CHANGE_PASSWORD}`)
        }else{
          // 3. Cập nhật state của Redux/Context
          // Thông tin user đã có sẵn từ response login, không cần gọi /me nữa
          dispatch(setProfile(userProfile));
          dispatch(setIsAuth(true));
        }

        // 4. Thông báo và chuyển hướng
        notify({
          message: t('login_success'),
          severity: 'success',
        });

        navigate(ROUTE_PATH.MANAGE, { replace: true });     
      } else {
        setError(respAuth.message || 'Login failed, no access token returned.');
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading.off();
    }
  };

  return (
    <Page title='Museum'>
      <Grid container sx={{ height: '100vh' }}>
        <Grid size={{ xs: 12, md: 6}} sx={{ height: '100%'}}>
          {/* Logo */}
          <Box p={{ xs: 3, lg: 10}} mb={2} sx={{ display: 'flex', flexDirection: 'row'}}>
            <CommonImage src={logo_museum} alt="Museum Tiffany" style={{ height: 60, width: 60 }} />
            <Stack sx={{ height: 60, ml: 2}}>
              <Typography margin="auto 0" fontWeight={700}>MUSEUM TIFFANY</Typography>
            </Stack>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: 4, flexDirection: 'column', margin: 'auto 0'}}>
            <Box>
              <Typography
                component='h1'
                variant='h4'
                fontWeight={500}
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', mb: 3 }}
              >
                Chào mừng bạn !
              </Typography>
              <Typography sx={{ mb: 5 }}>
                Chào mừng tới bảo tàng, vui lòng đăng nhập để tiếp tục sử dụng website
              </Typography>
            </Box>
            {_error && (
              <Alert variant='filled' severity='warning'>
                {_error}
              </Alert>
            )}
            <Box
              component='form'
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
                px: {xs: 0, lg: 23}
              }}
            >
              <Stack mb={2}>
                <Typography fontWeight={500}>Email</Typography>
                <ControllerTextField<LoginFormInputs>
                  controllerProps={{
                    name: 'email',
                    defaultValue: '',
                    control: control,
                  }}
                  textFieldProps={{
                    placeholder: 'Email',
                    label: '',
                    error: !!errors.email,
                    helperText: errors.email?.message,
                    sx: { ariaLabel: 'email' },
                  }}
                  prefixIcon={Email}
                />                
              </Stack>

              <Stack>
                <Typography fontWeight={500}>Mật khẩu</Typography>
                <ControllerTextField<LoginFormInputs>
                  controllerProps={{
                    name: 'password',
                    defaultValue: '',
                    control: control,
                  }}
                  textFieldProps={{
                    placeholder: 'Mật khẩu',
                    label: '',
                    type: showPassword ? 'text' : 'password',
                    error: !!errors.password,
                    helperText: errors.password?.message,
                    slotProps: {
                      input: {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={() => setShowPassword.toggle()}
                              edge='end'
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                  prefixIcon={Lock}
                />
              </Stack>
              <div>
                <Box>
                  <Typography
                    color='primary'
                    component={RouterLink}
                    to={`/${ROUTE_PATH.AUTH}/${ROUTE_PATH.FORGOT_PASSWORD}`}
                    sx={{ textAlign: 'end', display: 'block', color: '#D30000' }}
                  >
                    Quên mật khẩu
                  </Typography>
                </Box>
              </div>
              <LoadingButton sx={{ bgcolor: '#D30000'}} loading={_loading} type='submit' variant='contained' fullWidth>
                Đăng nhập
              </LoadingButton>
              <Button
                fullWidth
                variant='contained'
                sx={{ bgcolor: '#FFFFFF', color: '#000'}}
                startIcon={<FcGoogle/>}
              >
                Đăng nhập với google
              </Button>
              <Box mt={5} display='flex' justifyContent='center' alignItems='center' flexWrap='wrap' gap={2}>
                <Typography>Bạn chưa có tài khoản?</Typography>
                <Typography
                  to={`/${ROUTE_PATH.AUTH}/${ROUTE_PATH.REGISTRATION}`}
                  component={RouterLink}
                  sx={{ color: '#D30000'}}
                >
                  Đăng ký tại đây
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid sx={{ bgcolor: 'white', position: 'relative', height: '100%'}} size={{ xs: 12, md: 6}}>
          <ImageLogoCommon/>
        </Grid>
      </Grid>
    </Page>
  );
}
