// // 'use client';
// // import apiClient from '@/services/apiClient';
// // import { useAuth } from '@/context/AuthContext';
// // import { getToken } from '@/utils/auth';

// // export const useTicket = () => {
// //     const { isAuthenticated } = useAuth();

// //     const fetchTickets = async () => {
// //         if (!isAuthenticated) {
// //             console.error('User is not authenticated');
// //             return { upcomingTickets: [], completedTickets: [] };
// //         }

// //         const token = getToken();
// //         if (!token) {
// //             console.error('No token found');
// //             return { upcomingTickets: [], completedTickets: [] };
// //         }

// //         try {
// //             const response = await apiClient.get('/api/v1/purchased-tickets', {
// //                 headers: {
// //                     Authorization: `Bearer ${token}`,
// //                 },
// //             });
// //             const tickets = response.data;

// //             const currentDate = new Date();
// //             const upcomingTickets = tickets.filter(ticket => new Date(ticket.date) > currentDate);
// //             const completedTickets = tickets.filter(ticket => new Date(ticket.date) <= currentDate);

// //             return { upcomingTickets, completedTickets };
// //         } catch (error) {
// //             console.error('Error fetching tickets:', error);
// //             throw error;
// //         }
// //     };

// //     return { fetchTickets };
// // };

// // // Example usage in a React component:
// // import React, { useEffect, useState } from 'react';
// // import { useTickets } from './useTickets';

// // const TicketsList = () => {
// //     const [tickets, setTickets] = useState({ upcomingTickets: [], completedTickets: [] });
// //     const { fetchTickets } = useTickets();

// //     useEffect(() => {
// //         const getTickets = async () => {
// //             try {
// //                 const fetchedTickets = await fetchTickets();
// //                 setTickets(fetchedTickets);
// //             } catch (error) {
// //                 console.error('Failed to fetch tickets:', error);
// //                 // Handle error (e.g., show error message to user)
// //             }
// //         };

// //         getTickets();
// //     }, []);

// //     return (
// //         <div>
// //             <h2>Upcoming Tickets</h2>
// //             {tickets.upcomingTickets.map(ticket => (
// //                 <div key={ticket.id}>{ticket.name}</div>
// //             ))}
// //             <h2>Completed Tickets</h2>
// //             {tickets.completedTickets.map(ticket => (
// //                 <div key={ticket.id}>{ticket.name}</div>
// //             ))}
// //         </div>
// //     );
// // };

// // export default TicketsList;
// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useAuth } from '@/context/AuthContext';
// import apiClient from '@/services/apiClient';
// import { getToken } from '@/utils/auth';

// interface Ticket {
//     id: number;
//     name: string;
//     date: string;
//     // Add other ticket properties as needed
// }

// const TicketsPage: React.FC = () => {
//     const [upcomingTickets, setUpcomingTickets] = useState<Ticket[]>([]);
//     const [completedTickets, setCompletedTickets] = useState<Ticket[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const { isAuthenticated } = useAuth();

//     useEffect(() => {
//         const fetchTickets = async () => {
//             if (!isAuthenticated) {
//                 setError('User is not authenticated');
//                 setIsLoading(false);
//                 return;
//             }

//             const token = getToken();
//             if (!token) {
//                 setError('No token found');
//                 setIsLoading(false);
//                 return;
//             }

//             try {
//                 const response = await apiClient.get('/purchased-tickets?filter=completed', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 const tickets: Ticket[] = response.data;

//                 const currentDate = new Date();
//                 const upcoming = tickets.filter(ticket => new Date(ticket.date) > currentDate);
//                 const completed = tickets.filter(ticket => new Date(ticket.date) <= currentDate);

//                 setUpcomingTickets(upcoming);
//                 setCompletedTickets(completed);
//             } catch (err) {
//                 setError('Failed to fetch tickets');
//                 console.error('Error fetching tickets:', err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchTickets();
//     }, [isAuthenticated]);

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             <h1>My Tickets</h1>
//             <section>
//                 <h2>Upcoming Tickets</h2>
//                 {upcomingTickets.length === 0 ? (
//                     <p>No upcoming tickets</p>
//                 ) : (
//                     <ul>
//                         {upcomingTickets.map(ticket => (
//                             <li key={ticket.id}>{ticket.name} - {ticket.date}</li>
//                         ))}
//                     </ul>
//                 )}
//             </section>
//             <section>
//                 <h2>Completed Tickets</h2>
//                 {completedTickets.length === 0 ? (
//                     <p>No completed tickets</p>
//                 ) : (
//                     <ul>
//                         {completedTickets.map(ticket => (
//                             <li key={ticket.id}>{ticket.name} - {ticket.date}</li>
//                         ))}
//                     </ul>
//                 )}
//             </section>
//         </div>
//     );
// };

