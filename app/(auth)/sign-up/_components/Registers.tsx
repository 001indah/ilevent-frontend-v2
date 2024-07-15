// 'use client';
// import React from 'react';
// import Link from 'next/link';
// import useRegisterForm from '@/hooks/useRegisterForm';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"


// const Register: React.FC = () => {
//     const { values, handleBlur, handleChange, handleSubmit, errors, show, showpass, errorMessage } = useRegisterForm();

//     return (
//         <div className="flex justify-center items-center min-h-screen">
//             <Card className="mx-auto max-w-sm">
//                 <CardHeader className="space-y-1">
//                     <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
//                     <CardDescription>Enter your email and password to login to your account</CardDescription>
//                 </CardHeader>
//                 {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
//                 <CardContent>
//                     <form onSubmit={handleSubmit}>
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="fullname">Fullname</Label>
//                                 <Input
//                                     id="fullname"
//                                     type="text"
//                                     placeholder="Enter your fullname"
//                                     value={values.fullname}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 {errors.fullname && <small className="text-red-500">{errors.fullname}</small>}
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="username">Username</Label>
//                                 <Input
//                                     id="username"
//                                     type="text"
//                                     placeholder="Enter your username"
//                                     value={values.username}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 {errors.username && <small className="text-red-500">{errors.username}</small>}
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="email">Email</Label>
//                                 <Input
//                                     id="email"
//                                     type="email"
//                                     placeholder="Enter your email"
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
//                             <div className="space-y-2">
//                                 <Label htmlFor="role">Role</Label>
//                                 <Select>
//                                     <SelectTrigger>
//                                         <SelectValue placeholder="Select role" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="organization">Organization</SelectItem>
//                                         <SelectItem value="personal">Personal</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                                 {errors.role && <small className="text-red-500">{errors.role}</small>}
//                                 {values.role === 'organization' && (
//                                     <p className="text-sm text-gray-500 mt-2">{`If you want to book events, choose "Personal".`}</p>
//                                 )}
//                                 {values.role === 'personal' && (
//                                     <p className="text-sm text-gray-500 mt-2">{`If you want to be an event creator, choose "Organization".`}</p>
//                                 )}
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="phone">Phone</Label>
//                                 <Input
//                                     id="phone"
//                                     type="text"
//                                     placeholder="Enter your phone number"
//                                     value={values.phone}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 {errors.phone && <small className="text-red-500">{errors.phone}</small>}
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="referralUse">Referral Code</Label>
//                                 <Input
//                                     id="referralUse"
//                                     type="text"
//                                     placeholder="Enter your referral code (if any)"
//                                     value={values.referralUse}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <Button type="submit" className="w-full">
//                                 Submit
//                             </Button>
//                             <div className="mt-4 text-sm text-center">
//                                 <p>Already have an account? <Link href="/sign-in"><span className="text-blue-500">Log in</span></Link></p>
//                             </div>
//                         </div>
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default Register;
// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import useRegisterForm from '@/hooks/useRegisterForm';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"

// const Register: React.FC = () => {
//     const { values, handleBlur, handleChange, handleSubmit, errors, show, showpass, errorMessage } = useRegisterForm();

