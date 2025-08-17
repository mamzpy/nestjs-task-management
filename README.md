# NestJS Task Management API

A comprehensive task management REST API built with NestJS, TypeScript, and PostgreSQL featuring JWT authentication, custom decorators, and user-specific task management.

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication with Passport strategy
- Secure password hashing with bcrypt and salt
- User registration and login endpoints
- Protected routes with JWT guards
- Custom user decorator for request context
- User-specific data isolation
- Token validation and user extraction

### 📝 Task Management
- Create, read, update, and delete tasks
- Task status management (OPEN, IN_PROGRESS, DONE)
- User-specific task ownership
- Task filtering and search capabilities
- Input validation with class-validator and DTOs

### 🏗️ Architecture
- Clean modular architecture with NestJS modules
- Repository pattern with TypeORM
- Custom decorators and guards
- Environment-based configuration
- Production-ready deployment setup
- Comprehensive error handling

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **NestJS** | Backend framework |
| **TypeScript** | Programming language |
| **TypeORM** | Database ORM |
| **PostgreSQL** | Database |
| **JWT** | Authentication tokens |
| **Passport** | JWT authentication strategy |
| **bcrypt** | Password hashing |
| **class-validator** | Input validation |
| **Joi** | Configuration validation |

## 📁 Project Structure

```
src/
├── auth/                      # Authentication module
│   ├── dto/
│   │   └── auth-credentials.dto.ts  # Auth request/response DTOs
│   ├── user.entity.ts         # User database entity
│   ├── users.repository.ts    # User repository with bcrypt
│   ├── jwt-payload.interface.ts # JWT payload type definition
│   ├── jwt.strategy.ts        # Passport JWT strategy
│   ├── get-user.decorator.ts  # Custom decorator for user extraction
│   ├── auth.service.ts        # Authentication business logic
│   ├── auth.controller.ts     # Auth endpoints (signup/signin)
│   └── auth.module.ts         # Authentication module
├── tasks/                     # Task management module
│   ├── dto/
│   │   ├── create-task.dto.ts     # Create task DTO
│   │   ├── get-tasks-filter.dto.ts # Task filtering DTO
│   │   └── update-task-status.dto.ts # Status update DTO
│   ├── task.entity.ts         # Task database entity
│   ├── task-status.enum.ts    # Task status enumeration
│   ├── tasks.repository.ts    # Task repository with user relations
│   ├── tasks.service.ts       # Task business logic
│   ├── tasks.controller.ts    # Task CRUD endpoints
│   └── tasks.module.ts        # Task module
├── config.schema.ts           # Environment validation schema
├── app.module.ts              # Main application module
└── main.ts                    # Application entry point
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### 1. Clone & Install
```bash
git clone https://github.com/mamzpy/nestjs-task-management.git
cd nestjs-task-management
npm install
```

### 2. Environment Setup
Create environment files:

**`.env.stage.dev`** (Development)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=task-management
JWT_SECRET=your-super-secret-jwt-key
```

**`.env.stage.prod`** (Production)
```env
DATABASE_URL=your_production_database_url
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
```

### 3. Database Setup
```
