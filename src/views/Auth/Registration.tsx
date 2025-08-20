import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { AccountBalance, AccountCircle, Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import ControllerTextField from '@/components/ControllerField/ControllerTextField';
import Page from '@/components/Page';

import { ROUTE_PATH } from '@/constants/routes';
import useBoolean from '@/hooks/useBoolean';
import useNotification from '@/hooks/useNotification';
import { registrationSchema } from '@/schemas/auth-schema';
import { signUp } from '@/services/auth-service';
import Grid from "@mui/material/Grid2"
import ImageLogoCommon from './components/ImageLogoCommon';
import logo_museum from "@/assets/images/users/logo.jpg";
import CommonImage from '@/components/Image/index';

interface RegistrationFormInputs {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Registration() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setFocus,
    trigger,
  } = useForm<RegistrationFormInputs>({
    resolver: yupResolver(registrationSchema),
  });
  const password = watch('password');
  const [_loading, setLoading] = useBoolean();
  const navigate = useNavigate();
  const notify = useNotification();
  const { t } = useTranslation('auth');
  const [_error, setError] = useState('');
  const [showPassword, setShowPassword] = useBoolean(false);
  const [showConfirmPassword, setShowConfirmPassword] = useBoolean(false);

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  useEffect(() => {
    if (password && password?.length === getValues('confirmPassword')?.length) {
      trigger('confirmPassword');
    }
  }, [password, trigger]);

  const onSubmit = async (values: RegistrationFormInputs) => {
    setLoading.on();
    try {
      const { confirmPassword, ...payload} = values;
      await signUp(payload);
      notify({
        message: t('registration_success'),
        severity: 'success',
      });
      navigate(ROUTE_PATH.TO_LOGIN);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading.off();
    }
  };

  return (
    <Page title='Museum'>
      <Grid container sx={{ height: '100vh'}}>
        <Grid size={{ xs: 12, md: 6}} sx={{ height: '100%'}}>
          {/* Logo */}
          <Box p={{ xs: 3, lg: 5}} mb={2} sx={{ display: 'flex', flexDirection: 'row'}}>
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
                Đăng ký tài khoản
              </Typography>
              <Typography sx={{ mb: 5 }}>
                Bạn chưa có tài khoản vui lòng lập một tài khoản mới theo thông tin dưới đây
              </Typography>
            </Box>
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
              px: { xs: 0, lg: 23}
            }}
          >
            <Stack>
              <Typography fontWeight={500}>ID người dùng</Typography>
              <ControllerTextField<RegistrationFormInputs>
                controllerProps={{
                  name: 'full_name',
                  defaultValue: '',
                  control: control,
                }}
                textFieldProps={{
                  label: '',
                  error: !!errors.full_name,
                  helperText: errors.full_name?.message,
                }}
                prefixIcon={AccountCircle}
              />
            </Stack>
            <Stack>
              <Typography fontWeight={500}>Email</Typography>
              <ControllerTextField<RegistrationFormInputs>
                controllerProps={{
                  name: 'email',
                  defaultValue: '',
                  control: control,
                }}
                textFieldProps={{
                  label: '',
                  error: !!errors.email,
                  helperText: errors.email?.message,
                }}
                prefixIcon={Email}
              />
            </Stack>
            <Stack>
              <Typography fontWeight={500}>Mật khẩu</Typography>
              <ControllerTextField<RegistrationFormInputs>
                controllerProps={{
                  name: 'password',
                  defaultValue: '',
                  control: control,
                }}
                textFieldProps={{
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
                            onClick={() =>  setShowPassword.toggle()}
                            edge='end'
                          >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  }
                }}
                prefixIcon={Lock}
              />
            </Stack>
            <Stack>
              <Typography fontWeight={500}>Xác nhận mật khẩu</Typography>
              <ControllerTextField<RegistrationFormInputs>
                controllerProps={{
                  name: 'confirmPassword',
                  defaultValue: '',
                  control: control,
                }}
                textFieldProps={{
                  label: '',
                  type: showConfirmPassword ? 'text' : 'password',
                  error: !!errors.confirmPassword,
                  helperText: errors.confirmPassword?.message,
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle confirm password visibility'
                            onClick={() => setShowConfirmPassword.toggle()}
                            edge='end'
                          >
                            {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  }
                }}
                prefixIcon={Lock}
              />
            </Stack>
            <LoadingButton
              loading={_loading}
              type='submit'
              variant='contained'
              fullWidth
              sx={{ mt: 2, bgcolor: '#D30000' }}
            >
              Đăng ký
            </LoadingButton>
            <Button
              onClick={() => navigate(`/${ROUTE_PATH.AUTH}/${ROUTE_PATH.LOGIN}`)}
              variant='outlined'
              fullWidth
              sx={{ mt: 2, border: '1px solid #000', color: '#000' }}
            >
              Quay lại đăng nhập
            </Button>
          </Box>
        </Grid>
        <Grid sx={{ bgcolor: 'white', position: 'relative', height: '100%'}} size={{ xs: 12, md: 6}}>
          <ImageLogoCommon/>
        </Grid>
      </Grid>
    </Page>
  );
}
