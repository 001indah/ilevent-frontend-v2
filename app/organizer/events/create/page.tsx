// 'use client';
// import { useState } from 'react';
// import { getToken } from '@/utils/auth';
// import apiClient from '@/services/apiClient';

// const CreateEvent = () => {
//     const [eventData, setEventData] = useState({
//         name: '',
//         description: '',
//         location: '',
//         date: '',
//         time: '',
//         isFreeEvent: false,
//         category: '',
//         tickets: [
//             {
//                 nameTicket: '',
//                 availableSeats: 0,
//                 priceBeforeDiscount: 0,
//                 ticketDiscount: 0,
//             },
//         ],
//         vouchers: [
//             {
//                 discountCode: '',
//                 discountPercentage: 0,
//                 maxUses: 0,
//                 expiredAt: '',
//             },
//         ],
//         promoReferral: {
//             start: '',
//             end: '',
//             maxClaims: 0,
//         },
//     });
//     const [eventImage, setEventImage] = useState(null);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setEventData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handlePromoReferralChange = (e) => {
//         const { name, value } = e.target;
//         setEventData((prevData) => ({
//             ...prevData,
//             promoReferral: {
//                 ...prevData.promoReferral,
//                 [name]: value,
//             },
//         }));
//     };

//     const handleImageChange = (e) => {
//         setEventImage(e.target.files[0]);
//     };

//     const handleTicketChange = (index, e) => {
//         const { name, value } = e.target;
//         const updatedTickets = [...eventData.tickets];
//         updatedTickets[index][name] = value;
//         setEventData((prevData) => ({
//             ...prevData,
//             tickets: updatedTickets,
//         }));
//     };

//     const handleVoucherChange = (index, e) => {
//         const { name, value } = e.target;
//         const updatedVouchers = [...eventData.vouchers];
//         updatedVouchers[index][name] = value;
//         setEventData((prevData) => ({
//             ...prevData,
//             vouchers: updatedVouchers,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const token = getToken();
//         if (!token) {
//             console.error('No token found');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('eventImage', eventImage);
//         formData.append('data', JSON.stringify(eventData));

