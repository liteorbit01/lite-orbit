# Lite Orbit Identity & Access Management (IAM)

**Document Version:** 1.0  
**Status:** Approved Architecture  
**Project Version:** v1.0  
**Last Updated:** 2026-10-12  
**Owner:** Lite Orbit Development Team

---

# Purpose

This document defines the Identity and Access Management (IAM) architecture for the Lite Orbit platform.

It establishes how users authenticate, how access is granted, how authorization is enforced, and how roles and permissions are managed throughout the application.

This document serves as the single source of truth for all authentication and authorization decisions.

---

# Scope

This document covers:

- Authentication
- Authorization
- Identity lifecycle
- Session management
- Roles
- Permissions
- Protected routes
- Administrative access
- Customer accounts

This document intentionally does **not** describe:

- Database schema details
- API implementation
- Business workflows
- UI implementation
- Individual page logic

These topics are documented separately.

---

# Current Implementation Status

The Lite Orbit Identity & Access Management architecture is partially implemented.

| Component | Status |
|------------|---------|
| Supabase Authentication | ✅ Implemented |
| Browser Supabase Client | ✅ Implemented |
| Server Supabase Client | ✅ Implemented |
| Service Role Client | ✅ Implemented |
| Middleware Authentication | ✅ Implemented |
| Administrator Login | ✅ Implemented |
| Administrator Session Management | ✅ Implemented |
| Customer Authentication | ⏳ Planned |
| Role-Based Authorization | ⏳ Planned |
| Permission Enforcement | ⏳ Planned |
| Multi-role Support | ⏳ Planned |

This document defines both the current implementation and the intended long-term architecture.

---

# Architecture Principles

Lite Orbit follows these Identity & Access Management principles.

- Authentication and authorization are separate concerns.
- Authentication identifies users.
- Authorization determines permissions.
- The database is the source of truth.
- Permissions are never trusted from the browser.
- Administrative operations execute only on the server.
- Least privilege is preferred.
- Authorization should be centralized.
- Business permissions remain independent of Supabase Authentication.

---

# Identity Model

Lite Orbit recognizes five identity types.

```
Guest

↓

Authenticated Customer

↓

Staff

├── Customer Service

├── Manager

└── Administrator
```

Each identity represents a different trust level within the platform.

---

# Authentication

Authentication is provided by Supabase Authentication.

Authentication is responsible only for verifying identity.

Authentication creates authenticated sessions.

Authentication does not determine what a user is allowed to do.

---

## Authentication Flow

```
Visitor

↓

Login Form

↓

Server Action

↓

Supabase Authentication

↓

Authenticated Session

↓

Authenticated User
```

---

# Authorization

Authorization determines what authenticated users are permitted to access.

Lite Orbit authorization is based on:

- profiles
- roles
- profile_roles
- permissions

Authorization is completely independent of authentication.

---

## Authorization Flow

```
Authenticated User

↓

profiles

↓

profile_roles

↓

roles

↓

permissions

↓

Authorized Resources
```

---

# User Types

## Guest

Guests have not authenticated.

Guests may:

- Browse products
- Browse collections
- Search products
- Contact Lite Orbit
- Subscribe to newsletters

Guests may not:

- Access customer accounts
- View orders
- Access administration

---

## Customer

Customers authenticate using Supabase Authentication.

Customers may:

- Manage their profile
- Manage addresses
- Manage shopping cart
- Checkout
- View order history

Customers cannot access the Admin CMS.

---

## Customer Service

Customer Service staff assist customers.

Typical responsibilities include:

- View customers
- View customer orders
- Update order status
- Customer communication

Customer Service users cannot modify products, inventory or system configuration.

---

## Manager

Managers oversee business operations.

Managers may manage:

- Products
- Categories
- Collections
- Inventory
- Orders

Managers cannot manage:

- Staff
- Roles
- Permissions
- System configuration

---

## Administrator

Administrators have unrestricted platform access.

Administrators manage:

- Products
- Categories
- Collections
- Inventory
- Customers
- Orders
- Staff
- Roles
- Permissions
- Platform configuration

---

# Roles

Current platform roles are:

- ADMIN
- MANAGER
- CUSTOMER_SERVICE

