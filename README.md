# Event Management API

A modern, secure, and scalable event management REST API built with [NestJS](https://nestjs.com/), [Prisma ORM](https://www.prisma.io/), and JWT authentication.

---

## 🚀 Features

- User registration, login, and logout with JWT authentication
- Event creation, update, deletion (only by event owner)
- Join/leave events as a participant
- Role-based access: public and protected routes
- Swagger (OpenAPI) documentation
- Centralized error handling and validation
- Clean, maintainable code structure (controllers thin, logic in services)

---

## 🛠️ Tech Stack

- **Backend:** NestJS (TypeScript)
- **ORM:** Prisma
- **Database:** PostgreSQL (configurable)
- **Auth:** JWT (with session table for single-login enforcement)
- **Validation:** class-validator
- **Docs:** Swagger (OpenAPI)

---

## ⚡ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/ktlviy/event-manage-app.git
cd event-manage-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/eventdb
JWT_SECRET=your_jwt_secret
PORT=3000
```

### 4. Set up the database

```bash
npx prisma migrate dev --name init
```

### 5. Start the server

```bash
npm run start:dev
```

---

## 📚 API Documentation

Once the server is running, access the Swagger UI at:

```
http://localhost:3000/api
```

- Explore all endpoints, request/response schemas, and try out requests interactively.

---

## 🧑‍💻 Example Endpoints

### Register

```http
POST /auth/register
Content-Type: application/json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "TestPassword123!"
}
```

### Login

```http
POST /auth/login
Content-Type: application/json
{
  "email": "test@example.com",
  "password": "TestPassword123!"
}
```

### Create Event (Authenticated)

```http
POST /events
Authorization: Bearer <access_token>
Content-Type: application/json
{
  "name": "My Event",
  "description": "A great event",
  "date": "2025-07-01T12:00:00Z",
  "location": "Online",
  "maxParticipants": 100
}
```

---

## 🏗️ Project Structure

```
src/
  auth/         # Auth logic, guards, strategies, DTOs
  events/       # Event controllers, services, DTOs
  participants/ # Participant controllers, services, DTOs
  user/         # User logic
  prisma/       # Prisma service/module
  main.ts       # App entrypoint
```

---

## 🛡️ Security & Best Practices

- Passwords are hashed with bcrypt
- JWT tokens are required for all protected routes
- Only event owners can update/delete their events
- Centralized error handling for clean API responses
- DTO validation for all inputs

---

## 📝 License

MIT
