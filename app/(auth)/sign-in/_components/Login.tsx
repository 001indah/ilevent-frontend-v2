// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import useLoginForm from '@/hooks/useLoginForm';


// const Login: React.FC = () => {
//     const { values, handleBlur, handleChange, handleSubmit, errors, show, showpass, errorMessage } = useLoginForm();

//     return (
//         <div className="flex justify-center items-center min-h-screen">
//             <Card className="mx-auto max-w-sm">
//                 <CardHeader className="space-y-1">
//                     <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
//                     <CardDescription>Enter your email and password to login to your account</CardDescription>
//                 </CardHeader>
//                 {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
//                 <CardContent>
//                     <form onSubmit={handleSubmit}>
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="email">Email</Label>
//                                 <Input
//                                     id="email"
//                                     type="email"
//                                     placeholder="m@example.com"
//                                     value={values.email}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 {errors.email && <small className="text-red-500">{errors.email}</small>}
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="password">Password</Label>
//                                 <Input
//                                     id="password"
//                                     type={show ? 'text' : 'password'}
//                                     placeholder="•••••••••"
//                                     value={values.password}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 <div className="flex justify-between">
//                                     {errors.password && <small className="text-red-500">{errors.password}</small>}
//                                     <button type="button" onClick={showpass} className="text-black ml-2 text-sm">
//                                         {show ? 'Hide' : 'Show'} Password
//                                     </button>
//                                 </div>
//                             </div>
//                             <p className="text-sm">
//                                 {`Don't have an account yet? `}
//                                 <Link href="/sign-up">
//                                     <span className="text-blue-500 ">Sign up</span>
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

// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import useLoginForm from '@/hooks/useLoginForm';

// const Login: React.FC = () => {
//     const { values, handleBlur, handleChange, handleSubmit, errors, show, showpass, errorMessage } = useLoginForm();



//     return (
//         <div className="flex justify-center items-center min-h-screen">
//             <Card className="mx-auto max-w-sm">
//                 <CardHeader className="space-y-1">
//                     <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
//                     <CardDescription>Enter your email and password to login to your account</CardDescription>
//                 </CardHeader>
//                 {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
//                 <CardContent>
//                     <form onSubmit={handleSubmit}>
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="email">Email</Label>
//                                 <Input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     placeholder="m@example.com"
//                                     value={values.email}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 {errors.email && <small className="text-red-500">{errors.email}</small>}
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="password">Password</Label>
//                                 <Input
//                                     id="password"
//                                     name="password"
//                                     type={show ? 'text' : 'password'}
//                                     placeholder="•••••••••"
//                                     value={values.password}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 <div className="flex justify-between">
//                                     {errors.password && <small className="text-red-500">{errors.password}</small>}
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


// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import useLoginForm from '@/hooks/useLoginForm';

// const Login: React.FC = () => {
//     const { values, handleBlur, handleChange, handleSubmit, errors, show, showpass, errorMessage } = useLoginForm();

//     return (
//         <div className="flex justify-center items-center min-h-screen">
//             <Card className="mx-auto max-w-sm">
//                 <CardHeader className="space-y-1">
//                     <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
//                     <CardDescription>Enter your email and password to login to your account</CardDescription>
//                 </CardHeader>
//                 {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
//                 <CardContent>
//                     <form onSubmit={handleSubmit}>
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="email">Email</Label>
//                                 <Input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     placeholder="m@example.com"
//                                     value={values.email}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 {errors.email && <small className="text-red-500">{errors.email}</small>}
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="password">Password</Label>
//                                 <Input
//                                     id="password"
//                                     name="password"
//                                     type={show ? 'text' : 'password'}
//                                     placeholder="•••••••••"
//                                     value={values.password}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 <div className="flex justify-between">
//                                     {errors.password && <small className="text-red-500">{errors.password}</small>}
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

// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import useLoginForm from '@/hooks/useLoginForm';

// const Login: React.FC = () => {
//     const { values, handleBlur, handleChange, handleSubmit, errors, show, showpass, errorMessage } = useLoginForm();

//     return (
//         <div className="flex justify-center items-center min-h-screen">
//             <Card className="mx-auto max-w-sm">
//                 <CardHeader className="space-y-1">
//                     <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
//                     <CardDescription>Enter your email and password to login to your account</CardDescription>
//                 </CardHeader>
//                 {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
//                 <CardContent>
//                     <form onSubmit={handleSubmit}>
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="email">Email</Label>
//                                 <Input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     placeholder="m@example.com"
//                                     value={values.email}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 {errors.email && <small className="text-red-500">{errors.email}</small>}
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="password">Password</Label>
//                                 <Input
//                                     id="password"
//                                     name="password"
//                                     type={show ? 'text' : 'password'}
//                                     placeholder="•••••••••"
//                                     value={values.password}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 <div className="flex justify-between">
//                                     {errors.password && <small className="text-red-500">{errors.password}</small>}
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

// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import useLoginForm from '@/hooks/useLoginForm';

// const Login: React.FC = () => {
//     const { values, handleBlur, handleChange, handleSubmit, errors, show, showpass, errorMessage } = useLoginForm();

//     return (
//         <div className="flex justify-center items-center min-h-screen">
//             <Card className="mx-auto max-w-sm">
//                 <CardHeader className="space-y-1">
//                     <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
//                     <CardDescription>Enter your email and password to login to your account</CardDescription>
//                 </CardHeader>
//                 {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
//                 <CardContent>
//                     <form onSubmit={handleSubmit}>
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="email">Email</Label>
//                                 <Input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     placeholder="m@example.com"
//                                     value={values.email}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 {errors.email && <small className="text-red-500">{errors.email}</small>}
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="password">Password</Label>
//                                 <Input
//                                     id="password"
//                                     name="password"
//                                     type={show ? 'text' : 'password'}
//                                     placeholder="•••••••••"
//                                     value={values.password}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 <div className="flex justify-between">
//                                     {errors.password && <small className="text-red-500">{errors.password}</small>}
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
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LoginValidation from '@/validations/LoginValidation';
import { useAuth } from '@/context/AuthContext';

interface LoginValues {
    email: string;
    password: string;
}

const initialValues: LoginValues = {
    email: '',
    password: '',
};

const Login: React.FC = () => {
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuth();

    const showpass = () => {
        setShow((prevState) => !prevState);
    };

    const formik = useFormik({
        initialValues,
        validationSchema: LoginValidation,
        onSubmit: async (values) => {
            try {
                await login(values.email, values.password);
                // Login successful, navigation is handled in AuthContext
            } catch (error) {
                console.error('Login error:', error);
                setErrorMessage(error instanceof Error ? error.message : 'An error occurred during login');
            } finally {
                formik.setSubmitting(false);
            }
        },
    });

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                    <CardDescription>Enter your email and password to login to your account</CardDescription>
                </CardHeader>
                {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
                <CardContent>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <small className="text-red-500">{formik.errors.email}</small>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type={show ? 'text' : 'password'}
                                    placeholder="•••••••••"
                                    {...formik.getFieldProps('password')}
                                />
                                <div className="flex justify-between">
                                    {formik.touched.password && formik.errors.password && (
                                        <small className="text-red-500">{formik.errors.password}</small>
                                    )}
                                    <button type="button" onClick={showpass} className="text-black ml-2 text-sm">
                                        {show ? 'Hide' : 'Show'} Password
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm">
                                {`Don't have an account yet? `}
                                <Link href="/sign-up" className="text-blue-500">
                                    Sign up
                                </Link>
                            </p>
                            <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? 'Logging in...' : 'Login'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;