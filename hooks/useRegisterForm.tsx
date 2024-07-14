// 'use client';
// import { useState } from 'react';
// import { useFormik } from 'formik';
// import axios from 'axios';
// import RegisterValidation from '@/validations/RegisterValidation';
// import { RegisterValues } from '@/types/RegisterValues';

// const initialValues: RegisterValues = {
//     fullname: '',
//     username: '',
//     email: '',
//     password: '',
//     role: '',
//     phone: '',
//     referralUse: '',
// };

// const useRegisterForm = () => {
//     const [show, setShow] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');

//     const showpass = () => {
//         setShow((prevState) => !prevState);
//     };

//     const postData = async (values: RegisterValues) => {
//         const transformedValues = {
//             ...values,
//             organizer: values.role === 'organization' ? true : false,
//         };

//         try {
//             const { data } = await axios.post('http://localhost:8080/api/v1/users/register', transformedValues);
//             setErrorMessage('');
//             return data;
//         } catch (error: any) {
//             if (error.response && error.response.status === 409) {
//                 const errorMsg = error.response.data;
//                 if (errorMsg === 'Username already taken') {
//                     setErrorMessage('Oops! Username already taken!');
//                 } else if (errorMsg === 'Email already taken') {
//                     setErrorMessage('Oops! Email already taken!');
//                 }
//             } else {
//                 setErrorMessage('An error occurred. Please try again later.');
//             }
//         }
//     };

//     const formik = useFormik({
//         initialValues,
//         validationSchema: RegisterValidation,
//         onSubmit: async (values) => {
//             await postData(values);
//         },
//     });

//     return {
//         ...formik,
//         show,
//         showpass,
//         errorMessage,
//     };
// };

// export default useRegisterForm;
// 'use client';
// import { useEffect, useState } from 'react';
// import { useFormik } from 'formik';
// import axios from 'axios';
// import { signIn } from "next-auth/react";
// import { useRouter } from 'next/navigation';
// import RegisterValidation from '@/validations/RegisterValidation';
// import { RegisterValues } from '@/types/RegisterValues';
// import { config } from '@/constants/url';
// import { useDispatch } from 'react-redux';
// import { register } from 'module';

// const initialValues: RegisterValues = {
//     fullname: '',
//     username: '',
//     email: '',
//     password: '',
//     role: '',
//     phone: '',
//     referralCode: '',
// };

// const useRegisterForm = () => {
//     const [show, setShow] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const router = useRouter();
//     const dispatch = useDispatch();
//     const jwt = localStorage.getItem('jwt');

//     useEffect(() => 
//         if (jwt) {
//         dispatch(getUser())
//     }
//     }, [jwt, auth.jwt])

//     dispatch(action: anyAction): AnyAction


//     const showpass = () => {
//         setShow((prevState) => !prevState);
//     };

//     dispatch(register(userData))

//     const postData = async (values: RegisterValues) => {
//         const transformedValues = {
//             name: values.fullname,
//             username: values.username,
//             email: values.email,
//             password: values.password,
//             phone: values.phone,
//             organizer: values.role === 'organization',
//             referralCode: values.referralCode || "null",
//         };

//         try {
//             const baseUrl = process.env.NODE_ENV === 'production' ? config.PROD_URL : config.BASE_URL;
//             const { data } = await axios.post(baseUrl + config.endpoints.createUser, transformedValues, {
//                 withCredentials: true,
//             });
//             setErrorMessage('');
//             return data;
//         } catch (error: any) {
//             if (error.response && error.response.status === 409) {
//                 const errorMsg = error.response.data;
//                 if (errorMsg === 'Username already taken') {
//                     setErrorMessage('Oops! Username already taken!');
//                 } else if (errorMsg === 'Email already taken') {
//                     setErrorMessage('Oops! Email already taken!');
//                 }
//             } else {
//                 setErrorMessage('An error occurred. Please try again later.');
//             }
//             return null;
//         }
//     };

//     const formik = useFormik({
//         initialValues,
//         validationSchema: RegisterValidation,
//         onSubmit: async (values) => {
//             const result = await postData(values);
//             if (result) {
//                 // If registration is successful, attempt to sign in
//                 const signInResult = await signIn('credentials', {
//                     username: values.email,
//                     password: values.password,
//                     redirect: false,
//                 });

//                 if (signInResult?.error) {
//                     setErrorMessage('Registration successful, but unable to log in. Please try logging in manually.');
//                 } else {
//                     // Redirect based on role
//                     if (values.role === 'organization') {
//                         router.push('/organizer');
//                     } else {
//                         router.push('/');
//                     }
//                 }
//             }
//         },
//     });

