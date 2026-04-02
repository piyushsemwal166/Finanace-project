# Backend API

## Run

1. Copy `.env.example` to `.env`
2. Install dependencies
3. Start MongoDB
4. Run `npm run dev`

## Main endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users` (Admin)
- `PATCH /api/users/:id` (Admin)
- `GET /api/records` (Analyst, Admin)
- `POST /api/records` (Admin)
- `PUT /api/records/:id` (Admin)
- `DELETE /api/records/:id` (Admin)
- `GET /api/dashboard/summary` (Authenticated)