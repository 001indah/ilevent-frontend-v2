// // 'use client';
// // import { useState } from 'react';
// // import { useFormik } from 'formik';
// // import axios from 'axios';
// // import LoginValidation from '@/validations/LoginValidation';
// // import { LoginValues } from '@/types/LoginValue';

// // const initialValues: LoginValues = {
// //     email: '',
// //     password: '',
// // };

// // const useLoginForm = () => {
// //     const [show, setShow] = useState(false);
// //     const [errorMessage, setErrorMessage] = useState('');

// //     const showpass = () => {
// //         setShow((prevState) => !prevState);
// //     };

// //     const postData = async (email: string, password: string) => {
// //         try {
// //             const response = await axios.post('http://localhost:8080/login', { email, password });
// //             const { access_token, role } = response.data;
// //             document.cookie = `access_token=${access_token}; path=/;`;

// //             // Redirect based on role
// //             if (role === 'ROLE_USER') {
// //                 window.location.href = 'http://localhost:3000';
// //             } else if (role === 'ROLE_ORGANIZER') {
// //                 window.location.href = 'http://localhost/event';
// //             }

// //             return true;
// //         } catch (error) {
// //             console.error('login error:', error);
// //             setErrorMessage('Invalid email or password');
// //             return false;
// //         }
// //     };

// //     const formik = useFormik({
// //         initialValues,
// //         validationSchema: LoginValidation,
// //         onSubmit: async (values) => {
// //             await postData(values.email, values.password);
// //         },
// //     });


// //     return {
// //         ...formik,
// //         show,
// //         showpass,
// //         errorMessage,
// //     };
// // };

// // export default useLoginForm;
// // 'use client';
// // import { useState } from 'react';
// // import { useFormik } from 'formik';
// // import axios from 'axios';
// // import LoginValidation from '@/validations/LoginValidation';
// // import { signIn } from "next-auth/react";

// // interface LoginValues {
// //     email: string;
// //     password: string;

// // }

// // const initialValues: LoginValues = {
// //     email: '',
// //     password: '',
// // };



// // const useLoginForm = () => {
// //     const [show, setShow] = useState(false);
// //     const [errorMessage, setErrorMessage] = useState('');

// //     const showpass = () => {
// //         setShow((prevState) => !prevState);
// //     };

// //     const postData = async (email: string, password: string) => {
// //         try {
// //             const response = await axios.post('http://localhost:8080/login', { email, password });
// //             const { access_token, role } = response.data;
// //             document.cookie = `access_token=${access_token}; path=/;`;

// //             // Redirect based on role
// //             if (role === 'ROLE_USER') {
// //                 window.location.href = 'http://localhost:3000';
// //             } else if (role === 'ROLE_ORGANIZER') {
// //                 window.location.href = 'http://localhost/event';
// //             }
// //             return true;
// //         } catch (error) {
// //             console.error('login error:', error);
// //             setErrorMessage('Invalid email or password');
// //             return false;
// //         }
// //     };

// //     const formik = useFormik({
// //         initialValues,
// //         validationSchema: LoginValidation,
// //         onSubmit: async (values) => {
// //             await handleSubmit(values);
// //         },
// //     });

// //     const handleSubmit = async (values: LoginValues) => {
// //         try {
// //             const result = await signIn('credentials', {
// //                 username: values.email,
// //                 password: values.password,
// //                 redirect: true,
// //                 callbackUrl: "/",
// //             });

// //             if (result?.error) {
// //                 setErrorMessage('Invalid email or password');
// //             } else if (result?.ok) {
// //                 // Handle successful login
// //                 // You may want to use next-auth's useSession hook or getSession for role-based redirects
// //                 console.log('Login successful');
// //             }
// //         } catch (error) {
// //             console.error('Sign in error:', error);
// //             setErrorMessage('An error occurred during login');
// //         }
// //     };

