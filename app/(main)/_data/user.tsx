export interface UserProps {
    id: number;
    created_at: string;
    deleted_at: string | null;
    email: string;
    name: string;
    password: string;
    phone: string;
    picture: string;
    updated_at: string;
    is_organizer: boolean;
    points: number;
    referral_code: string;
    username: string;
}

export const users: UserProps[] = [
    {
        id: 1,
        created_at: "2024-07-06T10:00:00Z",
        deleted_at: null,
        email: "user1@example.com",
        name: "Alice Smith",
        password: "password123",
        phone: "123-456-7891",
        picture: "alice_smith.jpg",
        updated_at: "2024-07-06T10:00:00Z",
        is_organizer: true,
        points: 100,
        referral_code: "REF001",
        username: "alice_smith"
    },
    {
        id: 2,
        created_at: "2024-07-06T11:00:00Z",
        deleted_at: null,
        email: "user2@example.com",
        name: "Bob Johnson",
        password: "password123",
        phone: "123-456-7892",
        picture: "bob_johnson.jpg",
        updated_at: "2024-07-06T11:00:00Z",
        is_organizer: false,
        points: 200,
        referral_code: "REF002",
        username: "bob_johnson"
    },
    {
        id: 3,
        created_at: "2024-07-06T12:00:00Z",
        deleted_at: null,
        email: "user3@example.com",
        name: "Charlie Brown",
        password: "password123",
        phone: "123-456-7893",
        picture: "charlie_brown.jpg",
        updated_at: "2024-07-06T12:00:00Z",
        is_organizer: true,
        points: 300,
        referral_code: "REF003",
        username: "charlie_brown"
    },
    {
        id: 4,
        created_at: "2024-07-06T13:00:00Z",
        deleted_at: null,
        email: "user4@example.com",
        name: "Diana Prince",
        password: "password123",
        phone: "123-456-7894",
        picture: "diana_prince.jpg",
        updated_at: "2024-07-06T13:00:00Z",
        is_organizer: false,
        points: 400,
        referral_code: "REF004",
        username: "diana_prince"
    },
    {
        id: 5,
        created_at: "2024-07-06T14:00:00Z",
        deleted_at: null,
        email: "user5@example.com",
        name: "Edward Norton",
        password: "password123",
        phone: "123-456-7895",
        picture: "edward_norton.jpg",
        updated_at: "2024-07-06T14:00:00Z",
        is_organizer: true,
        points: 500,
        referral_code: "REF005",
        username: "edward_norton"
    },
    {
        id: 6,
        created_at: "2024-07-06T15:00:00Z",
        deleted_at: null,
        email: "user6@example.com",
        name: "Fiona Gallagher",
        password: "password123",
        phone: "123-456-7896",
        picture: "fiona_gallagher.jpg",
        updated_at: "2024-07-06T15:00:00Z",
        is_organizer: false,
        points: 600,
        referral_code: "REF006",
        username: "fiona_gallagher"
    },
    {
        id: 7,
        created_at: "2024-07-06T16:00:00Z",
        deleted_at: null,
        email: "user7@example.com",
        name: "George Clooney",
        password: "password123",
        phone: "123-456-7897",
        picture: "george_clooney.jpg",
        updated_at: "2024-07-06T16:00:00Z",
        is_organizer: true,
        points: 700,
        referral_code: "REF007",
        username: "george_clooney"
    },
    {
        id: 8,
        created_at: "2024-07-06T17:00:00Z",
        deleted_at: null,
        email: "user8@example.com",
        name: "Hannah Baker",
        password: "password123",
        phone: "123-456-7898",
        picture: "hannah_baker.jpg",
        updated_at: "2024-07-06T17:00:00Z",
        is_organizer: false,
        points: 800,
        referral_code: "REF008",
        username: "hannah_baker"
    },
    {
        id: 9,
        created_at: "2024-07-06T18:00:00Z",
        deleted_at: null,
        email: "user9@example.com",
        name: "Isaac Newton",
        password: "password123",
        phone: "123-456-7899",
        picture: "isaac_newton.jpg",
        updated_at: "2024-07-06T18:00:00Z",
        is_organizer: true,
        points: 900,
        referral_code: "REF009",
        username: "isaac_newton"
    },
    {
        id: 10,
        created_at: "2024-07-06T19:00:00Z",
        deleted_at: null,
        email: "user10@example.com",
        name: "Jessica Jones",
        password: "password123",
        phone: "123-456-7800",
        picture: "jessica_jones.jpg",
        updated_at: "2024-07-06T19:00:00Z",
        is_organizer: false,
        points: 1000,
        referral_code: "REF010",
        username: "jessica_jones"
    },
    {
        id: 11,
        created_at: "2024-07-06T20:00:00Z",
        deleted_at: null,
        email: "user11@example.com",
        name: "Kevin Hart",
        password: "password123",
        phone: "123-456-7801",
        picture: "kevin_hart.jpg",
        updated_at: "2024-07-06T20:00:00Z",
        is_organizer: true,
        points: 1100,
        referral_code: "REF011",
        username: "kevin_hart"
    },
]