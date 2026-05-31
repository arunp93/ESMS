# Architecture Document

## Employee Salary Management System (ESMS)

## 1. Overview

The Employee Salary Management System (ESMS) is a web-based platform designed to help HR Managers manage employee compensation data for approximately 10,000 employees.

The system provides:

* Employee management
* Salary management
* Salary revision tracking
* Payroll analytics
* Compensation insights

The MVP supports a single-country payroll model while keeping the architecture extensible for future multi-country support.

---

# 2. Architecture Principles

The system is designed with the following principles:

* Simplicity over unnecessary complexity
* Modular and maintainable codebase
* Scalability for future growth
* Production-ready security practices
* Clear separation of concerns
* Testability

A modular monolith architecture is chosen for the MVP because it minimizes operational complexity while supporting future scaling requirements.

---

# 3. High-Level Architecture

```text
                   Internet
                       |
                       v
             Reverse Proxy / Load Balancer
                       |
                       v
                 React Frontend
                       |
                       v
                  Express API
                       |
       +---------------+---------------+
       |               |               |
       v               v               v
 Employee      Salary Management   Analytics
  Module             Module         Module
       |               |               |
       +---------------+---------------+
                       |
                       v
                   Database

               +---------------+
               | Redis Cache   |
               +---------------+

               +---------------+
               | Queue Worker  |
               +---------------+
```

---

# 4. Backend Architecture

The backend follows a layered architecture.

## Controller Layer

Responsibilities:

* Handle HTTP requests
* Request validation
* Response formatting

## Service Layer

Responsibilities:

* Business rules
* Salary revision processing
* Analytics calculations

## Repository Layer

Responsibilities:

* Database interactions
* Query abstraction

Benefits:

* Better maintainability
* Easier testing
* Clear separation of concerns

---

# 5. Frontend Architecture

The frontend is built using React.

## Pages

* Dashboard
* Employee List
* Employee Details
* Salary Management
* Analytics

## Components

Reusable UI components:

* Data Tables
* Search Filters
* Dashboard Cards
* Charts
* Forms

## State Management

React Query is used for:

* API data fetching
* Caching
* Request deduplication
* Background refresh

---

# 6. Database Design

## Employee

Stores employee information.

Fields:

* id
* employeeCode
* name
* email
* department
* designation
* status
* joinedAt

## Salary

Stores current salary information.

Fields:

* id
* employeeId
* baseSalary
* bonus
* effectiveDate

## SalaryHistory

Stores all salary revisions.

Fields:

* id
* employeeId
* oldSalary
* newSalary
* changedAt
* changedBy

---

# 7. Scalability Strategy

The MVP targets approximately 10,000 employees.

To ensure responsiveness:

## Pagination

Employee listings use server-side pagination.

Example:

GET /employees?page=1&limit=50

## Database Indexes

Indexes are created on:

* employeeCode
* email
* department

## SQL Aggregations

Analytics calculations are performed in the database using aggregation queries instead of processing large datasets in application memory.

---

# 8. Caching Strategy

## Current Implementation

Redis is used for caching frequently accessed analytics data.

Examples:

* Dashboard metrics
* Payroll summaries
* Top earners
* Department analytics

Cache TTL:

* 5 minutes

Benefits:

* Reduced database load
* Faster dashboard response times

## Cache Invalidation

Cache entries are invalidated when salary information is updated.

---

# 9. Queue-Based Processing

Salary updates trigger background events.

Example:

Salary Updated
→ Queue Event
→ Worker Processing

Worker responsibilities:

* Audit log generation
* Analytics refresh
* Notification processing

Benefits:

* Faster API responses
* Improved scalability
* Better separation of responsibilities

Potential implementation:

* BullMQ
* Redis-backed queue

---

# 10. Security

## Authentication

JWT-based authentication.

Authenticated users receive an access token for API access.

## Authorization

Role-Based Access Control (RBAC).

Supported roles:

* Admin
* HR Manager

## Password Security

Passwords are stored using bcrypt hashing.

Plaintext passwords are never stored.

## Input Validation

All requests are validated using schema validation.

Examples:

* Required fields
* Salary constraints
* Email validation

## SQL Injection Protection

ORM-generated parameterized queries prevent SQL injection attacks.

## Security Headers

Helmet middleware is used to enforce security-related HTTP headers.

## CORS

Only trusted frontend origins are allowed to access backend APIs.

---

# 11. Reliability

## Audit Trail

Every salary modification generates an audit record.

Stored information:

* Previous salary
* New salary
* Timestamp
* User performing the action

## Database Transactions

Salary updates and salary history creation occur within a single transaction.

This guarantees consistency.

## Error Handling

Centralized error middleware provides:

* Consistent API responses
* Logging
* Error classification

---

# 12. Observability

## Logging

Structured application logs are generated for:

* Salary updates
* Authentication events
* System errors

Suggested tooling:

* Pino

## Health Checks

Health endpoint:

GET /health

Returns application readiness status.

## Monitoring (Future)

Metrics may be exported to:

* Prometheus
* Grafana

Tracked metrics:

* Request latency
* Error rate
* Throughput

---

# 13. Deployment

## Containerization

The application is containerized using Docker.

Components:

* Frontend container
* Backend container

## CI/CD

Pipeline stages:

1. Install dependencies
2. Run lint checks
3. Execute tests
4. Build application
5. Deploy

GitHub Actions is used for automation.

---

# 14. Tradeoffs

## Why Modular Monolith Instead of Microservices?

The MVP serves approximately 10,000 employees and does not require service decomposition.

A modular monolith offers:

* Faster development
* Easier debugging
* Lower infrastructure cost
* Simpler deployment

while preserving the ability to split services later if required.

## Why SQLite for MVP?

SQLite reduces setup complexity while remaining sufficient for development and assessment purposes.

A production deployment would migrate to PostgreSQL without significant architectural changes.

## Why Queue Processing?

Queue-based processing is introduced for non-critical background tasks to improve responsiveness and demonstrate asynchronous system design.

---

# 15. Future Enhancements

* Multi-country payroll support
* Currency management
* Payroll processing
* Payslip generation
* Approval workflows
* Employee self-service portal
* Advanced compensation forecasting
* AI-powered payroll insights