// export default TicketsPage;
// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useAuth } from '@/context/AuthContext';
// import apiClient from '@/services/apiClient';
// import { getToken } from '@/utils/auth';
// import Review from './_components/review';

// interface Review {
//     id: number;
//     eventId: number;
//     rating: number;
//     review: string;
//     createdAt: number;
//     updatedAt: number;
//     userId: number | null;
// }

// interface Organizer {
//     id: number;
//     name: string;
//     username: string;
// }

// interface Ticket {
//     id: number;
//     organizerId: number | null;
//     name: string;
//     description: string;
//     location: string;
//     date: string;
//     time: string;
//     image: string;
//     isFreeEvent: boolean;
//     eventCategoriesId: number;
//     category: string;
//     organizer: Organizer;
//     reviews: Review[];
// }

// const TicketsPage: React.FC = () => {
//     const [upcomingTickets, setUpcomingTickets] = useState<Ticket[]>([]);
//     const [completedTickets, setCompletedTickets] = useState<Ticket[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const { isAuthenticated } = useAuth();

//     useEffect(() => {
//         const fetchTickets = async () => {
//             if (!isAuthenticated) {
//                 setError('User is not authenticated');
//                 setIsLoading(false);
//                 return;
//             }

//             const token = getToken();
//             if (!token) {
//                 setError('No token found');
//                 setIsLoading(false);
//                 return;
//             }

//             try {
//                 const response = await apiClient.get('/purchased-tickets?filter=completed', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 const tickets: Ticket[] = response.data;

//                 const currentDate = new Date();
//                 const upcoming = tickets.filter(ticket => new Date(`${ticket.date}T${ticket.time}`) > currentDate);
//                 const completed = tickets.filter(ticket => new Date(`${ticket.date}T${ticket.time}`) <= currentDate);

//                 setUpcomingTickets(upcoming);
//                 setCompletedTickets(completed);
//             } catch (err) {
//                 setError('Failed to fetch tickets');
//                 console.error('Error fetching tickets:', err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchTickets();
//     }, [isAuthenticated]);

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     const TicketItem: React.FC<{ ticket: Ticket }> = ({ ticket }) => (
//         <li key={ticket.id} className="mb-4 p-4 border rounded shadow-sm">
//             <h3 className="text-xl font-semibold">{ticket.name}</h3>
//             <p>{ticket.description}</p>
//             <p><strong>Location:</strong> {ticket.location}</p>
//             <p><strong>Date:</strong> {ticket.date} at {ticket.time}</p>
//             <p><strong>Category:</strong> {ticket.category}</p>
//             <p><strong>Organizer:</strong> {ticket.organizer.name} (@{ticket.organizer.username})</p>
//             <p><strong>{ticket.isFreeEvent ? 'Free Event' : 'Paid Event'}</strong></p>
//             {ticket.reviews.length > 0 && (
//                 <div>
//                     <h4 className="font-semibold mt-2">Reviews:</h4>
//                     <ul>
//                         {ticket.reviews.map(review => (
//                             <li key={review.id}>
//                                 Rating: {review.rating}/5 - {review.review}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </li>
//     );

//     return (
//         <div className="container mx-auto p-4">
//             <section>
//                 <h2 className="text-2xl font-semibold mb-4">Completed Tickets</h2>
//                 {completedTickets.length === 0 ? (
//                     <p>No completed tickets</p>
//                 ) : (
//                     <ul>
//                         {completedTickets.map(ticket => (
//                             <TicketItem key={ticket.id} ticket={ticket} />
//                         ))}
//                     </ul>
//                 )}
//             </section>
//             <Review />
//         </div>
//     );
// };

// export default TicketsPage;

// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useAuth } from '@/context/AuthContext';
// import apiClient from '@/services/apiClient';
// import { getToken } from '@/utils/auth';
// import Review from './_components/review';

// // ... (interface definitions remain the same)

// const TicketsPage: React.FC = () => {
//     const [upcomingTickets, setUpcomingTickets] = useState<Ticket[]>([]);
//     const [completedTickets, setCompletedTickets] = useState<Ticket[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const { isAuthenticated } = useAuth();

//     // ... (fetchTickets function remains the same)

//     const submitReview = async (eventId: number, rating: number, reviewText: string) => {
//         const token = getToken();
//         if (!token) {
//             setError('No token found');
//             return;
//         }

//         try {
//             const response = await apiClient.post('/api/v1/reviews', {
//                 eventId,
//                 rating,
//                 review: reviewText
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 }
//             });

