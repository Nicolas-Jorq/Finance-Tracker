# Finance-Tracker

Application to help me better manage my finances

## Overview

This is a simple expense tracking application built with Express.js that demonstrates progressive enhancement from an in-memory solution to a database-backed application.

## Project Structure

```
finance-tracker/
├── app.js                 # Level 1: Simple in-memory version
├── src/
│   └── server.js          # Level 2: Database-backed version
├── prisma/
│   └── schema.prisma      # Database schema definition
├── package.json
├── .env.example           # Example environment variables
└── README.md
```

## Level 1: Simple In-Memory Version

The simplest possible implementation using an in-memory array.

### Features
- Add expenses via POST request
- Retrieve all expenses via GET request
- No persistence (data lost on restart)

### Running Level 1
```bash
npm install
node app.js
```

### Testing Level 1
```bash
# Add an expense
curl -X POST http://localhost:3000/expenses \
  -H "Content-Type: application/json" \
  -d '{"amount": 25.50, "description": "Grocery shopping"}'

# Get all expenses
curl http://localhost:3000/expenses
```

### Limitations
- Data is lost on restart
- No users (anyone can see all expenses)
- No validation
- No categories

## Level 2: Database-Backed Version

Enhanced version with PostgreSQL and Prisma ORM for data persistence.

### Features
- Persistent data storage using PostgreSQL
- Type-safe database queries with Prisma
- Automatic timestamps
- Proper error handling
- Data survives server restarts

### Prerequisites
- PostgreSQL database (local or cloud-hosted)
- Node.js 14+

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update the `DATABASE_URL` in `.env` with your PostgreSQL connection string:
```
DATABASE_URL="postgresql://username:password@localhost:5432/finance_tracker?schema=public"
```

4. Run database migrations:
```bash
npm run db:migrate
```

### Running Level 2
```bash
npm start
# or for development with auto-reload
npm run dev
```

### Testing Level 2
```bash
# Add an expense
curl -X POST http://localhost:3000/expenses \
  -H "Content-Type: application/json" \
  -d '{"amount": 50.00, "description": "Gas"}'

# Get all expenses
curl http://localhost:3000/expenses
```

### Database Management

View and edit your database using Prisma Studio:
```bash
npm run db:studio
```

## API Endpoints

### POST /expenses
Add a new expense

**Request Body:**
```json
{
  "amount": 25.50,
  "description": "Grocery shopping"
}
```

**Response:**
```json
{
  "id": "clxxx...",
  "amount": 25.50,
  "description": "Grocery shopping",
  "date": "2025-12-15T23:20:21.024Z",
  "createdAt": "2025-12-15T23:20:21.024Z"
}
```

### GET /expenses
Retrieve all expenses (ordered by date, most recent first)

**Response:**
```json
[
  {
    "id": "clxxx...",
    "amount": 25.50,
    "description": "Grocery shopping",
    "date": "2025-12-15T23:20:21.024Z",
    "createdAt": "2025-12-15T23:20:21.024Z"
  }
]
```

## What's Next?

This application can be extended with:
- User authentication
- Expense categories
- Budget tracking
- Data validation
- Frontend UI
- Analytics and reporting
- Multi-currency support