//     return {
//         ...formik,
//         show,
//         showpass,
//         errorMessage,
//     };
// };

// export default useRegisterForm;
// 'use client';
// import { useEffect, useState } from 'react';
// import { useFormik } from 'formik';
// import axios from 'axios';
// import { signIn } from "next-auth/react";
// import { useRouter } from 'next/navigation';
// import RegisterValidation from '@/validations/RegisterValidation';
// import { RegisterValues } from '@/types/RegisterValues';
// import { config } from '@/constants/url';
// import { useDispatch, useSelector } from 'react-redux';
// import { register, getUser } from '@/app/(redux)/actions/Action';
// import { RootState } from '@/app/(redux)/store/store';

// const initialValues: RegisterValues = {
//     fullname: '',
//     username: '',
//     email: '',
//     password: '',
//     role: '',
//     phone: '',
//     referralCode: '',
// };

// const useRegisterForm = () => {
//     const [show, setShow] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const router = useRouter();
//     const dispatch = useDispatch();
//     const jwt = useSelector((state: RootState) => state.auth.jwt);

//     useEffect(() => {
//         if (jwt) {
//             dispatch(getUser(jwt));
//         }
//     }, [jwt, dispatch]);

//     const showpass = () => {
//         setShow((prevState) => !prevState);
//     };

//     const postData = async (values: RegisterValues) => {
//         const transformedValues = {
//             name: values.fullname,
//             username: values.username,
//             email: values.email,
//             password: values.password,
//             phone: values.phone,
//             organizer: values.role === 'organization',
//             referralCode: values.referralCode || "null",
//         };

//         try {
//             const baseUrl = process.env.NODE_ENV === 'production' ? config.PROD_URL : config.BASE_URL;
//             const { data } = await axios.post(baseUrl + config.endpoints.createUser, transformedValues, {
//                 withCredentials: true,
//             });
//             setErrorMessage('');
//             return data;
//         } catch (error: any) {
//             if (error.response && error.response.status === 409) {
//                 const errorMsg = error.response.data;
//                 if (errorMsg === 'Username already taken') {
//                     setErrorMessage('Oops! Username already taken!');
//                 } else if (errorMsg === 'Email already taken') {
//                     setErrorMessage('Oops! Email already taken!');
//                 }
//             } else {
//                 setErrorMessage('An error occurred. Please try again later.');
//             }
//             return null;
//         }
//     };

//     const formik = useFormik({
//         initialValues,
//         validationSchema: RegisterValidation,
//         onSubmit: async (values) => {
//             const result = await postData(values);
//             if (result) {
//                 // If registration is successful, attempt to sign in
//                 const signInResult = await signIn('credentials', {
//                     username: values.email,
//                     password: values.password,
//                     redirect: false,
//                 });

//                 if (signInResult?.error) {
//                     setErrorMessage('Registration successful, but unable to log in. Please try logging in manually.');
//                 } else {
//                     // Redirect based on role
//                     if (values.role === 'organization') {
//                         router.push('/organizer');
//                     } else {
//                         router.push('/');
//                     }
//                 }
//             }
//         },
//     });

//     return {
//         ...formik,
//         show,
//         showpass,
//         errorMessage,
//     };
// };

// export default useRegisterForm;

'use client';

import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import RegisterValidation from '@/validations/RegisterValidation';
import { RegisterValues } from '@/types/RegisterValues';
import { useDispatch, useSelector } from 'react-redux';
import { register, getUser } from '@/app/(redux)/actions/Action';
import { RootState, AppDispatch } from '@/app/(redux)/store/store';

const initialValues: RegisterValues = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    role: '',
    phone: '',
    referralCode: '',
};

const useRegisterForm = () => {
    const [show, setShow] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { jwt, error, isLoading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (jwt) {
            dispatch(getUser());
        }
    }, [jwt, dispatch]);

    const showpass = () => {
        setShow((prevState) => !prevState);
    };

    const formik = useFormik({
        initialValues,
        validationSchema: RegisterValidation,
        onSubmit: async (values) => {
            const transformedValues = {
                name: values.fullname,
                username: values.username,
                email: values.email,
                password: values.password,
                phone: values.phone,
                organizer: values.role === 'organization',
                referralCode: values.referralCode || "null",
            };

            const resultAction = await dispatch(register(transformedValues));
            if (register.fulfilled.match(resultAction)) {
                // Registration successful
                if (values.role === 'organization') {
                    router.push('/organizer');
                } else {
                    router.push('/');
                }
            }
            // If registration fails, the error will be in the Redux state
        },
    });

    return {
        ...formik,
        show,
        showpass,
        errorMessage: error,
        isLoading,
    };
};

export default useRegisterForm;