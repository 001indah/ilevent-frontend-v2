'use client'
import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, PlusCircle, MinusCircle } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { categories } from './Categories';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calender";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from '@/components/ui/label';


const FILE_SIZE = 2 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Event name is required'),
    time: Yup.string().required('Time is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().required('End date is required'),
    picture: Yup.mixed()
        .required('A file is required')
        .test('fileSize', 'File is too large', value =>
            value && value.size <= FILE_SIZE
        )
        .test('fileFormat', 'Unsupported file format', value =>
            value && SUPPORTED_FORMATS.includes(value.type)
        )
        .test('fileName', 'File name is too long', value =>
            value && value.name.length <= 100
        )
});
const CreateProduct = () => {
    const initialValues = {
        name: '',
        category: '',
        description: '',
        isFreeEvent: '',
        picture: null,
        city: '',
        startDate: null,
        endDate: null,
        time: '',
        ticketTiers: [{
            availableTickets: '',
            type: '',
            priceBeforeDiscount: '',
            priceAfterDiscount: '',
            discount: '',
        }],
        vouchers: [{
            discountCode: '',
            availableSeat: '',
            isReferralDiscount: '',
            discount: '',
            dateRange: { from: undefined, to: undefined },
        }],
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ values, errors, touched, setFieldValue, handleChange, handleBlur, isSubmitting }) => (
                <Form className='border p-5 space-y-5 rounded-lg m-5'>
                    <h2 className='text-2xl font-bold'>Add New Event</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Event Name</Label>
                            <Field name="name" as={Input} placeholder="Event Name" />
                            {errors.name && touched.name && <div className="text-red-500">{errors.name}</div>}
                        </div>
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Select name="category" onValueChange={(value) => setFieldValue('category', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an event category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.value} value={category.value}>
                                            {category.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className='space-y-5'>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Field name="description" as={Input} placeholder="Description" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="isFreeEvent">Is Free Event</Label>
                                <Select name="isFreeEvent" onValueChange={(value) => setFieldValue('isFreeEvent', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Is Free Event" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">True</SelectItem>
                                        <SelectItem value="false">False</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="picture">Picture</Label>
                                <Input
                                    id="picture"
                                    name="picture"
                                    type="file"
                                    onChange={(event) => {
                                        setFieldValue("picture", event.currentTarget.files[0]);
                                    }}
                                />
                                {errors.picture && touched.picture && <div className="text-red-500">{errors.picture}</div>}
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="city">City</Label>
                        <Field name="city" as={Input} placeholder="City" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="startDate">Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !values.startDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {values.startDate ? format(values.startDate, "PPP") : <span>Start Date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={values.startDate}
                                        onSelect={(date) => setFieldValue('startDate', date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.startDate && touched.startDate && <div className="text-red-500">{errors.startDate}</div>}
                        </div>
                        {/* <div> */}
                        {/* <Label htmlFor="endDate">End Date</Label> */}
                        {/* <Popover> */}
                        {/* <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !values.endDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {values.endDate ? format(values.endDate, "PPP") : <span>End Date</span>}
                                    </Button>
                                </PopoverTrigger> */}
                        {/* <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={values.endDate}
                                        onSelect={(date) => setFieldValue('endDate', date)}
                                        initialFocus
                                    />
                                </PopoverContent> */}
                        {/* </Popover> */}
                        {/* {errors.endDate && touched.endDate && <div className="text-red-500">{errors.endDate}</div>} */}
                        {/* </div> */}
                        <div>
                            <Label htmlFor="time">Time</Label>
                            <Field name="time" as={Input} type="time" />
                            {errors.time && touched.time && <div className="text-red-500">{errors.time}</div>}
                        </div>
                    </div>

                    <div className="border p-5 rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">Ticket Tier</h3>
                        <FieldArray name="ticketTiers">
                            {({ insert, remove, push }) => (
                                <div>
                                    {values.ticketTiers.length > 0 &&
                                        values.ticketTiers.map((ticketTier, index) => (
                                            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                                                <Field name={`ticketTiers.${index}.availableTickets`} as={Input} placeholder="Available Tickets" />
                                                <Select
                                                    name={`ticketTiers.${index}.type`}
                                                    onValueChange={(value) => setFieldValue(`ticketTiers.${index}.type`, value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Free">Free</SelectItem>
                                                        <SelectItem value="VIP">VIP</SelectItem>
                                                        <SelectItem value="VIIP">VIIP</SelectItem>
                                                        <SelectItem value="Regular">Regular</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Field name={`ticketTiers.${index}.priceBeforeDiscount`} as={Input} placeholder="Price (Rp) before discount" />
                                                <Field name={`ticketTiers.${index}.priceAfterDiscount`} as={Input} placeholder="Price (Rp) after discount" />
                                                <Field name={`ticketTiers.${index}.discount`} as={Input} placeholder="Discount (%)" />
                                            </div>
                                        ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => push({ availableTickets: '', type: '', priceBeforeDiscount: '', discount: '' })}
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" /> Add Ticket Tier
                                    </Button>
                                </div>
                            )}
                        </FieldArray>
                    </div>

                    <div className="border p-5 rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">Voucher Event</h3>
                        <FieldArray name="vouchers">
                            {({ insert, remove, push }) => (
                                <div>
                                    {values.vouchers.length > 0 &&
                                        values.vouchers.map((voucher, index) => (
                                            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                                                <Field name={`vouchers.${index}.discountCode`} as={Input} placeholder="Discount Code" />
                                                <Field name={`vouchers.${index}.availableSeat`} as={Input} placeholder="Available Seat" />
                                                <Select
                                                    name={`vouchers.${index}.isReferralDiscount`}
                                                    onValueChange={(value) => setFieldValue(`vouchers.${index}.isReferralDiscount`, value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Is Referral Discount" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="True">True</SelectItem>
                                                        <SelectItem value="False">False</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Field name={`vouchers.${index}.discount`} as={Input} placeholder="Discount (%)" />
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !voucher.dateRange.from && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {voucher.dateRange.from ? (
                                                                voucher.dateRange.to ? (
                                                                    <>
                                                                        {format(voucher.dateRange.from, "PPP")} -{" "}
                                                                        {format(voucher.dateRange.to, "PPP")}
                                                                    </>
                                                                ) : (
                                                                    format(voucher.dateRange.from, "PPP")
                                                                )
                                                            ) : (
                                                                <span>Pick a date range</span>
                                                            )}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            initialFocus
                                                            mode="range"
                                                            defaultMonth={voucher.dateRange.from}
                                                            selected={voucher.dateRange}
                                                            onSelect={(range) => setFieldValue(`vouchers.${index}.dateRange`, range)}
                                                            numberOfMonths={2}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => push({ discountCode: '', availableSeat: '', isReferralDiscount: '', discount: '', dateRange: { from: undefined, to: undefined } })}
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" /> Add Voucher
                                    </Button>
                                </div>
                            )}
                        </FieldArray>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

// Komponen helper untuk menampilkan pesan error
const ErrorMessage = ({ error, touched }) => {
    if (error && touched) {
        return <div className="text-red-500 text-sm mt-1">{error}</div>;
    }
    return null;
};

// Fungsi helper untuk memformat tanggal
const formatDate = (date) => {
    if (!date) return '';
    return format(new Date(date), 'yyyy-MM-dd');
};

// Fungsi untuk menangani submisi form
const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
        // Di sini Anda akan mengirim data ke API
        console.log('Form values:', values);

        // Simulasi pengiriman data ke server
        await new Promise(resolve => setTimeout(resolve, 1000));

        alert('Form submitted successfully!');
        setSubmitting(false);
    } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ submit: 'An error occurred while submitting the form. Please try again.' });
        setSubmitting(false);
    }
};

export default CreateProduct;