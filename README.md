# 🛒 E-Commerce API

A full-featured backend API for an e-commerce application built with **Node.js**, **TypeScript**, **Prisma**, and **PostgreSQL**.

## ⚙️ Tech Stack

- Node.js + Express
- TypeScript
- PostgreSQL (via Prisma ORM)
- JWT Authentication
- Swagger for API documentation

---

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/ecommerce-api.git
cd ecommerce-api
npm install
```
### 2. Configure Environment

Create a .env file:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce"
TOKEN_SECRET="your_jwt_secret"
PORT=5000
```

### 3. Migrate Database

```bash
npx prisma migrate dev --name init
```

### 4. Run the Server

```bash
npm run dev
```

API will run on: http://localhost:5000

### 5. 🔐 Authentication
All protected routes require a Bearer token in the Authorization header.
```bash
Authorization: Bearer <your_token_here>
```

### 6. 📘 Documentation
```bash
http://localhost:5000/api-docs
```

### 7. 🧑‍💻 Author
Micheal Adisa