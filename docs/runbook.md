# Employee Salary Management System - Runbook

## Prerequisites

Required Software:

* Node.js 22+
* npm 10+
* Git

---

## Backend Setup

Navigate to backend:

cd backend

Install dependencies:

npm install

---

## Database Setup

Generate Prisma client:

npx prisma generate

Run migrations:

npx prisma migrate dev

---

## Seed Database

Populate sample employees and salary data:

npm run seed

If no script exists:

npx ts-node prisma/seed.ts

Expected outcome:

* 10,000 sample employees
* Salary records
* Analytics data

---

## Start Backend

npm run dev

Expected:

Server running on port 3001

---

## Run Backend Tests

npm test

Expected:

All tests passing

---

## Frontend Setup

Navigate to frontend:

cd frontend

Install dependencies:

npm install

---

## Start Frontend

npm run dev

Expected:

Frontend available at:

http://localhost:5173

---

## Login Credentials

Admin User

Email:

[admin@acme.com](mailto:admin@acme.com)

Password:

Admin@123

---

## Common Issues

### Prisma Client Out Of Date

Run:

npx prisma generate

---

### Migration Errors

Reset database:

npx prisma migrate reset

Then:

npx prisma migrate dev

---

### Port Already In Use

Backend:

3001

Frontend:

5173

Stop conflicting processes or change ports.

---

## Application Verification

Verify:

* Login works
* Dashboard loads
* Employee search works
* Pagination works
* Salary updates work
* Salary history loads
* Analytics endpoints respond successfully