// //     return {
// //         ...formik,
// //         show,
// //         showpass,
// //         errorMessage,
// //         handleSubmit,
// //     };
// // };

// // export default useLoginForm;
// // 'use client';

// // import { useState } from 'react';
// // import { useFormik } from 'formik';
// // import LoginValidation from '@/validations/LoginValidation';
// // import { signIn } from "next-auth/react";
// // import { useRouter } from 'next/navigation';
// // import { useAuth } from "@/context/AuthContext";

// // interface LoginValues {
// //     email: string;
// //     password: string;
// // }

// // const initialValues: LoginValues = {
// //     email: '',
// //     password: '',
// // };

// // const useLoginForm = () => {
// //     const [show, setShow] = useState(false);
// //     const [errorMessage, setErrorMessage] = useState('');
// //     const router = useRouter();

// //     const showpass = () => {
// //         setShow((prevState) => !prevState);
// //     };

// //     const formik = useFormik({
// //         initialValues,
// //         validationSchema: LoginValidation,
// //         onSubmit: async (values) => {
// //             await handleSubmit(values);
// //         },
// //     });

// //     const handleSubmit = async (values: LoginValues) => {
// //         try {
// //             const result = await signIn('credentials', {
// //                 username: values.email,
// //                 password: values.password,
// //                 redirect: false,
// //             });

// //             if (result?.error) {
// //                 setErrorMessage('Invalid email or password');
// //             } else if (result?.ok) {
// //                 console.log('Login successful');
// //                 const session = await fetch('/api/auth/session');
// //                 const sessionData = await session.json();
// //                 if (sessionData.user.role === 'organizer') {
// //                     router.push('/organizer');
// //                 } else {
// //                     router.push('/');
// //                 }
// //             }
// //         } catch (error) {
// //             console.error('Sign in error:', error);
// //             setErrorMessage('An error occurred during login');
// //         }
// //     };

// //     return {
// //         ...formik,
// //         show,
// //         showpass,
// //         errorMessage,
// //         handleSubmit,
// //     };
// // };

// // export default useLoginForm;
// // 'use client';

// // import { useState } from 'react';
// // import { useFormik } from 'formik';
// // import LoginValidation from '@/validations/LoginValidation';
// // import { useRouter } from 'next/navigation';
// // import { useAuth } from '@/context/AuthContext';

// // interface LoginValues {
// //     email: string;
// //     password: string;
// // }

// // const initialValues: LoginValues = {
// //     email: '',
// //     password: '',
// // };

// // const useLoginForm = () => {
// //     const [show, setShow] = useState(false);
// //     const [errorMessage, setErrorMessage] = useState('');
// //     const { login } = useAuth();
// //     const router = useRouter();

// //     const showpass = () => {
// //         setShow((prevState) => !prevState);
// //     };

// //     const formik = useFormik({
// //         initialValues,
// //         validationSchema: LoginValidation,
// //         onSubmit: async (values) => {
// //             await handleSubmit(values);
// //         },
// //     });

// //     const handleSubmit = async (values: LoginValues) => {
// //         try {
// //             const token = await login(values.email, values.password);
// //             document.cookie = `sid=${token}; Path=/; HttpOnly; Secure; SameSite=None`;

// //             router.push('/');
// //         } catch (error) {
// //             console.error('Login error:', error);
// //             setErrorMessage('An error occurred during login');
// //         } finally {
// //             formik.setSubmitting(false);
// //         }
// //     };

// //     return {
// //         ...formik,
// //         show,
// //         showpass,
// //         errorMessage,
// //         handleSubmit,
// //     };
// // };

// // export default useLoginForm;


// // 'use client';

// // import { useState } from 'react';
// // import { useFormik } from 'formik';
// // import LoginValidation from '@/validations/LoginValidation';
// // import { useRouter } from 'next/navigation';
// // import { useAuth } from '@/context/AuthContext';

// // interface LoginValues {
// //     email: string;
// //     password: string;
// // }

