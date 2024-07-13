'use client';
import React from 'react';
import Link from 'next/link';
import useRegisterForm from '@/hooks/useRegisterForm';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const Register: React.FC = () => {
    const { values, handleBlur, handleChange, handleSubmit, errors, show, showpass, errorMessage } = useRegisterForm();

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
                    <CardDescription>Enter your email and password to login to your account</CardDescription>
                </CardHeader>
                {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullname">Fullname</Label>
                                <Input
                                    id="fullname"
                                    type="text"
                                    placeholder="Enter your fullname"
                                    value={values.fullname}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.fullname && <small className="text-red-500">{errors.fullname}</small>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={values.username}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.username && <small className="text-red-500">{errors.username}</small>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={values.email}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.email && <small className="text-red-500">{errors.email}</small>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type={show ? 'text' : 'password'}
                                    placeholder="•••••••••"
                                    value={values.password}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="flex justify-between">
                                    {errors.password && <small className="text-red-500">{errors.password}</small>}
                                    <button type="button" onClick={showpass} className="text-black ml-2 text-sm">
                                        {show ? 'Hide' : 'Show'} Password
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="organization">Organization</SelectItem>
                                        <SelectItem value="personal">Personal</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.role && <small className="text-red-500">{errors.role}</small>}
                                {values.role === 'organization' && (
                                    <p className="text-sm text-gray-500 mt-2">{`If you want to book events, choose "Personal".`}</p>
                                )}
                                {values.role === 'personal' && (
                                    <p className="text-sm text-gray-500 mt-2">{`If you want to be an event creator, choose "Organization".`}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="text"
                                    placeholder="Enter your phone number"
                                    value={values.phone}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.phone && <small className="text-red-500">{errors.phone}</small>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="referralUse">Referral Code</Label>
                                <Input
                                    id="referralUse"
                                    type="text"
                                    placeholder="Enter your referral code (if any)"
                                    value={values.referralUse}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Submit
                            </Button>
                            <div className="mt-4 text-sm text-center">
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
