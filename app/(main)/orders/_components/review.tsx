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
'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/services/apiClient';
import { getToken } from '@/utils/auth';

interface Review {
    id: number;
    eventId: number;
    rating: number;
    review: string;
    createdAt: number;
    updatedAt: number;
    userId: number | null;
}

interface Organizer {
    id: number;
    name: string;
    username: string;
}

interface Ticket {
    id: number;
    organizerId: number | null;
    name: string;
    description: string;
    location: string;
    date: string;
    time: string;
    image: string;
    isFreeEvent: boolean;
    eventCategoriesId: number;
    category: string;
    organizer: Organizer;
    reviews: Review[];
}

const TicketsPage: React.FC = () => {
    const [upcomingTickets, setUpcomingTickets] = useState<Ticket[]>([]);
    const [completedTickets, setCompletedTickets] = useState<Ticket[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchTickets = async () => {
            if (!isAuthenticated) {
                setError('User is not authenticated');
                setIsLoading(false);
                return;
            }

            const token = getToken();
            if (!token) {
                setError('No token found');
                setIsLoading(false);
                return;
            }

            try {
                const response = await apiClient.get('/purchased-tickets?filter=upcoming', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const tickets: Ticket[] = response.data;

                const currentDate = new Date();
                const upcoming = tickets.filter(ticket => new Date(`${ticket.date}T${ticket.time}`) > currentDate);
                const completed = tickets.filter(ticket => new Date(`${ticket.date}T${ticket.time}`) <= currentDate);

                setUpcomingTickets(upcoming);
                setCompletedTickets(completed);
            } catch (err) {
                setError('Failed to fetch tickets');
                console.error('Error fetching tickets:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTickets();
    }, [isAuthenticated]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const TicketItem: React.FC<{ ticket: Ticket }> = ({ ticket }) => (
        <li key={ticket.id} className="mb-4 p-4 border rounded shadow-sm">
            <h3 className="text-xl font-semibold">{ticket.name}</h3>
            <p>{ticket.description}</p>
            <p><strong>Location:</strong> {ticket.location}</p>
            <p><strong>Date:</strong> {ticket.date} at {ticket.time}</p>
            <p><strong>Category:</strong> {ticket.category}</p>
            <p><strong>Organizer:</strong> {ticket.organizer.name} (@{ticket.organizer.username})</p>
            <p><strong>{ticket.isFreeEvent ? 'Free Event' : 'Paid Event'}</strong></p>
            {ticket.reviews.length > 0 && (
                <div>
                    <h4 className="font-semibold mt-2">Reviews:</h4>
                    <ul>
                        {ticket.reviews.map(review => (
                            <li key={review.id}>
                                Rating: {review.rating}/5 - {review.review}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Upcoming Tickets</h2>
                {upcomingTickets.length === 0 ? (
                    <p>No upcoming tickets</p>
                ) : (
                    <ul>
                        {upcomingTickets.map(ticket => (
                            <TicketItem key={ticket.id} ticket={ticket} />
                        ))}
                    </ul>
                )}
            </section>
            {/* <section>
                <h2 className="text-2xl font-semibold mb-4">Completed Tickets</h2>
                {completedTickets.length === 0 ? (
                    <p>No completed tickets</p>
                ) : (
                    <ul>
                        {completedTickets.map(ticket => (
                            <TicketItem key={ticket.id} ticket={ticket} />
                        ))}
                    </ul>
                )}
            </section> */}
        </div>
    );
};

export default TicketsPage;