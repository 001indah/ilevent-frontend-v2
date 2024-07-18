import apiClient from '@/services/apiClient';
import { useAuth } from '@/context/AuthContext';
import { getToken } from '@/utils/auth';

export const useTickets = () => {
  const { isAuthenticated } = useAuth();

  const fetchTickets = async () => {
    if (!isAuthenticated) {
      console.error('User is not authenticated');
      return { upcomingTickets: [], completedTickets: [] };
    }

    const token = getToken();
    if (!token) {
      console.error('No token found');
      return { upcomingTickets: [], completedTickets: [] };
    }

    try {
      const response = await apiClient.get('/api/v1/purchased-tickets?filter=upcoming&filter=completed', {
        headers: {
          Authorization: `Bearer ${token}`, // Explicitly send the token in the Authorization header
        },
      });
      const data = response.data;

      const currentDate = new Date();
      const upcomingTickets = data.filter(ticket => new Date(ticket.date) > currentDate);
      const completedTickets = data.filter(ticket => new Date(ticket.date) <= currentDate);

      return { upcomingTickets, completedTickets };
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw error;
    }
  };

  return { fetchTickets };
};
