'use client';
import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import RegisterValidation from '@/validations/RegisterValidation';
import { RegisterValues } from '@/types/RegisterValues';

const initialValues: RegisterValues = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    role: '',
    phone: '',
    referralUse: '',
};

const useRegisterForm = () => {
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const showpass = () => {
        setShow((prevState) => !prevState);
    };

    const postData = async (values: RegisterValues) => {
        const transformedValues = {
            ...values,
            organizer: values.role === 'organization' ? true : false,
        };

        try {
            const { data } = await axios.post('http://localhost:8080/api/v1/users/register', transformedValues);
            setErrorMessage('');
            return data;
        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                const errorMsg = error.response.data;
                if (errorMsg === 'Username already taken') {
                    setErrorMessage('Oops! Username already taken!');
                } else if (errorMsg === 'Email already taken') {
                    setErrorMessage('Oops! Email already taken!');
                }
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: RegisterValidation,
        onSubmit: async (values) => {
            await postData(values);
        },
    });

    return {
        ...formik,
        show,
        showpass,
        errorMessage,
    };
};

export default useRegisterForm;
