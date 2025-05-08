import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required('User name is required')
    .min(3, 'User name must be at least 3 characters'),
  
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  
  role: Yup.string()
    .required('Role is required'),
  
  mobile: Yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]+$/, 'Mobile number must contain only digits')
    .min(10, 'Mobile number must be at least 10 digits'),
  
  dob: Yup.date()
    .required('Date of birth is required')
    .max(new Date(), 'Date cannot be in the future'),
  
  sportID: Yup.string()
    .required('Please select a sport'),
  
  machineId: Yup.string()
    .required('Machine ID is required'),
  
  yearsOfExp: Yup.number()
    .required('Experience is required')
    .min(0, 'Experience cannot be negative')
    .typeError('Experience must be a number'),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  
  password: Yup.string()
    .required('Password is required'),
});