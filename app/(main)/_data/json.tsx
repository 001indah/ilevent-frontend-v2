export const json =
{
    "users": [
        {
            "id": 1,
            "created_at": "2024-07-06T10:00:00Z",
            "deleted_at": null,
            "email": "john.doe@example.com",
            "name": "John Doe",
            "password": "password123",
            "phone": "123-456-7890",
            "picture": "john_doe.jpg",
            "updated_at": "2024-07-06T10:00:00Z",
            "is_organizer": true,
            "points": 100,
            "referral_code": "REF123",
            "username": "johndoe"
        }
    ],
    "events": [
        {
            "id": 1,
            "created_at": "2024-07-06T10:00:00Z",
            "date": "2024-08-01",
            "description": "A fun music concert.",
            "is_free_event": false,
            "location": "Central Park",
            "name": "Summer Music Fest",
            "time": "18:00",
            "updated_at": "2024-07-06T10:00:00Z",
            "organizer_id": 1,
            "image": "concert.jpg",
            "deleted_at": null
        }
    ],
    "tickets": [
        {
            "id": 1,
            "event_id": 1,
            "name": "VIP",
            "available_seats": 50,
            "price_before_discount": 150.00,
            "created_at": "2024-07-06T10:00:00Z",
            "updated_at": "2024-07-06T10:00:00Z",
            "deleted_at": null
        }
    ],
    "price": [
        {
            "id": 1,
            "price_before_discount": 150.00,
            "ticket_discount": 20.00,
            "type_ticket_id": 1,
            "created_at": "2024-07-06T10:00:00Z",
            "updated_at": "2024-07-06T10:00:00Z",
            "deleted_at": null
        }
    ],
    "promo": [
        {
            "id": 1,
            "ticket_id": 1,
            "promo_value_discount": 10.00,
            "start": "2024-07-01",
            "end": "2024-07-31",
            "created_at": "2024-07-06T10:00:00Z",
            "updated_at": "2024-07-06T10:00:00Z",
            "deleted_at": null
        }
    ],
    "transactions": [
        {
            "id": 1,
            "user_id": 1,
            "event_id": 1,
            "transaction_date": "2024-07-06T10:00:00Z",
            "amount": 120.00,
            "payment_status": "completed",
            "promo_id": 1,
            "point_id": 1,
            "created_at": "2024-07-06T10:00:00Z",
            "updated_at": "2024-07-06T10:00:00Z",
            "deleted_at": null
        }
    ],
    "voucher_apply": [
        {
            "id": 1,
            "transaction_id": 1,
            "created_at": "2024-07-06T10:00:00Z",
            "updated_at": "2024-07-06T10:00:00Z",
            "deleted_at": null
        }
    ],
    "voucher": [
        {
            "id": 1,
            "event_id": 1,
            "discount_code": "SUMMER2024",
            "discount_percentage": 15,
            "max_uses": 100,
            "used": 10,
            "expires_at": "2024-07-31",
            "created_at": "2024-07-06T10:00:00Z",
            "updated_at": "2024-07-06T10:00:00Z",
            "deleted_at": null,
            "user_id": 1
        }
    ],
    "points_history": [
        {
            "id": 1,
            "user_id": 1,
            "points": 100,
            "type": "earned",
            "created_at": "2024-07-06T10:00:00Z",
            "updated_at": "2024-07-06T10:00:00Z"
        }
    ],
    "referral": [
        {
            "id": 1,
            "user_id": 1,
            "referred_user_id": 2,
            "points": 50,
            "created_at": "2024-07-06T10:00:00Z",
            "expires_at": "2024-08-01",
            "updated_at": "2024-07-06T10:00:00Z",
            "deleted_at": null
        }
    ],
    "reviews": [
        {
            "id": 1,
            "event_id": 1,
            "rating": 5,
            "review": "Amazing event!",
            "created_at": "2024-07-06T10:00:00Z",
            "updated_at": "2024-07-06T10:00:00Z"
        }
    ],
    "event_categories": [
        {
            "id": 1,
            "event_id": 1,
            "category": "Music",
            "created_at": "2024-07-06T10:00:00Z",
            "updated_at": "2024-07-06T10:00:00Z",
            "deleted_at": null
        }
    ],
    "report": [
        {
            "id": 1,
            "ticket_id": 1,
            "attendence": 50,
            "total_revenue": 5000.00,
            "report_date": "2024-07-07",
            "created_at": "2024-07-07T10:00:00Z",
            "updated_at": "2024-07-07T10:00:00Z",
            "deleted_at": null
        }
    ]
}