//         try {
//             const response = await apiClient.post('/events/create', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });
//             console.log('Event created successfully:', response.data);
//         } catch (error) {
//             console.error('Error creating event:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>
//                     Name:
//                     <input
//                         type="text"
//                         name="name"
//                         value={eventData.name}
//                         onChange={handleInputChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Description:
//                     <textarea
//                         name="description"
//                         value={eventData.description}
//                         onChange={handleInputChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Location:
//                     <input
//                         type="text"
//                         name="location"
//                         value={eventData.location}
//                         onChange={handleInputChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Date:
//                     <input
//                         type="date"
//                         name="date"
//                         value={eventData.date}
//                         onChange={handleInputChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Time:
//                     <input
//                         type="time"
//                         name="time"
//                         value={eventData.time}
//                         onChange={handleInputChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Is Free Event:
//                     <input
//                         type="checkbox"
//                         name="isFreeEvent"
//                         checked={eventData.isFreeEvent}
//                         onChange={(e) =>
//                             setEventData((prevData) => ({
//                                 ...prevData,
//                                 isFreeEvent: e.target.checked,
//                             }))
//                         }
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Category:
//                     <input
//                         type="text"
//                         name="category"
//                         value={eventData.category}
//                         onChange={handleInputChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Event Image:
//                     <input
//                         type="file"
//                         name="eventImage"
//                         onChange={handleImageChange}
//                     />
//                 </label>
//             </div>
//             {eventData.tickets.map((ticket, index) => (
//                 <div key={index}>
//                     <h3>Ticket {index + 1}</h3>
//                     <label>
//                         Ticket Name:
//                         <input
//                             type="text"
//                             name="nameTicket"
//                             value={ticket.nameTicket}
//                             onChange={(e) => handleTicketChange(index, e)}
//                         />
//                     </label>
//                     <label>
//                         Available Seats:
//                         <input
//                             type="number"
//                             name="availableSeats"
//                             value={ticket.availableSeats}
//                             onChange={(e) => handleTicketChange(index, e)}
//                         />
//                     </label>
//                     <label>
//                         Price Before Discount:
//                         <input
//                             type="number"
//                             name="priceBeforeDiscount"
//                             value={ticket.priceBeforeDiscount}
//                             onChange={(e) => handleTicketChange(index, e)}
//                         />
//                     </label>
//                     <label>
//                         Ticket Discount:
//                         <input
//                             type="number"
//                             name="ticketDiscount"
//                             value={ticket.ticketDiscount}
//                             onChange={(e) => handleTicketChange(index, e)}
//                         />
//                     </label>
//                 </div>
//             ))}
//             {eventData.vouchers.map((voucher, index) => (
//                 <div key={index}>
//                     <h3>Voucher {index + 1}</h3>
//                     <label>
//                         Discount Code:
//                         <input
//                             type="text"
//                             name="discountCode"
//                             value={voucher.discountCode}
//                             onChange={(e) => handleVoucherChange(index, e)}
//                         />
//                     </label>
//                     <label>
//                         Discount Percentage:
//                         <input
//                             type="number"
//                             name="discountPercentage"
//                             value={voucher.discountPercentage}
//                             onChange={(e) => handleVoucherChange(index, e)}
//                         />
//                     </label>
//                     <label>
//                         Max Uses:
//                         <input
//                             type="number"
//                             name="maxUses"
//                             value={voucher.maxUses}
//                             onChange={(e) => handleVoucherChange(index, e)}
//                         />
//                     </label>
//                     <label>
//                         Expired At:
//                         <input
//                             type="date"
//                             name="expiredAt"
//                             value={voucher.expiredAt}
//                             onChange={(e) => handleVoucherChange(index, e)}
//                         />
//                     </label>
//                 </div>
//             ))}
//             <div>
//                 <h3>Promo Referral</h3>
//                 <label>
//                     Start:
//                     <input
//                         type="date"
//                         name="start"
//                         value={eventData.promoReferral.start}
//                         onChange={handlePromoReferralChange}
//                     />
//                 </label>
//                 <label>
//                     End:
//                     <input
//                         type="date"
//                         name="end"
//                         value={eventData.promoReferral.end}
//                         onChange={handlePromoReferralChange}
//                     />
//                 </label>
//                 <label>
//                     Max Claims:
//                     <input
//                         type="number"
//                         name="maxClaims"
//                         value={eventData.promoReferral.maxClaims}
//                         onChange={handlePromoReferralChange}
//                     />
//                 </label>
//             </div>
//             <button type="submit">Create Event</button>
//         </form>
//     );
// };

// export default CreateEvent;

// 'use client';
// import { useState } from 'react';
// import { getToken } from '@/utils/auth';
// import apiClient from '@/services/apiClient';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Calendar } from "@/components/ui/calendar";
// import { CalendarIcon, Clock, MapPin, Tag, Ticket, Gift, Users } from 'lucide-react';

// const CreateEvent = () => {
//     const [eventData, setEventData] = useState({
//         name: '',
//         description: '',
//         location: '',
//         date: '',
//         time: '',
//         isFreeEvent: false,
//         category: '',
//         tickets: [
//             {
//                 nameTicket: '',
//                 availableSeats: 0,
//                 priceBeforeDiscount: 0,
//                 ticketDiscount: 0,
//             },
//         ],
//         vouchers: [
//             {
//                 discountCode: '',
//                 discountPercentage: 0,
//                 maxUses: 0,
//                 expiredAt: '',
//             },
//         ],
//         promoReferral: {
//             start: '',
//             end: '',
//             maxClaims: 0,
//         },
//     });
//     const [eventImage, setEventImage] = useState(null);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setEventData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handlePromoReferralChange = (e) => {
//         const { name, value } = e.target;
//         setEventData((prevData) => ({
//             ...prevData,
//             promoReferral: {
//                 ...prevData.promoReferral,
//                 [name]: value,
//             },
//         }));
//     };

