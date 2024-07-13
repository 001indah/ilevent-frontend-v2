// export const config = {
//     PROD_URL: process.env.NEXT_PUBLIC_PRODUCTIONS_URL,
//     BASE_URL: process.env.NEXT_PUBLIC_DEV_URL,
//     endpoints: {
//         getAllEvents: "/events",
//         getCategoryEvent: "/category",
//         filteredEventByCategory: "/events/filter",
//         searchByTitle: "/events/search",
//         getEventById: "/events/",
//         getProfile: "/users/profile",
//         createUser: "/users/register",
//         login: "/auth/login",
//         createEvent: "/events", // POST untuk membuat event baru
//         updateEvent: "/events/", // PUT untuk memperbarui event berdasarkan ID
//         deleteEvent: "/events/", // DELETE untuk menghapus event berdasarkan ID
//         bookEvent: "/events/book", // POST untuk melakukan booking event
//         cancelBooking: "/events/cancel-booking", // DELETE untuk membatalkan booking event
//         getTickets: "/events/tickets", // GET untuk mendapatkan tiket-tiket yang tersedia
//         getTicketById: "/events/tickets/", // GET untuk mendapatkan informasi tiket berdasarkan ID
//         createTicket: "/events/tickets", // POST untuk membuat tiket baru
//         updateTicket: "/events/tickets/", // PUT untuk memperbarui informasi tiket berdasarkan ID
//         deleteTicket: "/events/tickets/", // DELETE untuk menghapus tiket berdasarkan ID
//         dashboardData: "/dashboard", // GET untuk mendapatkan data dashboard
//     },
// };

export const config = {
    PROD_URL: process.env.NEXT_PUBLIC_PRODUCTIONS_URL,
    BASE_URL: process.env.NEXT_PUBLIC_DEV_URL,
    endpoints: {
        getAllEvents: "/events",
        getCategoryEvent: "/category",
        filteredEventByCategory: "/events/filter",
        searchByTitle: "/events/search",
        getEventById: "/events/",
        getProfile: "/users/profile",
        createUser: "/users/register",
        login: "/auth/login",
        createEvent: "/events", // POST untuk membuat event baru
        updateEvent: "/events/", // PUT untuk memperbarui event berdasarkan ID
        deleteEvent: "/events/", // DELETE untuk menghapus event berdasarkan ID
        bookEvent: "/events/book", // POST untuk melakukan booking event
        cancelBooking: "/events/cancel-booking", // DELETE untuk membatalkan booking event
        getTickets: "/events/tickets", // GET untuk mendapatkan tiket-tiket yang tersedia
        getTicketById: "/events/tickets/", // GET untuk mendapatkan informasi tiket berdasarkan ID
        createTicket: "/events/tickets", // POST untuk membuat tiket baru
        updateTicket: "/events/tickets/", // PUT untuk memperbarui informasi tiket berdasarkan ID
        deleteTicket: "/events/tickets/", // DELETE untuk menghapus tiket berdasarkan ID
        dashboardData: "/dashboard", // GET untuk mendapatkan data dashboard
    },
};
