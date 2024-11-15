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