//     return (
//         <div className="flex justify-center items-center min-h-screen">
//             <Card className="mx-auto max-w-sm">
//                 <CardHeader className="space-y-1">
//                     <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
//                     <CardDescription>Enter your details to create a new account</CardDescription>
//                 </CardHeader>
//                 {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
//                 <CardContent>
//                     <form onSubmit={handleSubmit}>
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="fullname">Fullname</Label>
//                                 <Input
//                                     id="fullname"
//                                     name="fullname"
//                                     type="text"
//                                     placeholder="Enter your fullname"
//                                     value={values.fullname}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 {errors.fullname && <small className="text-red-500">{errors.fullname}</small>}
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="username">Username</Label>
//                                 <Input
//                                     id="username"
//                                     name="username"
//                                     type="text"
//                                     placeholder="Enter your username"
//                                     value={values.username}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 {errors.username && <small className="text-red-500">{errors.username}</small>}
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="email">Email</Label>
//                                 <Input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     placeholder="Enter your email"
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
//                             <div className="space-y-2">
//                                 <Label htmlFor="role">Role</Label>
//                                 <Select
//                                     name="role"
//                                     onValueChange={(value) => handleChange({ target: { name: 'role', value } })}
//                                     value={values.role}
//                                 >
//                                     <SelectTrigger>
//                                         <SelectValue placeholder="Select role" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="organization">Organization</SelectItem>
//                                         <SelectItem value="personal">Personal</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                                 {errors.role && <small className="text-red-500">{errors.role}</small>}
//                                 {values.role === 'organization' && (
//                                     <p className="text-sm text-gray-500 mt-2">{`If you want to book events, choose "Personal".`}</p>
//                                 )}
//                                 {values.role === 'personal' && (
//                                     <p className="text-sm text-gray-500 mt-2">{`If you want to be an event creator, choose "Organization".`}</p>
//                                 )}
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="phone">Phone</Label>
//                                 <Input
//                                     id="phone"
//                                     name="phone"
//                                     type="text"
//                                     placeholder="Enter your phone number"
//                                     value={values.phone}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 {errors.phone && <small className="text-red-500">{errors.phone}</small>}
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="referralCode">Referral Code</Label>
//                                 <Input
//                                     id="referralCode"
//                                     name="referralCode"
//                                     type="text"
//                                     placeholder="Enter your referral code (if any)"
//                                     value={values.referralCode}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <Button type="submit" className="w-full">
//                                 Submit
//                             </Button>
//                             <div className="mt-4 text-sm text-center">
//                                 <p>Already have an account? <Link href="/sign-in"><span className="text-blue-500">Log in</span></Link></p>
//                             </div>
//                         </div>
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default Register;


// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import useRegisterForm from '@/hooks/useRegisterForm';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"

// const Register: React.FC = () => {
//     const { values, handleBlur, handleChange, handleSubmit, errors, show, showpass, errorMessage } = useRegisterForm();

