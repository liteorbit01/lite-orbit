# Lite Orbit Architecture

**Document Version:** 1.0  
**Status:** Active  
**Project Version:** v0.3 – Foundation Complete  
**Last Updated:** 2026-08-23  
**Owner:** Lite Orbit Development Team

---

# Purpose

This document defines the overall software architecture of the Lite Orbit platform.

It serves as the primary technical blueprint for the project by describing the major architectural components, their responsibilities, and the relationships between them.

Detailed implementation information is documented separately in the specialized documents referenced throughout this guide.

---

# Scope

This document describes:

- Overall platform architecture
- Technology stack
- Application organization
- Folder structure
- Data flow
- Security architecture
- Deployment architecture
- Scalability strategy

This document intentionally does **not** describe:

- Database schema details
- API specifications
- Business workflows
- UI implementation
- Individual feature implementation

Those subjects are documented separately.

---

# Project Vision

Lite Orbit is a modern commerce platform specializing in premium apparel and home textiles.

The platform is designed around four primary goals:

- Elegant customer experience
- Secure architecture
- Long-term maintainability
- Production-quality engineering

Every architectural decision should support these goals.

---

# Architecture Principles

The Lite Orbit architecture follows these principles:

- Separation of concerns
- Single source of truth
- Modular design
- Layered architecture
- Secure by default
- Reusable components
- Explicit dependencies
- Scalable by design

Implementation practices are defined separately in **ENGINEERING_PRINCIPLES.md**.

---

# Technology Stack

## Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

## Backend

- Supabase
- PostgreSQL
- Supabase Authentication
- Supabase Storage

## Infrastructure

- Vercel
- GitHub

## Development

- Visual Studio Code
- Git
- npm

---

# High-Level Architecture

```
                    Internet
                         │
                         ▼
                  Vercel Platform
                         │
          ┌──────────────┴──────────────┐
          │                             │
     Public Storefront             Admin CMS
          │                             │
          └──────────────┬──────────────┘
                         │
                  Next.js App Router
                         │
      ┌──────────────────┼──────────────────┐
      │                  │                  │
Server Components   Client Components   Server Actions
                         │
                         ▼
                 Supabase Platform
      ┌──────────────────┼──────────────────┐
      │                  │                  │
 PostgreSQL           Auth             Storage
```

---

# Project Structure

The project is organized into clearly separated responsibilities.

```
app/
components/
context/
providers/
lib/
supabase/
public/
docs/
```

### app/

Contains all application routes.

- Storefront
- Admin CMS
- API endpoints

---

### components/

Reusable UI components shared throughout the platform.

---

### context/

React Context providers.

Example:

- Shopping Cart

---

### providers/

Application-wide providers.

Example:

- Page transitions
- Theme providers

---

### lib/

Shared helper functions, utilities and server-side logic.

---

### supabase/

Supabase configuration and client initialization.

---

### public/

Static assets.

---

### docs/

Project documentation.

---

# Routing Architecture

Lite Orbit uses the Next.js App Router.

The application is separated into independent route groups.

```
app/

(store)

admin

api
```

This separation allows the storefront and the administration interface to evolve independently while sharing common infrastructure.

---

# Component Architecture

Components are organized according to responsibility.

Presentation components should not contain business logic.

Business logic belongs within:

- Server Actions
- Utility modules
- Database functions
- Supabase services

Reusable components should always be preferred over duplication.

---

# Data Architecture

Application data flows through the following layers.

```
User

↓

Next.js

↓

Server Action

↓

Supabase

↓

PostgreSQL

↓

Response

↓

User Interface
```

The database remains the primary source of truth.

---

# Security Architecture

Security is designed into every layer.

Authentication:

- Supabase Authentication

Authorization:

- Row Level Security (RLS)

Administration:

- Service Role

Protected Routes:

- Middleware / Proxy

Client applications never communicate with privileged database resources directly.

Detailed policies are documented in **AUTHORIZATION.md**.

---

# Application Architecture

Lite Orbit consists of two primary applications.

## Storefront

Customer-facing commerce platform.

Responsibilities include:

- Browsing products
- Shopping cart
- Checkout
- Customer account

---

## Admin CMS

Internal administration platform.

Responsibilities include:

- Product management
- Inventory
- Orders
- Customers
- Collections
- Categories

Both applications share:

- Components
- Utilities
- Design System
- Database
- Authentication

---

# Deployment Architecture

Development follows this pipeline.

```
Developer

↓

Git

↓

GitHub

↓

Vercel

↓

Production
```

Supabase provides:

- Database
- Authentication
- Storage

Deployment details are documented in **deployment/**.

---

# Scalability Strategy

Lite Orbit is designed to support future expansion.

Planned capabilities include:

- Product search
- Multi-language
- Multi-currency
- Customer portal
- Analytics
- Marketing automation
- AI-assisted recommendations
- Performance optimization
- International expansion

The architecture favors modular growth over large-scale rewrites.

---

# Related Documents

Core Documents

- README.md
- PROJECT_CONSTITUTION.md
- ENGINEERING_PRINCIPLES.md
- DATABASE.md
- AUTHORIZATION.md
- STORAGE.md
- APPLICATION.md

Supporting Documentation

- api/
- database/
- deployment/
- development/
- ui/
- business/
- adr/

---

# Revision History

| Version | Date | Description |
|----------|------------|-------------------------------|
| 1.0 | 2026-08-23 | Initial architecture document established. |