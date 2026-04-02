# Finance Data Processing and Access Control Dashboard

## Login Credentials (Important)

Use these demo accounts to log in immediately after seeding:

| Role | Email | Password |
|---|---|---|
| Admin | admin@financeapp.com | Admin@12345 |
| Analyst | analyst@financeapp.com | Analyst@12345 |
| Viewer | viewer@financeapp.com | Viewer@12345 |

Note:

- Use Admin Login mode for the Admin account.
- Use User/Analyst Login mode for Analyst and Viewer accounts.

Full-stack MERN-style monorepo for finance record management, role-based access control, and dashboard analytics.

This project was built to demonstrate:

- clean backend architecture (controllers, services, models, routes, middleware)
- reliable RBAC enforcement for Viewer, Analyst, and Admin
- real data persistence using MongoDB + Mongoose
- dashboard analytics with MongoDB aggregation pipelines
- modern frontend dashboard with React + Tailwind CSS

## Table of Contents

- Overview
- Tech Stack
- Monorepo Structure
- Core Features
- Role and Permission Matrix
- Data Models
- API Reference
- Dashboard Analytics Logic
- Environment Variables
- Setup and Run Guide
- Seed Data
- Sample Workflow
- Error Handling and Validation
- Assumptions and Trade-offs
- Future Improvements

## Overview

The system supports:

- user onboarding and login using JWT
- role-based capabilities for financial operations
- creation and management of financial records (income and expenses)
- filtered and paginated record listing
- dashboard insights (totals, trends, category split, recent activity)

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- Joi for validation
- bcryptjs for password hashing

### Frontend

- React (Vite)
- Tailwind CSS
- Axios
- React Router
- Chart.js + react-chartjs-2
- react-hot-toast

## Monorepo Structure

```text
finance-project/
	backend/
		src/
			config/
			controllers/
			middleware/
			models/
			routes/
			scripts/
			services/
			utils/
			validators/
			app.js
			server.js
		.env.example
		package.json

	frontend/
		src/
			api/
			components/
			context/
			pages/
			App.jsx
			main.jsx
		.env.example
		package.json

	package.json
	README.md
```

## Core Features

### User and Role Management

- register and login
- user profile retrieval (`/users/me`)
- admin-only user listing
- admin-only role/status update
- account status support (`active` / `inactive`)

### Financial Records

- create, read, update, delete financial records
- fields: amount, type, category, date, notes, createdBy
- filter by type, category, start date, end date
- pagination and sorting

### Dashboard Analytics

- total income
- total expenses
- net balance
- category-wise totals
- recent transactions (last 5)
- monthly trends (income vs expense)

## Role and Permission Matrix

| Feature | Viewer | Analyst | Admin |
|---|---|---|---|
| Login | Yes | Yes | Yes |
| View dashboard summary | Yes | Yes | Yes |
| View records list | No | Yes | Yes |
| Create record | No | No | Yes |
| Update/Delete record | No | No | Yes |
| List users | No | No | Yes |
| Update user role/status | No | No | Yes |

## Data Models

### User

- name: String
- email: String (unique)
- password: String (hashed)
- role: Viewer | Analyst | Admin
- status: active | inactive
- timestamps

### Record

- amount: Number
- type: income | expense
- category: String
- date: Date
- notes: String
- createdBy: ObjectId (User)
- timestamps

## API Reference

Base URL:

`http://localhost:5000/api`

Auth header for protected endpoints:

`Authorization: Bearer <token>`

### Auth

- `POST /auth/register`
- `POST /auth/login`

Example login request:

```json
{
	"email": "admin@financeapp.com",
	"password": "Admin@12345"
}
```

### Users

- `GET /users/me` (Authenticated)
- `GET /users` (Admin)
- `PATCH /users/:id` (Admin)

Example update user request:

```json
{
	"role": "Analyst",
	"status": "active"
}
```

### Records

- `GET /records` (Analyst, Admin)
- `POST /records` (Admin)
- `PUT /records/:id` (Admin)
- `DELETE /records/:id` (Admin)

Query params for `GET /records`:

- `type`: income | expense
- `category`: string
- `startDate`: ISO date
- `endDate`: ISO date
- `page`: number
- `limit`: number
- `sort`: latest | oldest | amountAsc | amountDesc

Example create record request:

```json
{
	"amount": 2500,
	"type": "income",
	"category": "Salary",
	"date": "2026-04-01",
	"notes": "April salary"
}
```

### Dashboard

- `GET /dashboard/summary` (Authenticated)

Returns:

- totalIncome
- totalExpenses
- netBalance
- categoryTotals
- monthlyTrends
- recentTransactions

## Dashboard Analytics Logic

Dashboard service uses MongoDB aggregation pipelines to compute summary metrics and trends.

Main operators used:

- `$group`
- `$project`
- `$sort`
- `$cond`
- date operators (`$year`, `$month`)

Recent transactions are fetched separately with sorting and limit.

## Environment Variables

### Backend (`backend/.env`)

- `NODE_ENV`
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CLIENT_URL`

### Frontend (`frontend/.env`)

- `VITE_API_URL` (example: `http://localhost:5000/api`)

## Setup and Run Guide

### Prerequisites

- Node.js 18+
- npm
- MongoDB (local or Atlas)

### 1. Install dependencies

From repository root:

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 2. Configure environment files

- copy `backend/.env.example` to `backend/.env`
- copy `frontend/.env.example` to `frontend/.env`

### 3. Seed demo users

```bash
npm run seed --prefix backend
```

### 4. Start backend

```bash
npm run dev --prefix backend
```

### 5. Start frontend

```bash
npm run dev --prefix frontend
```

Frontend runs on a Vite port (commonly 5173, or next available port).

## Seed Data

The seed script upserts three demo users:

- Admin: `admin@financeapp.com` / `Admin@12345`
- Analyst: `analyst@financeapp.com` / `Analyst@12345`
- Viewer: `viewer@financeapp.com` / `Viewer@12345`

Script location:

`backend/src/scripts/seedAdmin.js`

## Sample Workflow

1. Login as Admin
2. Create records
3. Verify dashboard cards/charts update
4. Go to user management and update a user role
5. Login as Analyst and verify read-only record access
6. Login as Viewer and verify dashboard-only access

## Error Handling and Validation

- Joi schema validation for request body/query
- centralized error middleware for consistent API errors
- proper HTTP status usage (`400`, `401`, `403`, `404`, `500`)
- duplicate key and validation errors normalized

## Assumptions and Trade-offs

- Records are globally readable by Analyst/Admin, not user-scoped by owner.
- Dashboard summary endpoint is available to any authenticated user.
- Admin-only write access for records is intentional per assignment scope.
- Seed script is designed for local/demo use and resets demo user credentials on each run.

## Future Improvements

- add unit/integration tests (auth, role checks, records flow)
- add Swagger/OpenAPI documentation
- add refresh token flow for improved auth UX
- add soft delete and audit logs for records
- add rate limiting and request tracing