import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Email, Lock } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import ControllerTextField from '@/components/ControllerField/ControllerTextField';
import Page from '@/components/Page';

import { ROUTE_PATH } from '@/constants/routes';
import useBoolean from '@/hooks/useBoolean';
import useNotification from '@/hooks/useNotification';
import { registrationSchema } from '@/schemas/auth-schema';
import { signUp } from '@/services/auth-service';
import Grid from "@mui/material/Grid2"
import ImageLogoCommon from './components/ImageLogoCommon';
import logo_museum from "@/assets/images/users/logo_museum.png";
import CommonImage from '@/components/Image/index';

interface RegistrationFormInputs {
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
      await signUp(values);
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
                Đăng  !
              </Typography>
              <Typography sx={{ mb: 5 }}>
                Chào mừng tới bảo tàng, vui lòng đăng nhập để tiếp tục sử dụng website
              </Typography>
            </Box>
          </Box>
          {/* <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='h4' component='h1' gutterBottom>
              Register
            </Typography>
            {_error && (
              <Alert variant='filled' severity='warning'>
                {_error}
              </Alert>
            )}
            <ControllerTextField<RegistrationFormInputs>
              controllerProps={{
                name: 'email',
                defaultValue: '',
                control: control,
              }}
              textFieldProps={{
                label: 'Email',
                error: !!errors.email,
                helperText: errors.email?.message,
              }}
              prefixIcon={Email}
            />
            <ControllerTextField<RegistrationFormInputs>
              controllerProps={{
                name: 'password',
                defaultValue: '',
                control: control,
              }}
              textFieldProps={{
                label: 'Password',
                type: 'password',
                error: !!errors.password,
                helperText: errors.password?.message,
              }}
              prefixIcon={Lock}
            />
            <ControllerTextField<RegistrationFormInputs>
              controllerProps={{
                name: 'confirmPassword',
                defaultValue: '',
                control: control,
              }}
              textFieldProps={{
                label: 'Confirm Password',
                type: 'password',
                error: !!errors.confirmPassword,
                helperText: errors.confirmPassword?.message,
              }}
              prefixIcon={Lock}
            />
            <LoadingButton
              loading={_loading}
              type='submit'
              variant='contained'
              fullWidth
              sx={{ mt: 2 }}
            >
              Register
            </LoadingButton>
            <Button
              onClick={() => navigate(`/${ROUTE_PATH.AUTH}/${ROUTE_PATH.LOGIN}`)}
              variant='outlined'
              fullWidth
              sx={{ mt: 2 }}
            >
              Back to login
            </Button>
          </Box> */}
        </Grid>
        <Grid sx={{ bgcolor: 'white', position: 'relative', height: '100%'}} size={{ xs: 12, md: 6}}>
          <ImageLogoCommon/>
        </Grid>
      </Grid>
    </Page>
  );
}
