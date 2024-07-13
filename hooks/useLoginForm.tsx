// 'use client';
// import { useState } from 'react';
// import { useFormik } from 'formik';
// import axios from 'axios';
// import LoginValidation from '@/validations/LoginValidation';
// import { LoginValues } from '@/types/LoginValue';

// const initialValues: LoginValues = {
//     email: '',
//     password: '',
// };

// const useLoginForm = () => {
//     const [show, setShow] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');

//     const showpass = () => {
//         setShow((prevState) => !prevState);
//     };

//     const postData = async (email: string, password: string) => {
//         try {
//             const response = await axios.post('http://localhost:8080/login', { email, password });
//             const { access_token, role } = response.data;
//             document.cookie = `access_token=${access_token}; path=/;`;

//             // Redirect based on role
//             if (role === 'ROLE_USER') {
//                 window.location.href = 'http://localhost:3000';
//             } else if (role === 'ROLE_ORGANIZER') {
//                 window.location.href = 'http://localhost/event';
//             }

//             return true;
//         } catch (error) {
//             console.error('login error:', error);
//             setErrorMessage('Invalid email or password');
//             return false;
//         }
//     };

//     const formik = useFormik({
//         initialValues,
//         validationSchema: LoginValidation,
//         onSubmit: async (values) => {
//             await postData(values.email, values.password);
//         },
//     });


//     return {
//         ...formik,
//         show,
//         showpass,
//         errorMessage,
//     };
// };

// export default useLoginForm;
'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import LoginValidation from '@/validations/LoginValidation';
import { signIn } from 'next-auth/react'; // Updated import

interface LoginValues {
    email: string;
    password: string;

}

const initialValues: LoginValues = {
    email: '',
    password: '',
};



const useLoginForm = () => {
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const showpass = () => {
        setShow((prevState) => !prevState);
    };

    const postData = async (email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:8080/login', { email, password });
            const { access_token, role } = response.data;
            document.cookie = `access_token=${access_token}; path=/;`;

            // Redirect based on role
            if (role === 'ROLE_USER') {
                window.location.href = 'http://localhost:3000';
            } else if (role === 'ROLE_ORGANIZER') {
                window.location.href = 'http://localhost/event';
            }
            return true;
        } catch (error) {
            console.error('login error:', error);
            setErrorMessage('Invalid email or password');
            return false;
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: LoginValidation,
        onSubmit: async (values) => {
            await handleSubmit(values);
        },
    });

    const handleSubmit = async (values: LoginValues) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
            });

            if (result?.error) {
                setErrorMessage('Invalid email or password');
            } else if (result?.ok) {
                // Handle successful login
                // You may want to use next-auth's useSession hook or getSession for role-based redirects
                console.log('Login successful');
            }
        } catch (error) {
            console.error('Sign in error:', error);
            setErrorMessage('An error occurred during login');
        }
    };

    return {
        ...formik,
        show,
        showpass,
        errorMessage,
        handleSubmit,
    };
};

export default useLoginForm;