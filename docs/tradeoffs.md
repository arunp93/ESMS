# Technical Tradeoffs and Design Decisions

## Overview

This document captures the major product, architectural, and engineering decisions made during the development of the Employee Salary Management System (ESMS).

The goal was to deliver a production-oriented MVP that balances simplicity, maintainability, scalability, and development speed while solving the core business problem.

---

# Product Decisions

## Single-Country Payroll Support

### Decision

The MVP supports employees from a single country.

### Why

The original problem statement mentions employees across multiple countries. However, supporting global payroll introduces significant complexity:

* Multiple currencies
* Exchange rate management
* Country-specific tax rules
* Regulatory compliance
* Localized payroll processing

These concerns are outside the primary goal of validating salary management workflows.

### Tradeoff

The MVP does not demonstrate global payroll support.

### Future Extension

The data model can be extended with:

* Country
* Currency
* Payroll Region

without requiring major architectural changes.

---

# Architecture Decisions

## Modular Monolith Instead of Microservices

### Decision

The application is implemented as a modular monolith.

### Why

The system serves a single business domain and a relatively modest scale of approximately 10,000 employees.

A modular monolith provides:

* Faster development
* Easier debugging
* Simpler deployment
* Lower infrastructure cost
* Easier testing

### Tradeoff

Microservice-level isolation is not available.

### Future Extension

Individual modules can be extracted into independent services if future requirements justify the additional operational complexity.

---

# Database Selection

## SQLite for MVP

### Decision

SQLite is used during development and evaluation.

### Why

Benefits include:

* Minimal setup effort
* Zero infrastructure requirements
* Faster onboarding
* Simplified deployment

The expected dataset size of 10,000 employees is well within SQLite's capabilities.

### Tradeoff

SQLite is not ideal for highly concurrent production workloads.

### Future Extension

Repository abstractions allow migration to PostgreSQL with minimal changes.

---

# Authentication Strategy

## JWT-Based Authentication

### Decision

Use stateless JWT authentication.

### Why

Benefits:

* Scales horizontally
* Simplifies deployment
* Eliminates server-side session storage

### Tradeoff

Token revocation is more complex than traditional session-based authentication.

### Future Extension

Refresh tokens and token blacklisting can be introduced if required.

---

# Salary History

## Immutable Salary Revisions

### Decision

Salary updates never overwrite historical records.

### Why

Compensation data should remain auditable.

Benefits:

* Historical reporting
* Compliance readiness
* Change accountability
* Easier troubleshooting

### Tradeoff

Additional storage is required.

### Justification

Storage costs are negligible compared to the value of maintaining an audit trail.

---

# Queue-Based Processing

## Asynchronous Background Jobs

### Decision

Salary update events are processed asynchronously through a queue.

### Why

Salary changes may trigger:

* Audit log generation
* Analytics recalculation
* Notification processing

Moving these operations to background workers reduces request latency and improves responsiveness.

### Tradeoff

Additional infrastructure is required.

Components:

* Redis
* BullMQ Worker

### Justification

This introduces a realistic event-driven pattern while remaining lightweight enough for the assessment.

---

# Caching Strategy

## Redis Cache for Analytics

### Decision

Frequently accessed dashboard metrics are cached.

### Why

Analytics endpoints are read-heavy and relatively static.

Examples:

* Total payroll
* Average salary
* Department payroll
* Top earners

Benefits:

* Reduced database load
* Faster page loads
* Better user experience

### Tradeoff

Cache invalidation introduces complexity.

### Mitigation

Analytics cache is invalidated whenever salary data changes.

---

# Pagination Strategy

## Server-Side Pagination

### Decision

Employee data is paginated at the API level.

### Why

Loading all employees into the browser is inefficient.

Benefits:

* Faster responses
* Reduced memory usage
* Better frontend performance

### Tradeoff

Additional pagination logic is required.

### Justification

Necessary for handling datasets of 10,000 employees.

---

# Security Decisions

## Schema Validation

### Decision

All API requests are validated before entering business logic.

### Why

Prevents:

* Invalid payloads
* Data corruption
* Unexpected runtime failures

### Tradeoff

Slight increase in development effort.

### Justification

The reliability benefits significantly outweigh the implementation cost.

---

## Role-Based Access Control (RBAC)

### Decision

RBAC support is included even though only HR users exist in the MVP.

### Why

Future roles may include:

* HR Manager
* Admin
* Payroll Specialist

### Tradeoff

Additional authorization logic.

### Justification

Provides a clear path for future access control requirements.

---

# Infrastructure Decisions

## Reverse Proxy and Load Balancer

### Decision

Production deployments are expected to run behind Nginx or a cloud load balancer.

### Why

Responsibilities include:

* TLS termination
* Compression
* Request routing
* Rate limiting

### Tradeoff

Additional infrastructure component.

### Justification

Standard production deployment practice.

---

# Why Payroll Processing Was Excluded

### Decision

Payroll generation and tax calculations are excluded from the MVP.

### Why

Payroll processing introduces:

* Tax regulations
* Benefits calculations
* Deductions
* Payslip generation
* Compliance requirements

These concerns significantly increase complexity and are not necessary to validate the core compensation management use case.

### Tradeoff

The system manages salary data but does not generate payroll.

### Justification

Allows focus on solving the primary business problem while maintaining manageable scope.

---

# AI Usage Philosophy

### Decision

AI tools were used to accelerate development while maintaining manual review and ownership of technical decisions.

### Why

AI is effective for:

* Boilerplate generation
* Documentation drafting
* Test scaffolding
* Refactoring assistance

### Tradeoff

Generated code may introduce inaccuracies if not reviewed.

### Mitigation

All generated code, architecture decisions, and business logic were manually validated.

---

# Conclusion

The chosen architecture prioritizes simplicity and maintainability while demonstrating production-ready engineering practices such as validation, authentication, caching, asynchronous processing, auditability, and observability.

Where complexity was intentionally excluded, clear extension paths have been documented to support future growth without requiring major redesign.