Additional roles may be introduced without changing the authentication architecture.

---

# Permissions

Permissions represent individual capabilities.

Examples include:

```
products.read
products.create
products.update
products.delete

inventory.read
inventory.update

orders.read
orders.update

customers.read

users.manage

settings.manage
```

Permissions are assigned to roles.

Users inherit permissions through assigned roles.

---

# Session Lifecycle

```
Login

↓

Authenticated Session

↓

Middleware Validation

↓

Authorization

↓

Application

↓

Logout

↓

Session Destroyed
```

---

# Route Protection

## Public Routes

Accessible without authentication.

Examples:

```
/
/shop
/products
/collection
/contact
```

---

## Customer Routes

Require authenticated customers.

Examples:

```
/account
/orders
/profile
/addresses
/cart
/checkout
```

---

## Administrative Routes

Require:

- Authentication
- Administrator authorization

Examples:

```
/admin/*
/admin/products
/admin/orders
/admin/customers
/admin/settings
```

---

# Authentication Responsibilities

Authentication is responsible for:

- Identity verification
- Login
- Logout
- Session creation
- Session renewal

Authentication is **not** responsible for authorization.

---

# Authorization Responsibilities

Authorization is responsible for:

- Role verification
- Permission verification
- Route protection
- Administrative access
- Business permissions

Authorization is **not** responsible for authentication.

---

# Supabase Responsibilities

Supabase provides:

- Authentication
- Session management
- Token validation
- User identity

Supabase does not determine Lite Orbit business permissions.

---

# Database Responsibilities

The database stores:

- Profiles
- Roles
- Permissions
- Profile-role assignments

The database remains the authoritative source for authorization.

---

# Middleware Responsibilities

Middleware is responsible for:

- Session validation
- Session refresh
- Authentication enforcement
- Protecting authenticated routes

Middleware should not implement business authorization logic.

---

# Admin Layout Responsibilities

The Admin Layout is responsible for:

- Verifying administrator authorization
- Redirecting unauthorized users
- Providing the Admin CMS shell

Authorization should be centralized within the Admin application layer rather than duplicated across pages.

---

# Service Role

The Supabase Service Role is reserved exclusively for trusted server-side operations.

Examples include:

- Product management
- Inventory management
- Stripe webhooks
- Scheduled jobs
- Administrative operations
- Internal maintenance

The Service Role must never be exposed to client applications.

---

# Security Principles

Lite Orbit follows these security principles.

- Never trust client-side authorization.
- Never expose the Service Role.
- Enforce Row Level Security.
- Validate permissions on the server.
- Minimize privilege.
- Centralize authorization.
- Separate authentication from authorization.
- Follow the principle of least privilege.

---

# Future Expansion

The IAM architecture is designed to support future capabilities including:

- Multiple administrator roles
- Permission inheritance
- Teams
- Organizations
- Multi-store management
- Regional administration
- Single Sign-On (SSO)
- External identity providers
- Multi-factor Authentication (MFA)
- Enterprise Identity Providers

No architectural redesign should be required to support these future enhancements.

---

# Architecture Decisions

## ADR-001

Authentication and authorization are intentionally separated.

Authentication identifies users.

Authorization determines access.

---

## ADR-002

Middleware validates authentication.

Middleware does not contain business authorization logic.

---

## ADR-003

Administrative authorization is enforced by the application layer rather than middleware.

---

## ADR-004

The database is the authoritative source for roles and permissions.

The application never trusts authorization data originating from the client.

---

## ADR-005

The Supabase Service Role is reserved exclusively for trusted server-side operations.

---

# Related Documents

Core Architecture

- ARCHITECTURE.md
- DATABASE.md
- APPLICATION.md
- ENGINEERING_PRINCIPLES.md
- STORAGE.md

Security

- AUTHORIZATION.md
- ROW_LEVEL_SECURITY.md

Development

- API.md
- DEPLOYMENT.md

---

# Revision History

| Version | Date | Description |
|----------|------------|-----------------------------------------------|
| 1.0 | 2026-10-12 | Initial Identity & Access Management architecture established following the Lite Orbit Authentication Architecture Audit. |