//     const handleImageChange = (e) => {
//         setEventImage(e.target.files[0]);
//     };

//     const handleTicketChange = (index, e) => {
//         const { name, value } = e.target;
//         const updatedTickets = [...eventData.tickets];
//         updatedTickets[index][name] = value;
//         setEventData((prevData) => ({
//             ...prevData,
//             tickets: updatedTickets,
//         }));
//     };

//     const handleVoucherChange = (index, e) => {
//         const { name, value } = e.target;
//         const updatedVouchers = [...eventData.vouchers];
//         updatedVouchers[index][name] = value;
//         setEventData((prevData) => ({
//             ...prevData,
//             vouchers: updatedVouchers,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const token = getToken();
//         if (!token) {
//             console.error('No token found');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('eventImage', eventImage);
//         formData.append('data', JSON.stringify(eventData));

//         try {
//             const response = await apiClient.post('/events/create', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });
//             console.log('Event created successfully:', response.data);
//         } catch (error) {
//             console.error('Error creating event:', error);
//         }
//     };
//     return (
//         <Card className="w-full max-w-2xl mx-auto">
//             <CardHeader>
//                 <CardTitle>Create New Event</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium mb-1" htmlFor="name">
//                             Name
//                         </label>
//                         <Input
//                             id="name"
//                             name="name"
//                             value={eventData.name}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-1" htmlFor="description">
//                             Description
//                         </label>
//                         <Textarea
//                             id="description"
//                             name="description"
//                             value={eventData.description}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-1" htmlFor="location">
//                             Location
//                         </label>
//                         <div className="flex">
//                             <MapPin className="mr-2 h-4 w-4" />
//                             <Input
//                                 id="location"
//                                 name="location"
//                                 value={eventData.location}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                     </div>
//                     <div className="flex space-x-4">
//                         <div className="flex-1">
//                             <label className="block text-sm font-medium mb-1" htmlFor="date">
//                                 Date
//                             </label>
//                             <div className="flex">
//                                 <CalendarIcon className="mr-2 h-4 w-4" />
//                                 <Input
//                                     id="date"
//                                     type="date"
//                                     name="date"
//                                     value={eventData.date}
//                                     onChange={handleInputChange}
//                                 />
//                             </div>
//                         </div>
//                         <div className="flex-1">
//                             <label className="block text-sm font-medium mb-1" htmlFor="time">
//                                 Time
//                             </label>
//                             <div className="flex">
//                                 <Clock className="mr-2 h-4 w-4" />
//                                 <Input
//                                     id="time"
//                                     type="time"
//                                     name="time"
//                                     value={eventData.time}
//                                     onChange={handleInputChange}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <Checkbox
//                             id="isFreeEvent"
//                             name="isFreeEvent"
//                             checked={eventData.isFreeEvent}
//                             onCheckedChange={(checked) =>
//                                 setEventData((prevData) => ({
//                                     ...prevData,
//                                     isFreeEvent: checked,
//                                 }))
//                             }
//                         />
//                         <label
//                             htmlFor="isFreeEvent"
//                             className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                         >
//                             Is Free Event
//                         </label>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-1" htmlFor="category">
//                             Category
//                         </label>
//                         <div className="flex">
//                             <Tag className="mr-2 h-4 w-4" />
//                             <Input
//                                 id="category"
//                                 name="category"
//                                 value={eventData.category}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-1" htmlFor="eventImage">
//                             Event Image
//                         </label>
//                         <Input
//                             id="eventImage"
//                             type="file"
//                             name="eventImage"
//                             onChange={handleImageChange}
//                         />
//                     </div>

