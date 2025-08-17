# NestJS Task Management API

A robust task management REST API built with NestJS, TypeScript, and PostgreSQL featuring JWT authentication and user-specific task management.

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
- Input validation with class-validator

### 🏗️ Architecture
- Clean modular architecture
- TypeORM for database operations
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
| **JWT** | Authentication |
| **bcrypt** | Password hashing |
| **Passport** | JWT authentication strategy |
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
```bash
# Create PostgreSQL database
createdb task-management

# Start development server (auto-sync enabled)
npm run start:dev
```

### 4. Run the Application
```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

The API will be available at `http://localhost:3000`

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
    id UUID PRIMARY KEY,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    status ENUM('OPEN', 'IN_PROGRESS', 'DONE') DEFAULT 'OPEN',
    user_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔗 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | User registration | ❌ |
| POST | `/auth/signin` | User login | ❌ |

### Tasks
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/tasks` | Get user's tasks | ✅ |
| GET | `/tasks/:id` | Get specific task | ✅ |
| POST | `/tasks` | Create new task | ✅ |
| PATCH | `/tasks/:id/status` | Update task status | ✅ |
| DELETE | `/tasks/:id` | Delete task | ✅ |

### Query Parameters
- `status`: Filter tasks by status (`OPEN`, `IN_PROGRESS`, `DONE`)
- `search`: Search tasks by title or description

## 📝 API Usage Examples

### Authentication
```bash
# Register new user
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "john_doe", "password": "securePassword123"}'

# Login
curl -X POST http://localhost:3000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"username": "john_doe", "password": "securePassword123"}'
```

### Task Management
```bash
# Create task (requires JWT token)
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title": "Learn NestJS", "description": "Complete NestJS tutorial"}'

# Get all tasks
curl -X GET http://localhost:3000/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Update task status
curl -X PATCH http://localhost:3000/tasks/TASK_ID/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"status": "IN_PROGRESS"}'
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## 🚀 Deployment

### Environment Variables
Set these environment variables in production:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV=production`

### Production Build
```bash
npm run build
npm run start:prod
```

## 🔒 Security Features

- **Password Security**: bcrypt hashing with salt rounds
- **JWT Authentication**: Passport strategy with bearer token extraction
- **Custom Decorators**: Secure user context extraction
- **Input Validation**: Request validation with class-validator and DTOs
- **Environment Protection**: Sensitive data in environment variables
- **User Isolation**: Users can only access their own tasks
- **SQL Injection Protection**: TypeORM parameterized queries
- **Token Validation**: Automatic user verification on protected routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED License.

## 👨‍💻 Author

**Mohammadreza Ghadarjani**
- GitHub: [@mamzpy](https://github.com/mamzpy)

---

Built with ❤️ using NestJS and TypeScript
