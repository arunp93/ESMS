# Architecture Document

# Employee Salary Management System (ESMS)

## 1. Overview

The Employee Salary Management System (ESMS) is a web-based platform designed to manage employee information, salary data, salary revisions, and payroll analytics.

The system currently supports approximately 10,000 employee records and demonstrates production-oriented backend engineering practices including authentication, authorization, validation, testing, and scalable API design.

Key capabilities:

* Employee management
* Salary management
* Salary history tracking
* Payroll analytics
* Search and pagination
* Role-based access control

---

# 2. Architecture Principles

The system was designed using the following principles:

* Simplicity over unnecessary complexity
* Clear separation of concerns
* Maintainability
* Scalability
* Security by default
* Testability

A modular monolith architecture was selected because it minimizes operational overhead while supporting future growth.

---

# 3. High-Level Architecture

```text
+----------------------+
| React Frontend       |
| Material UI          |
+----------+-----------+
           |
           v
+----------------------+
| Express API          |
| JWT Authentication   |
+----------+-----------+
           |
           v
+----------------------+
| Controllers          |
+----------+-----------+
           |
           v
+----------------------+
| Services             |
| Business Logic       |
+----------+-----------+
           |
           v
+----------------------+
| Prisma ORM           |
+----------+-----------+
           |
           v
+----------------------+
| SQLite Database      |
+----------------------+
```

---

# 4. Backend Architecture

The backend follows a layered architecture.

## Routes Layer

Responsibilities:

* Define API endpoints
* Apply middleware
* Enforce authentication and authorization

Examples:

* /auth
* /employees
* /analytics

---

## Controller Layer

Responsibilities:

* Receive HTTP requests
* Validate request data
* Delegate work to services
* Return responses

Controllers remain thin and contain minimal business logic.

---

## Service Layer

Responsibilities:

* Implement business rules
* Coordinate database operations
* Handle salary updates
* Generate analytics

Examples:

* AuthService
* EmployeeService
* SalaryService
* AnalyticsService

---

## Data Access Layer

Prisma ORM is used to interact with the database.

Benefits:

* Type safety
* Migration support
* Query abstraction
* Reduced boilerplate

---

# 5. Frontend Architecture

The frontend is built using React and Material UI.

## Pages

* Login Page
* Dashboard Page
* Employee List Page
* Employee Details Page

---

## API Layer

Axios is used for:

* API communication
* Authorization header injection
* Request handling

---

## Routing

React Router is used for:

* Login route
* Dashboard route
* Employee routes
* Protected routes

---

# 6. Database Design

## Employee

Stores employee information.

Fields:

* id
* employeeCode
* firstName
* lastName
* email
* department
* designation
* status

---

## Salary

Stores the current salary of an employee.

Fields:

* id
* employeeId
* baseSalary
* bonus
* effectiveDate

---

## SalaryHistory

Stores historical salary changes.

Fields:

* id
* employeeId
* oldBaseSalary
* newBaseSalary
* oldBonus
* newBonus
* effectiveDate
* createdAt

---

# 7. Scalability Strategy

The application currently supports approximately 10,000 employee records.

## Pagination

Employee listing APIs use server-side pagination.

Example:

```http
GET /employees?page=1&limit=20
```

Benefits:

* Smaller payloads
* Faster responses
* Better scalability

---

## Search

Employee search is performed on the backend.

Benefits:

* Reduced frontend processing
* Reduced network traffic
* Better performance with large datasets

---

## Database Query Optimization

Analytics and filtering operations are performed in the database layer instead of loading large datasets into application memory.

---

# 8. Security

## Authentication

JWT-based authentication is used.

Protected endpoints require:

```http
Authorization: Bearer <token>
```

---

## Authorization

Role-Based Access Control (RBAC) is implemented.

Roles:

* ADMIN
* HR

Authorization checks are performed using middleware.

---

## Password Security

Passwords are stored using bcrypt hashing.

Plaintext passwords are never stored.

---

## Input Validation

Zod is used for request validation.

Validation includes:

* Required fields
* Email validation
* Salary constraints
* Request payload validation

---

## Security Middleware

Helmet:

* Secure HTTP headers

Rate Limiting:

* Protection against abuse and brute-force attempts

CORS:

* Restricts access to approved frontend origins

---

## SQL Injection Protection

Prisma ORM uses parameterized queries, significantly reducing SQL injection risks.

---

# 9. Reliability

## Salary History Tracking

Every salary update creates a historical record.

Tracked information:

* Previous salary
* Updated salary
* Previous bonus
* Updated bonus
* Effective date

This provides a complete audit trail of compensation changes.

---

## Error Handling

Centralized error handling middleware provides:

* Consistent API responses
* Error classification
* Improved maintainability

---

# 10. Performance Optimizations

## ETag Support

ETags are enabled to reduce unnecessary data transfers and support browser-side caching.

---

## Pagination

Large employee datasets are loaded incrementally instead of returning all records in a single request.

---

## Server-Side Filtering

Search operations are executed in the backend rather than the frontend.

---

# 11. Testing Strategy

Testing is implemented using:

* Jest
* Supertest

Covered areas include:

* Service layer unit tests
* Middleware tests
* Authentication tests
* Employee functionality
* Salary functionality
* Analytics functionality

---

# 12. Tradeoffs

## Why Modular Monolith Instead of Microservices?

For an application of this size, microservices would introduce unnecessary complexity.

Benefits of the chosen approach:

* Faster development
* Easier debugging
* Simpler deployment
* Lower operational cost

---

## Why SQLite?

SQLite was selected for the assessment because it:

* Requires minimal setup
* Supports rapid development
* Works well for demonstration purposes

A production deployment could migrate to PostgreSQL with minimal architectural changes.

---

# 13. Future Enhancements

Potential future improvements:

* PostgreSQL migration
* Redis caching
* Refresh token support
* Audit event streaming
* Docker containerization
* CI/CD pipelines
* Background job processing
* Multi-country payroll support
* Payslip generation
* Employee self-service portal
* Advanced reporting and forecasting