//                     {/* Tickets */}
//                     <Card>
//                         <CardHeader>
//                             <CardTitle className="text-lg flex items-center">
//                                 <Ticket className="mr-2 h-4 w-4" />
//                                 Tickets
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             {eventData.tickets.map((ticket, index) => (
//                                 <div key={index} className="space-y-2 mb-4">
//                                     <Input
//                                         placeholder="Ticket Name"
//                                         name="nameTicket"
//                                         value={ticket.nameTicket}
//                                         onChange={(e) => handleTicketChange(index, e)}
//                                     />
//                                     <Input
//                                         type="number"
//                                         placeholder="Available Seats"
//                                         name="availableSeats"
//                                         value={ticket.availableSeats}
//                                         onChange={(e) => handleTicketChange(index, e)}
//                                     />
//                                     <Input
//                                         type="number"
//                                         placeholder="Price Before Discount"
//                                         name="priceBeforeDiscount"
//                                         value={ticket.priceBeforeDiscount}
//                                         onChange={(e) => handleTicketChange(index, e)}
//                                     />
//                                     <Input
//                                         type="number"
//                                         placeholder="Ticket Discount"
//                                         name="ticketDiscount"
//                                         value={ticket.ticketDiscount}
//                                         onChange={(e) => handleTicketChange(index, e)}
//                                     />
//                                 </div>
//                             ))}
//                         </CardContent>
//                     </Card>

//                     {/* Vouchers */}
//                     <Card>
//                         <CardHeader>
//                             <CardTitle className="text-lg flex items-center">
//                                 <Gift className="mr-2 h-4 w-4" />
//                                 Vouchers
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             {eventData.vouchers.map((voucher, index) => (
//                                 <div key={index} className="space-y-2 mb-4">
//                                     <Input
//                                         placeholder="Discount Code"
//                                         name="discountCode"
//                                         value={voucher.discountCode}
//                                         onChange={(e) => handleVoucherChange(index, e)}
//                                     />
//                                     <Input
//                                         type="number"
//                                         placeholder="Discount Percentage"
//                                         name="discountPercentage"
//                                         value={voucher.discountPercentage}
//                                         onChange={(e) => handleVoucherChange(index, e)}
//                                     />
//                                     <Input
//                                         type="number"
//                                         placeholder="Max Uses"
//                                         name="maxUses"
//                                         value={voucher.maxUses}
//                                         onChange={(e) => handleVoucherChange(index, e)}
//                                     />
//                                     <Input
//                                         type="date"
//                                         placeholder="Expired At"
//                                         name="expiredAt"
//                                         value={voucher.expiredAt}
//                                         onChange={(e) => handleVoucherChange(index, e)}
//                                     />
//                                 </div>
//                             ))}
//                         </CardContent>
//                     </Card>

//                     {/* Promo Referral */}
//                     <Card>
//                         <CardHeader>
//                             <CardTitle className="text-lg flex items-center">
//                                 <Users className="mr-2 h-4 w-4" />
//                                 Promo Referral
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-2">
//                             <Input
//                                 type="date"
//                                 placeholder="Start Date"
//                                 name="start"
//                                 value={eventData.promoReferral.start}
//                                 onChange={handlePromoReferralChange}
//                             />
//                             <Input
//                                 type="date"
//                                 placeholder="End Date"
//                                 name="end"
//                                 value={eventData.promoReferral.end}
//                                 onChange={handlePromoReferralChange}
//                             />
//                             <Input
//                                 type="number"
//                                 placeholder="Max Claims"
//                                 name="maxClaims"
//                                 value={eventData.promoReferral.maxClaims}
//                                 onChange={handlePromoReferralChange}
//                             />
//                         </CardContent>
//                     </Card>

//                     <Button type="submit">Create Event</Button>
//                 </form>
//             </CardContent>
//         </Card>
//     );
// };

// export default CreateEvent;

'use client';
import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getToken } from '@/utils/auth';
import apiClient from '@/services/apiClient';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Clock, MapPin, Tag, Ticket, Gift, Users, Plus, Minus } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const FILE_SIZE = 2 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

const CATEGORIES = [
    'music', 'sports', 'conference', 'festival', 'workshop', 'seminar',
    'film', 'arts', 'business', 'science', 'tech', 'food', 'exhibition',
    'travel', 'fashion'
];

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Event name is required'),
    description: Yup.string().required('Description is required'),
    location: Yup.string().required('Location is required'),
    date: Yup.date().required('Date is required').min(new Date(), 'Date must be in the future'),
    time: Yup.string().required('Time is required'),
    isFreeEvent: Yup.boolean(),
    category: Yup.string().oneOf(CATEGORIES, 'Invalid category').required('Category is required'),
    eventImage: Yup.mixed()
        .required('Event image is required')
        .test('fileSize', 'File too large', value => value && value.size <= FILE_SIZE)
        .test('fileFormat', 'Unsupported Format', value => value && SUPPORTED_FORMATS.includes(value.type)),
    tickets: Yup.array().of(
        Yup.object().shape({
            nameTicket: Yup.string().required('Ticket name is required'),
            availableSeats: Yup.number().positive('Must be positive').integer('Must be an integer').required('Available seats is required'),
            priceBeforeDiscount: Yup.number().min(0, 'Price cannot be negative').required('Price is required'),
            ticketDiscount: Yup.number().min(0, 'Discount cannot be negative').max(100, 'Discount cannot exceed 100%'),
        })
    ).min(1, 'At least one ticket is required'),
    vouchers: Yup.array().of(
        Yup.object().shape({
            discountCode: Yup.string().required('Discount code is required'),
            discountPercentage: Yup.number().min(0, 'Discount cannot be negative').max(100, 'Discount cannot exceed 100%').required('Discount percentage is required'),
            maxUses: Yup.number().positive('Must be positive').integer('Must be an integer').required('Max uses is required'),
            expiredAt: Yup.date().required('Expiry date is required'),
        })
    ),
    promoReferral: Yup.object().shape({
        start: Yup.date().required('Start date is required'),
        end: Yup.date().min(Yup.ref('start'), 'End date must be after start date').required('End date is required'),
        maxClaims: Yup.number().positive('Must be positive').integer('Must be an integer').required('Max claims is required'),
    }),
});

const CreateEvent = () => {
    const initialValues = {
        name: '',
        description: '',
        location: '',
        date: '',
        time: '',
        isFreeEvent: false,
        category: '',
        eventImage: null,
        tickets: [{ nameTicket: '', availableSeats: '', priceBeforeDiscount: '', ticketDiscount: '' }],
        vouchers: [{ discountCode: '', discountPercentage: '', maxUses: '', expiredAt: '' }],
        promoReferral: { start: '', end: '', maxClaims: 0 },
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        const token = getToken();
        if (!token) {
            toast({
                title: "Error",
                description: "No authentication token found. Please log in.",
                variant: "destructive",
            });
            setSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append('eventImage', values.eventImage);
        formData.append('data', JSON.stringify(values));

        try {
            const response = await apiClient.post('/events/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            toast({
                title: "Success",
                description: "Event created successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create event. Please try again.",
                variant: "destructive",
            });
        }
        setSubmitting(false);
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Create New Event</CardTitle>
            </CardHeader>
            <CardContent>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                                <Field name="name" as={Input} />
                                <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
                                <Field name="description" as={Textarea} />
                                <ErrorMessage name="description" component="p" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="location">Location</label>
                                <div className="flex">
                                    <MapPin className="mr-2 h-4 w-4" />
                                    <Field name="location" as={Input} />
                                </div>
                                <ErrorMessage name="location" component="p" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium mb-1" htmlFor="date">Date</label>
                                    <div className="flex">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        <Field name="date" type="date" as={Input} />
                                    </div>
                                    <ErrorMessage name="date" component="p" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium mb-1" htmlFor="time">Time</label>
                                    <div className="flex">
                                        <Clock className="mr-2 h-4 w-4" />
                                        <Field name="time" type="time" as={Input} />
                                    </div>
                                    <ErrorMessage name="time" component="p" className="text-red-500 text-sm mt-1" />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Field name="isFreeEvent" type="checkbox" as={Checkbox} />
                                <label htmlFor="isFreeEvent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Is Free Event
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="category">Category</label>
                                <Field name="category">
                                    {({ field }) => (
                                        <Select onValueChange={(value) => setFieldValue("category", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {CATEGORIES.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                </Field>
                                <ErrorMessage name="category" component="p" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="eventImage">Event Image</label>
                                <input
                                    id="eventImage"
                                    name="eventImage"
                                    type="file"
                                    onChange={(event) => {
                                        setFieldValue("eventImage", event.currentTarget.files[0]);
                                    }}
                                />
                                <ErrorMessage name="eventImage" component="p" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Tickets */}
                            <FieldArray name="tickets">
                                {({ push, remove }) => (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg flex items-center justify-between">
                                                <span className="flex items-center">
                                                    <Ticket className="mr-2 h-4 w-4" />
                                                    Tickets
                                                </span>
                                                <Button type="button" onClick={() => push({ nameTicket: '', availableSeats: 0, priceBeforeDiscount: 0, ticketDiscount: 0 })}>
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {values.tickets.map((ticket, index) => (
                                                <div key={index} className="space-y-2 mb-4">
                                                    <Field name={`tickets.${index}.nameTicket`} as={Input} placeholder="Ticket Name" />
                                                    <Field name={`tickets.${index}.availableSeats`} as={Input} type="number" placeholder="Available Seats" />
                                                    <Field name={`tickets.${index}.priceBeforeDiscount`} as={Input} type="number" placeholder={`Price Before Discount`} />
                                                    <Field name={`tickets.${index}.ticketDiscount`} as={Input} type="number" placeholder={`Ticket Discount (%)`} />
                                                    {index > 0 && (
                                                        <Button type="button" onClick={() => remove(index)}>
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                    <ErrorMessage name={`tickets.${index}`}>
                                                        {(msg) => <p className="text-red-500 text-sm mt-1">{typeof msg === 'string' ? msg : JSON.stringify(msg)}</p>}
                                                    </ErrorMessage>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                )}
                            </FieldArray>

                            {/* Vouchers */}
                            <FieldArray name="vouchers">
                                {({ push, remove }) => (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg flex items-center justify-between">
                                                <span className="flex items-center">
                                                    <Gift className="mr-2 h-4 w-4" />
                                                    Vouchers
                                                </span>
                                                <Button type="button" onClick={() => push({ discountCode: '', discountPercentage: 0, maxUses: 0, expiredAt: '' })}>
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {values.vouchers.map((voucher, index) => (
                                                <div key={index} className="space-y-2 mb-4">
                                                    <Field name={`vouchers.${index}.discountCode`} as={Input} placeholder="Discount Code" />
                                                    <Field name={`vouchers.${index}.discountPercentage`} as={Input} type="number" placeholder={`Discount Percentage (%)`} />
                                                    <Field name={`vouchers.${index}.maxUses`} as={Input} type="number" placeholder="Max Uses" />
                                                    <Field name={`vouchers.${index}.expiredAt`} as={Input} type="date" placeholder="Expired At" />
                                                    {index > 0 && (
                                                        <Button type="button" onClick={() => remove(index)}>
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                    <ErrorMessage name={`vouchers.${index}`}>
                                                        {(msg) => <p className="text-red-500 text-sm mt-1">{typeof msg === 'string' ? msg : JSON.stringify(msg)}</p>}
                                                    </ErrorMessage>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                )}
                            </FieldArray>
                            {/* Promo Referral */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center">
                                        <Users className="mr-2 h-4 w-4" />
                                        Promo Referral
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Field name="promoReferral.start" as={Input} type="date" placeholder="Start Date" />
                                    <ErrorMessage name="promoReferral.start" component="p" className="text-red-500 text-sm mt-1" />

                                    <Field name="promoReferral.end" as={Input} type="date" placeholder="End Date" />
                                    <ErrorMessage name="promoReferral.end" component="p" className="text-red-500 text-sm mt-1" />

                                    <Field name="promoReferral.maxClaims" as={Input} type="number" placeholder="Max Claims" />
                                    <ErrorMessage name="promoReferral.maxClaims" component="p" className="text-red-500 text-sm mt-1" />
                                </CardContent>
                            </Card>

                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Creating...' : 'Create Event'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    );
};

export default CreateEvent;