//     return (
//         <div className="flex justify-center items-center min-h-screen">
//             <Card className="mx-auto max-w-sm">
//                 <CardHeader className="space-y-1">
//                     <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
//                     <CardDescription>Enter your details to create a new account</CardDescription>
//                 </CardHeader>
//                 {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
//                 <CardContent>
//                     <form onSubmit={handleSubmit}>
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="fullname">Fullname</Label>
//                                 <Input
//                                     id="fullname"
//                                     name="fullname"
//                                     type="text"
//                                     placeholder="Enter your fullname"
//                                     value={values.fullname}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 {errors.fullname && <small className="text-red-500">{errors.fullname}</small>}
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="username">Username</Label>
//                                 <Input
//                                     id="username"
//                                     name="username"
//                                     type="text"
//                                     placeholder="Enter your username"
//                                     value={values.username}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 {errors.username && <small className="text-red-500">{errors.username}</small>}
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="email">Email</Label>
//                                 <Input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     placeholder="Enter your email"
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
//                             <div className="space-y-2">
//                                 <Label htmlFor="role">Role</Label>
//                                 <Select
//                                     id="role"
//                                     name="role"
//                                     onValueChange={(value) => handleChange({ target: { name: 'role', value } })}
//                                     value={values.role}
//                                 >
//                                     <SelectTrigger>
//                                         <SelectValue placeholder="Select role" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="organization">Organization</SelectItem>
//                                         <SelectItem value="personal">Personal</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                                 {errors.role && <small className="text-red-500">{errors.role}</small>}
//                                 {values.role === 'organization' && (
//                                     <p className="text-sm text-gray-500 mt-2">{`If you want to book events, choose "Personal".`}</p>
//                                 )}
//                                 {values.role === 'personal' && (
//                                     <p className="text-sm text-gray-500 mt-2">{`If you want to be an event creator, choose "Organization".`}</p>
//                                 )}
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="phone">Phone</Label>
//                                 <Input
//                                     id="phone"
//                                     name="phone"
//                                     type="text"
//                                     placeholder="Enter your phone number"
//                                     value={values.phone}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 {errors.phone && <small className="text-red-500">{errors.phone}</small>}
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="referralCode">Referral Code</Label>
//                                 <Input
//                                     id="referralCode"
//                                     name="referralCode"
//                                     type="text"
//                                     placeholder="Enter your referral code (if any)"
//                                     value={values.referralCode}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <Button type="submit" className="w-full">
//                                 Submit
//                             </Button>
//                             <div className="mt-4 text-sm text-center">
//                                 <p>Already have an account? <Link href="/sign-in"><span className="text-blue-500">Log in</span></Link></p>
//                             </div>
//                         </div>
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default Register;
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const RegisterValidation = Yup.object().shape({
    name: Yup.string().required('Fullname is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    role: Yup.string().oneOf(['personal', 'organization'], 'Invalid role').required('Role is required'),
    phone: Yup.string().required('Phone number is required'),
    referralCode: Yup.string().nullable()
});

const Register: React.FC = () => {
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { register, isLoading } = useAuth();

    const showpass = () => {
        setShow((prevState) => !prevState);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            role: '',
            phone: '',
            referralCode: '',
        },
        validationSchema: RegisterValidation,
        onSubmit: async (values) => {
            try {
                await register(
                    values.name,
                    values.username,
                    values.email,
                    values.password,
                    values.role === 'organization', // Convert to boolean
                    values.phone,
                    values.referralCode || null //convert to null
                );
                // Registration successful, redirection is handled in the AuthContext
            } catch (error) {
                setErrorMessage('Registration failed. Please try again.');
            }
        },
    });

    return (
        <div className="flex justify-center items-center my-10">
            <Card className="mx-auto">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
                    <CardDescription>Enter your details to create an account</CardDescription>
                </CardHeader>
                {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
                <CardContent>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Fullname</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your fullname"
                                    {...formik.getFieldProps('name')}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <small className="text-red-500">{formik.errors.name}</small>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    {...formik.getFieldProps('username')}
                                />
                                {formik.touched.username && formik.errors.username && (
                                    <small className="text-red-500">{formik.errors.username}</small>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
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
                                    type={show ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    {...formik.getFieldProps('password')}
                                />
                                <button type="button" onClick={showpass} className="text-black ml-2">
                                    {show ? 'Hide' : 'Show'} Password
                                </button>
                                {formik.touched.password && formik.errors.password && (
                                    <small className="text-red-500">{formik.errors.password}</small>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <div>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="personal"
                                            checked={formik.values.role === 'personal'}
                                            onChange={formik.handleChange}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">Personal</span>
                                    </label>
                                    <label className="inline-flex items-center ml-6">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="organization"
                                            checked={formik.values.role === 'organization'}
                                            onChange={formik.handleChange}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">Organization</span>
                                    </label>
                                </div>
                                {formik.touched.role && formik.errors.role && (
                                    <small className="text-red-500">{formik.errors.role}</small>
                                )}
                                {formik.values.role === 'organization' && (
                                    <p className="text-sm text-gray-500 mt-2">{`If you want to book events, choose "Personal".`}</p>
                                )}
                                {formik.values.role === 'personal' && (
                                    <p className="text-sm text-gray-500 mt-2">{`If you want to be an event creator, choose "Organization".`}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="text"
                                    placeholder="Enter your phone number"
                                    {...formik.getFieldProps('phone')}
                                />
                                {formik.touched.phone && formik.errors.phone && (
                                    <small className="text-red-500">{formik.errors.phone}</small>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="referralCode">Referral Code (optional)</Label>
                                <Input
                                    id="referralCode"
                                    type="text"
                                    placeholder="Enter your referral code (if any)"
                                    {...formik.getFieldProps('referralCode')}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Registering...' : 'Register'}
                            </Button>
                            <div className="mt-4 text-center">
                                <p>Already have an account? <Link href="/sign-in"><span className="text-blue-500">Log in</span></Link></p>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;