# Career AI Assistant - Project Architecture & Developer Guide

## 📋 Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Authentication System](#authentication-system)
5. [Database Architecture](#database-architecture)
6. [File Structure Deep Dive](#file-structure-deep-dive)
7. [Development Workflow](#development-workflow)
8. [Key Design Patterns](#key-design-patterns)
9. [Getting Started](#getting-started)

---

## 🔍 Overview

**Career AI Assistant** is a Next.js 15 full-stack application that helps users create AI-powered job applications. The project uses modern React patterns with Server Actions, TypeScript for type safety, and PostgreSQL for data persistence.

### Key Features

- 🔐 **Session-based Authentication** (HTTP-only cookies)
- 🤖 **AI-powered Application Generation** (planned)
- 📝 **Draft Management System**
- 👤 **User Profile Management**
- 🎨 **Modern UI with Tailwind CSS**

---

## 🛠 Tech Stack

### **Frontend**

- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5.x** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **Radix UI** - Accessible component primitives

### **Backend**

- **Next.js Server Actions** - Modern server-side logic
- **Prisma 6.16.2** - Type-safe database ORM
- **PostgreSQL** - Primary database
- **bcryptjs** - Password hashing
- **Zod 4.1.9** - Runtime type validation

### **Authentication**

- **iron-session 8.0.4** - Encrypted session cookies
- **HTTP-only cookies** - Secure session storage
- **No JWTs** - Simplified session management

### **Development Tools**

- **Turbopack** - Fast bundler
- **Prisma Studio** - Database GUI
- **TypeScript** - Static type checking

---

## 📁 Project Structure

```
career-ai-assistant/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 (auth)/                  # Authentication route group
│   │   ├── 📄 actions.ts           # Server actions for auth
│   │   ├── 📁 login/               # Login page
│   │   └── 📁 register/            # Registration page
│   │       ├── 📄 page.tsx         # Register route
│   │       └── 📄 signup-form.tsx  # Registration form component
│   ├── 📁 (protected)/             # Protected routes (requires auth)
│   ├── 📁 (public)/                # Public routes
│   │   └── 📁 components/          # UI components (Radix + Tailwind)
│   ├── 📁 generated/               # Prisma client output
│   │   └── 📁 prisma/              # Generated Prisma client
│   ├── 📄 favicon.ico              # App icon
│   ├── 📄 globals.css              # Global styles
│   └── 📄 layout.tsx               # Root layout component
├── 📁 lib/                         # Shared utilities
│   ├── 📁 validations/             # Zod schemas
│   │   └── 📄 auth.ts              # Authentication validation
│   ├── 📄 prisma.ts                # Database client singleton
│   ├── 📄 session.ts               # Session management
│   └── 📄 utils.ts                 # Utility functions
├── 📁 prisma/                      # Database configuration
│   ├── 📄 schema.prisma            # Database schema
│   └── 📄 seed.ts                  # Database seeding
├── 📁 public/                      # Static assets
├── 📄 .env                         # Environment variables
├── 📄 .env.example                 # Environment template
├── 📄 next.config.ts               # Next.js configuration
├── 📄 package.json                 # Dependencies & scripts
├── 📄 tsconfig.json                # TypeScript configuration
└── 📄 tailwind.config.js           # Tailwind configuration
```

---

## 🔐 Authentication System

### **Architecture Overview**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────┐
│   Client Form   │───▶│   Server Action  │───▶│  Database   │
│  (signup-form)  │    │   (signUp)       │    │  (Prisma)   │
└─────────────────┘    └──────────────────┘    └─────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │   Session        │
                       │  (HTTP Cookie)   │
                       └──────────────────┘
```

### **Key Components**

#### **1. Session Management (`lib/session.ts`)**

```typescript
// Creates encrypted HTTP-only cookie
export async function createUserSession(user: UserSession);

// Retrieves and validates session
export async function getUserSession(): Promise<UserSession | null>;

// Destroys session (logout)
export async function deleteUserSession();

// Quick auth check
export async function isUserLoggedIn(): Promise<boolean>;
```

#### **2. Server Actions (`app/(auth)/actions.ts`)**

```typescript
// User registration with automatic login
export async function signUp(data: SignUpInput): Promise<ActionResult>;

// Handles validation, hashing, DB creation, session setup
```

#### **3. Validation Layer (`lib/validations/auth.ts`)**

```typescript
// Zod schemas for type safety and validation
export const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine(/* password matching logic */);
```

### **Authentication Flow**

1. **User submits form** → Client-side Zod validation
2. **Server Action called** → `signUp(validatedData)`
3. **Server validation** → Re-validate with same Zod schema
4. **User creation** → Hash password → Save to database
5. **Session creation** → Generate encrypted cookie
6. **Auto-redirect** → User logged in → Dashboard

### **Security Features**

- ✅ **Password Hashing** - bcryptjs with salt rounds
- ✅ **HTTP-only Cookies** - XSS protection
- ✅ **SameSite Lax** - CSRF protection
- ✅ **Secure in Production** - HTTPS only
- ✅ **Server-side Validation** - Never trust client
- ✅ **Type Safety** - End-to-end TypeScript

---

## 🗄 Database Architecture

### **Schema Overview (`prisma/schema.prisma`)**

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../app/generated/prisma"  // Custom output location
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Core user model
model User {
  id          String      @id @default(uuid())
  email       String      @unique
  password    String      // Hashed with bcryptjs
  profile     Profile?    // One-to-one relation
  createdAt   DateTime    @default(now())
  jobs        Job[]       // One-to-many
  drafts      Draft[]     // One-to-many
}

// Extended user information
model Profile {
  id          String      @id @default(uuid())
  userId      String      @unique
  user        User        @relation(fields: [userId], references: [id])
  experience  String?     @db.Text
  education   String?     @db.Text
  skills      String?     @db.Text
  strengths   String?     @db.Text
  updatedAt   DateTime    @updatedAt
}

// Job applications
model Job {
  id          String      @id @default(uuid())
  userId      String
  description String      @db.Text
  createdAt   DateTime    @default(now())
  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// Draft applications
model Draft {
  id          String      @id @default(uuid())
  userId      String
  content     String      @db.Text
  createdAt   DateTime    @default(now())
  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### **Database Client (`lib/prisma.ts`)**

```typescript
// Singleton pattern to prevent multiple instances in development
import { PrismaClient } from "@/app/generated/prisma";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ["warn", "error"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

---

## 📂 File Structure Deep Dive

### **Route Groups (App Router)**

#### **`(auth)/` - Authentication Routes**

- **Purpose**: Contains all authentication-related pages and logic
- **Files**:
  - `actions.ts` - Server actions (signUp, signIn, etc.)
  - `login/page.tsx` - Login page
  - `register/page.tsx` - Registration page
  - `register/signup-form.tsx` - Registration form component

#### **`(protected)/` - Protected Routes**

- **Purpose**: Routes that require authentication
- **Middleware**: Automatically checks for valid session
- **Examples**: Dashboard, profile, application pages

#### **`(public)/` - Public Routes**

- **Purpose**: Routes accessible without authentication
- **Contains**: Landing page, UI components, marketing pages

### **Key Directories**

#### **`lib/` - Shared Utilities**

```
lib/
├── validations/
│   └── auth.ts          # Zod schemas for validation
├── prisma.ts            # Database client singleton
├── session.ts           # Session management functions
└── utils.ts             # General utility functions
```

#### **`app/generated/` - Prisma Output**

- **Auto-generated** by Prisma CLI
- **Contains**: Type-safe database client
- **Custom location** to keep organized

#### **`prisma/` - Database Configuration**

```
prisma/
├── schema.prisma        # Database models and configuration
├── seed.ts              # Database seeding script
└── migrations/          # Database migration history
```

---

## 🔄 Development Workflow

### **Environment Setup**

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your values

# 3. Set up database
npx prisma migrate dev --name init
npx prisma generate

# 4. Seed database (optional)
npx prisma db seed

# 5. Start development server
npm run dev
```

### **Database Workflow**

```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Generate Prisma client after schema changes
npx prisma generate

# Reset database (development only)
npx prisma migrate reset

# View database in GUI
npx prisma studio
```

### **Key Commands**

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npx prisma studio    # Open database GUI
```

---

## 🎯 Key Design Patterns

### **1. Server Actions Pattern**

```typescript
// Instead of API routes, use server actions
"use server";
export async function signUp(data: FormData) {
  // Server-side logic here
  return result;
}
```

**Benefits**:

- Type safety end-to-end
- No manual request/response handling
- Automatic security (CSRF protection)
- Better developer experience

### **2. Zod Validation Pattern**

```typescript
// Define schema once, use everywhere
const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Client-side validation
const result = SignUpSchema.safeParse(formData);

// Server-side validation (same schema)
const { success, data } = SignUpSchema.safeParse(input);
```

### **3. Session Management Pattern**

```typescript
// Encrypted HTTP-only cookies
// No JWTs, no tokens, just simple sessions
const session = await getUserSession();
if (!session) redirect("/login");
```

### **4. Database Singleton Pattern**

```typescript
// Prevent multiple Prisma instances in development
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
```

### **5. Route Group Organization**

```
(auth)/     # Authentication routes
(protected)/# Requires authentication
(public)/   # Public access
```

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18+
- PostgreSQL database
- Git

### **Quick Start**

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd career-ai-assistant
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment**

   ```bash
   cp .env.example .env
   # Edit .env with your database URL and session secret
   ```

4. **Set up database**

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Start development**
   ```bash
   npm run dev
   ```

### **Environment Variables**

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/career_ai_assistant"
SESSION_SECRET="your-super-long-random-secret-key-32-chars-minimum"
BCRYPT_SALT_ROUNDS="12"
```

### **Development Tips**

- Use `npx prisma studio` to view/edit database
- Check `app/generated/prisma` for type definitions
- Server actions run on the server - use console.log for debugging
- Session cookies are HTTP-only - check in browser dev tools

---

## 📚 Additional Resources

### **Learning Resources**

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Zod Documentation](https://zod.dev)
- [iron-session Documentation](https://github.com/vvo/iron-session)

### **Project-Specific Notes**

- **No API routes used** - Everything goes through Server Actions
- **Custom Prisma output** - Client generated to `app/generated/prisma`
- **Session-based auth** - No JWTs or tokens
- **Type-safe throughout** - TypeScript + Zod + Prisma

---

_This documentation is maintained by the development team. Please update it when making significant architectural changes._