//             if (response.data.success) {
//                 useEffect(() => {
//                     const fetchTickets = async () => {
//                         if (!isAuthenticated) {
//                             setError('User is not authenticated');
//                             setIsLoading(false);
//                             return;
//                         }

//                         const token = getToken();
//                         if (!token) {
//                             setError('No token found');
//                             setIsLoading(false);
//                             return;
//                         }

//                         try {
//                             const response = await apiClient.get('/purchased-tickets?filter=completed', {
//                                 headers: {
//                                     Authorization: `Bearer ${token}`,
//                                 },
//                             });
//                             const tickets: Ticket[] = response.data;

//                             const currentDate = new Date();
//                             const upcoming = tickets.filter(ticket => new Date(`${ticket.date}T${ticket.time}`) > currentDate);
//                             const completed = tickets.filter(ticket => new Date(`${ticket.date}T${ticket.time}`) <= currentDate);

//                             setUpcomingTickets(upcoming);
//                             setCompletedTickets(completed);
//                         } catch (err) {
//                             setError('Failed to fetch tickets');
//                             console.error('Error fetching tickets:', err);
//                         } finally {
//                             setIsLoading(false);
//                         }
//                     };

//                     fetchTickets();
//                 }, [isAuthenticated]);

//                 if (isLoading) return <div>Loading...</div>;
//                 if (error) return <div>Error: {error}</div>;
//                 setCompletedTickets(prevTickets =>
//                     prevTickets.map(ticket =>
//                         ticket.id === eventId
//                             ? { ...ticket, reviews: [...ticket.reviews, response.data.data] }
//                             : ticket
//                     )
//                 );
//             }
//         } catch (err) {
//             console.error('Error submitting review:', err);
//             setError('Failed to submit review');
//         }
//     };

//     const TicketItem: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
//         const [rating, setRating] = useState<number>(5);
//         const [reviewText, setReviewText] = useState<string>('');

//         const handleSubmitReview = (e: React.FormEvent) => {
//             e.preventDefault();
//             submitReview(ticket.id, rating, reviewText);
//             setRating(5);
//             setReviewText('');
//         };

//         return (
//             <li key={ticket.id} className="mb-4 p-4 border rounded shadow-sm">
//                 <h3 className="text-xl font-semibold">{ticket.name}</h3>
//                 <p>{ticket.description}</p>
//                 <p><strong>Location:</strong> {ticket.location}</p>
//                 <p><strong>Date:</strong> {ticket.date} at {ticket.time}</p>
//                 <p><strong>Category:</strong> {ticket.category}</p>
//                 <p><strong>Organizer:</strong> {ticket.organizer.name} (@{ticket.organizer.username})</p>
//                 <p><strong>{ticket.isFreeEvent ? 'Free Event' : 'Paid Event'}</strong></p>

//                 {ticket.reviews.length > 0 ? (
//                     <div>
//                         <h4 className="font-semibold mt-2">Reviews:</h4>
//                         <ul>
//                             {ticket.reviews.map(review => (
//                                 <li key={review.id}>
//                                     Rating: {review.rating}/5 - {review.review}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 ) : (
//                     <form onSubmit={handleSubmitReview} className="mt-4">
//                         <h4 className="font-semibold">Add Your Review</h4>
//                         <div className="mb-2">
//                             <label className="block">Rating:</label>
//                             <select
//                                 value={rating}
//                                 onChange={(e) => setRating(Number(e.target.value))}
//                                 className="border rounded p-1"
//                             >
//                                 {[1, 2, 3, 4, 5].map(n => (
//                                     <option key={n} value={n}>{n}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="mb-2">
//                             <label className="block">Review:</label>
//                             <textarea
//                                 value={reviewText}
//                                 onChange={(e) => setReviewText(e.target.value)}
//                                 className="border rounded p-1 w-full"
//                                 rows={3}
//                             ></textarea>
//                         </div>
//                         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//                             Submit Review
//                         </button>
//                     </form>
//                 )}
//             </li>
//         );
//     };

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div className="container mx-auto p-4">
//             <section>
//                 <h2 className="text-2xl font-semibold mb-4">Completed Tickets</h2>
//                 {completedTickets.length === 0 ? (
//                     <p>No completed tickets</p>
//                 ) : (
//                     <ul>
//                         {completedTickets.map(ticket => (
//                             <TicketItem key={ticket.id} ticket={ticket} />
//                         ))}
//                     </ul>
//                 )}
//             </section>
//             <Review />
//         </div>
//     );
// };

