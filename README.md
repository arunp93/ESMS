# Employee Salary Management System

## Overview

Employee Salary Management System (ESMS) is a full-stack application for managing employees, salaries, salary history, and payroll analytics.

The application demonstrates modern backend engineering practices including authentication, authorization, validation, testing, and scalable API design.

---

## Features

### Authentication

* JWT Authentication
* Protected Routes
* Role-Based Access Control

### Employee Management

* Employee Listing
* Employee Search
* Employee Details
* Pagination

### Salary Management

* Salary Updates
* Salary History Tracking
* Salary Change Auditing

### Analytics

* Total Employees
* Total Payroll
* Average Salary
* Highest Paid Employees
* Department Breakdown

### Security

* Helmet
* Rate Limiting
* JWT Protection
* Request Validation
* CORS Configuration

### Performance

* Pagination
* Server-Side Search
* ETag Support

---

## Technology Stack

### Backend

* Node.js
* Express
* TypeScript
* Prisma
* SQLite
* Jest
* Supertest
* Zod

### Frontend

* React
* TypeScript
* Material UI
* Axios
* React Router

---

## Project Structure

backend/

* controllers
* middleware
* routes
* services
* validators
* tests

frontend/

* pages
* routes
* api

---

## Setup

### Backend

cd backend

npm install

npx prisma generate

npx prisma migrate dev

npm run seed

npm run dev

---

### Frontend

cd frontend

npm install

npm run dev

---

## Testing

Run backend tests:

npm test

---

## Demo Credentials

Email:

[admin@acme.com](mailto:admin@acme.com)

Password:

Admin@123

---

## API Highlights

Authentication

* POST /auth/login

Employees

* GET /employees
* GET /employees/:id

Salary

* PUT /employees/:id/salary
* GET /employees/:id/salary-history

Analytics

* GET /analytics/payroll-summary
* GET /analytics/highest-paid-employees
* GET /analytics/department-breakdown

---

## Future Enhancements

* Refresh Tokens
* Redis Caching
* Docker Support
* Kubernetes Deployment
* Audit Logging
* CI/CD Pipelines
