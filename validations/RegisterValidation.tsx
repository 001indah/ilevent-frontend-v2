// import * as Yup from 'yup';

// const FormValidation = Yup.object({
//     fullname: Yup.string().required('Fullname is required'),
//     username: Yup.string().required('Username is required'),
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//     role: Yup.string().oneOf(['organization', 'personal'], 'Role is required').required('Role is required'),
//     phone: Yup.string().required('Phone is required'),
// });

// export default FormValidation;
import * as Yup from 'yup';

const RegisterValidation = Yup.object().shape({
    fullname: Yup.string().required('Fullname is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('Role is required'),
    phone: Yup.string().required('Phone number is required'),
    referralCode: Yup.string(),
});

export default RegisterValidation;