// export default TicketsPage;
'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/services/apiClient';
import { getToken } from '@/utils/auth';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StarIcon } from "lucide-react";

interface Review {
    id: number;
    eventId: number;
    rating: number;
    review: string;
    createdAt: number;
    updatedAt: number;
    userId: number;
}

interface Ticket {
    id: number;
    name: string;
    description: string;
    date: string;
    time: string;
    location: string;
    reviews: Review[];
}

const TicketsPage: React.FC = () => {
    const [completedTickets, setCompletedTickets] = useState<Ticket[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated, currentUser } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            fetchTickets();
        } else {
            setIsLoading(false);
        }
    }, [isAuthenticated]);

    const fetchTickets = async () => {
        const token = getToken();
        if (!token) {
            setError('No token found. Please log in again.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await apiClient.get('/purchased-tickets?filter=completed', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCompletedTickets(response.data);
        } catch (err) {
            console.error('Error fetching tickets:', err);
            setError('Failed to fetch tickets. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const submitReview = async (reviewData: { eventId: number; rating: number; review: string }) => {
        const token = getToken();
        if (!token) {
            setError('No token found. Please log in again.');
            return false;
        }

        try {
            const response = await apiClient.post('/reviews', reviewData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                await fetchTickets(); // Refresh tickets to get updated reviews
                return true;
            }
        } catch (err) {
            console.error('Error submitting review:', err);
            setError('Failed to submit review. Please try again.');
        }
        return false;
    };

    const ReviewForm: React.FC<{ ticket: Ticket; onSubmit: () => void }> = ({ ticket, onSubmit }) => {
        const [rating, setRating] = useState<number>(5);
        const [review, setReview] = useState<string>('');

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            const reviewData = {
                eventId: ticket.id,
                rating,
                review
            };
            if (await submitReview(reviewData)) {
                onSubmit();
            }
        };

        return (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Rating:</label>
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                                key={star}
                                className={`cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block mb-1">Review:</label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="w-full p-2 border rounded"
                        rows={3}
                        required
                    ></textarea>
                </div>
                <Button type="submit">Submit Review</Button>
            </form>
        );
    };

    const TicketItem: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
        const [isOpen, setIsOpen] = useState(false);
        const { currentUser } = useAuth();

        const hasUserReviewed = currentUser ? ticket.reviews.some(review => review.userId === currentUser.id) : false;

        return (
            <li key={ticket.id} className="mb-4 p-4 border rounded shadow-sm">
                <div className="flex space-x-4">
                    <img src={ticket.image} alt={ticket.name} className='w-24 h-24 rounded-lg' />
                    <div>
                        <h3 className="text-xl font-semibold">{ticket.name}</h3>
                        <p>{ticket.description}</p>
                        <p><strong>Date:</strong> {ticket.date} at {ticket.time}</p>
                        <p><strong>Location:</strong> {ticket.location}</p>
                    </div>
                </div>

                <h4 className="font-semibold mt-4 mb-2">Event Reviews:</h4>
                {ticket.reviews.length > 0 ? (
                    <ul className="space-y-2">
                        {ticket.reviews.map(review => (
                            <li key={review.id} className="border-b pb-2">
                                <p>Rating: {review.rating}/5</p>
                                <p>{review.review}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews yet</p>
                )}

                {/* {currentUser && !hasUserReviewed && ( */}
                <Button variant="outline" onClick={() => setIsOpen(true)} className="mt-4">
                    Leave a Review
                </Button>
                {/* )} */}

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Review for {ticket.name}</DialogTitle>
                            <DialogDescription>
                                Share your thoughts about this event
                            </DialogDescription>
                        </DialogHeader>
                        <ReviewForm ticket={ticket} onSubmit={() => setIsOpen(false)} />
                    </DialogContent>
                </Dialog>
            </li>
        );
    };

    if (!isAuthenticated) {
        return <div className="container mx-auto p-4">Please log in to view your tickets.</div>;
    }

    if (isLoading) return <div className="container mx-auto p-4">Loading your tickets...</div>;
    if (error) return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Completed Tickets</h2>
            {completedTickets.length === 0 ? (
                <p>No completed tickets found.</p>
            ) : (
                <ul>
                    {completedTickets.map(ticket => (
                        <TicketItem key={ticket.id} ticket={ticket} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TicketsPage;
