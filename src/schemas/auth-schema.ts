import { object, ref, string } from 'yup';

export const fullNameValidateSchema = string().required('Id người dùng là bắt buộc');
export const usernameValidateSchema = string().required('Email là bắt buộc');

const passwordValidateSchema = string()
  .required('Mật khẩu là bắt buộc')
  // .min(8, 'Password must be at least 8 characters')
  // .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
  // .matches(/\d/, 'Password must contain at least one number');

const confirmPasswordValidateSchema = (label: string) =>
  string()
    .oneOf([ref(label)], "Mật khẩu và Xác nhận mật khẩu không trùng nhau")
    .required('Xác nhận mật khẩu là bắt buộc');

const passwordSchema = <T extends string>(label: T) =>
  object().shape({
    password: passwordValidateSchema,
    confirmPassword: confirmPasswordValidateSchema(label),
  });

export const loginSchema = object().shape({
  email: usernameValidateSchema,
  password: string().required('Password is required'),
});

export const registrationSchema = object()
  .shape({
    full_name: fullNameValidateSchema,
    email: usernameValidateSchema,
  })
  .concat(passwordSchema('password'));

export const resetPasswordValidationSchema = object()
  .shape({
    oldPassword: passwordValidateSchema,
  })
  .concat(passwordSchema('password'));

export const changePasswordSchema = passwordSchema('password');
