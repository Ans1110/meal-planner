# 🍽️ Smart Meal Planner

A comprehensive meal planning and nutrition tracking application built with Next.js 15, featuring role-based access control, real-time nutrition calculations, and an intuitive user interface.

## ✨ Features

### 🔐 Authentication & Authorization
- **Secure Authentication** with NextAuth.js
- **Role-based Access Control** (Admin/User roles)
- **Protected Routes** with automatic redirects
- **Session Management** with persistent login

### 👤 User Features
- **Meal Planning** - Create and manage daily meals
- **Nutrition Tracking** - Real-time calorie and macronutrient calculations
- **Food Database** - Browse and search through available foods
- **Serving Units** - Flexible portion control with custom serving units
- **Date Filtering** - Filter meals by specific dates
- **Responsive Design** - Works seamlessly on desktop and mobile

### 👨‍💼 Admin Features
- **Food Management** - Add, edit, and delete food items
- **Category Management** - Organize foods into categories
- **Serving Unit Management** - Create and manage serving units
- **Nutrition Data** - Comprehensive nutrition information for each food
- **User Management** - Role-based access control

### 🎨 UI/UX Features
- **Modern Design** - Clean, intuitive interface with Tailwind CSS
- **Dark/Light Mode** - Theme switching with system preference detection
- **Responsive Layout** - Mobile-first design approach
- **Loading States** - Skeleton loaders and loading indicators
- **Error Handling** - User-friendly error messages and validation
- **Toast Notifications** - Real-time feedback for user actions

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations and transitions
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation
- **TanStack Query** - Server state management
- **Zustand** - Client state management

### Backend
- **NextAuth.js 5** - Authentication and session management
- **Prisma** - Database ORM with type safety
- **SQLite** - Lightweight database (easily switchable to PostgreSQL/MySQL)
- **bcryptjs** - Password hashing
- **Server Actions** - Type-safe server-side operations

### Development Tools
- **Turbopack** - Fast bundling and development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd meal-planner/my-app
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add the following to your `.env.local`:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   bun run db:migrate
   bun run db:seed
   ```

5. **Start the development server**
   ```bash
   bun run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/                 # Authentication pages
│   │   ├── sign-in/           # Sign-in page and components
│   │   └── sign-up/           # Sign-up page and components
│   ├── (dashboard)/           # Protected dashboard routes
│   │   ├── admin/             # Admin-only features
│   │   │   └── foods-management/
│   │   │       ├── categories/    # Category management
│   │   │       ├── foods/         # Food management
│   │   │       └── serving-units/ # Serving unit management
│   │   ├── client/            # User features
│   │   │   ├── _components/   # Client-specific components
│   │   │   ├── _lib/          # Client state management
│   │   │   ├── _services/     # API calls and mutations
│   │   │   └── _types/        # TypeScript types
│   │   └── _components/       # Shared dashboard components
│   ├── api/                   # API routes
│   │   └── auth/              # NextAuth.js API routes
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── components/
│   ├── ui/                    # Reusable UI components
│   └── providers.tsx          # Context providers
├── lib/
│   ├── auth.ts                # NextAuth.js configuration
│   ├── db.ts                  # Database connection
│   ├── utils.ts               # Utility functions
│   └── types/                 # Shared TypeScript types
└── prisma/
    ├── schema.prisma          # Database schema
    ├── seed.ts                # Database seeding
    └── migrations/            # Database migrations
```

## 🗄️ Database Schema

The application uses a well-structured database schema with the following main entities:

- **User** - User accounts with role-based access
- **Food** - Food items with nutritional information
- **Category** - Food categories for organization
- **ServingUnit** - Different ways to measure food portions
- **Meal** - User meal records
- **MealFood** - Junction table linking meals to foods with quantities

## 🔧 Available Scripts

```bash
# Development
bun run dev          # Start development server with Turbopack
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint

# Database
bun run db:migrate   # Run database migrations
bun run db:seed      # Seed database with sample data
```

## 🎯 Key Features Explained

### Meal Creation
- Users can create meals by selecting foods from the database
- Each food can be measured in different serving units
- Real-time nutrition calculations show total calories and macronutrients
- Meals are organized by date and time

### Nutrition Tracking
- Comprehensive nutrition data including calories, protein, carbs, fat, fiber, and sugar
- Real-time calculations as users add foods to meals
- Visual nutrition summaries with charts and statistics
- Daily nutrition totals and meal summaries

### Admin Panel
- Complete food database management
- Category organization system
- Serving unit management
- User role management
- Bulk operations and data import capabilities