// // const initialValues: LoginValues = {
// //     email: '',
// //     password: '',
// // };

// // const useLoginForm = () => {
// //     const [show, setShow] = useState(false);
// //     const [errorMessage, setErrorMessage] = useState('');
// //     const { login } = useAuth();
// //     const router = useRouter();

// //     const showpass = () => {
// //         setShow((prevState) => !prevState);
// //     };

// //     const formik = useFormik({
// //         initialValues,
// //         validationSchema: LoginValidation,
// //         onSubmit: async (values) => {
// //             await handleSubmit(values);
// //         },
// //     });

// //     const handleSubmit = async (values: LoginValues) => {
// //         try {
// //             await login(values.email, values.password);
// //             // localStorage.setItem('JWT_TOKEN', token);

// //             // router.push('/');
// //         } catch (error) {
// //             console.error('Login error:', error);
// //             setErrorMessage('An error occurred during login');
// //         } finally {
// //             formik.setSubmitting(false);
// //         }
// //     };

// //     return {
// //         ...formik,
// //         show,
// //         showpass,
// //         errorMessage,
// //         handleSubmit,
// //     };
// // };

// // export default useLoginForm;

// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useFormik } from 'formik';
// import { useRouter } from 'next/navigation';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import LoginValidation from '@/validations/LoginValidation';
// import { useAuth } from '@/context/AuthContext';

// interface LoginValues {
//     email: string;
//     password: string;
// }

// const initialValues: LoginValues = {
//     email: '',
//     password: '',
// };

// const Login: React.FC = () => {
//     const [show, setShow] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const { login } = useAuth();
//     const router = useRouter();

//     const showpass = () => {
//         setShow((prevState) => !prevState);
//     };

//     const formik = useFormik({
//         initialValues,
//         validationSchema: LoginValidation,
//         onSubmit: async (values) => {
//             try {
//                 await login(values.email, values.password);
//                 // Uncomment the following lines when ready to use them
//                 // localStorage.setItem('JWT_TOKEN', token);
//                 // router.push('/');
//             } catch (error) {
//                 console.error('Login error:', error);
//                 setErrorMessage('An error occurred during login');
//             } finally {
//                 formik.setSubmitting(false);
//             }
//         },
//     });

//     return (
//         <div className="flex justify-center items-center min-h-screen">
//             <Card className="mx-auto max-w-sm">
//                 <CardHeader className="space-y-1">
//                     <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
//                     <CardDescription>Enter your email and password to login to your account</CardDescription>
//                 </CardHeader>
//                 {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
//                 <CardContent>
//                     <form onSubmit={formik.handleSubmit}>
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="email">Email</Label>
//                                 <Input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     placeholder="m@example.com"
//                                     {...formik.getFieldProps('email')}
//                                 />
//                                 {formik.touched.email && formik.errors.email && (
//                                     <small className="text-red-500">{formik.errors.email}</small>
//                                 )}
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="password">Password</Label>
//                                 <Input
//                                     id="password"
//                                     name="password"
//                                     type={show ? 'text' : 'password'}
//                                     placeholder="•••••••••"
//                                     {...formik.getFieldProps('password')}
//                                 />
//                                 <div className="flex justify-between">
//                                     {formik.touched.password && formik.errors.password && (
//                                         <small className="text-red-500">{formik.errors.password}</small>
//                                     )}
//                                     <button type="button" onClick={showpass} className="text-black ml-2 text-sm">
//                                         {show ? 'Hide' : 'Show'} Password
//                                     </button>
//                                 </div>
//                             </div>
//                             <p className="text-sm">
//                                 {`Don't have an account yet? `}
//                                 <Link href="/sign-up" className="text-blue-500">
//                                     Sign up
//                                 </Link>
//                             </p>
//                             <Button type="submit" className="w-full">
//                                 Login
//                             </Button>
//                         </div>
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default Login;