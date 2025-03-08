# Hotel Management App

## Overview

This is a full-stack hotel management application built using **Next.js**, **NextAuth**, **Prisma**, and **MongoDB**. It allows users to authenticate via credentials or Google, manage hotels, and perform CRUD operations on hotel listings.

## Features

- **User Authentication**
  - Sign up and login using **email/password**
  - Social login with **Google**
  - JWT-based authentication with **Access & Refresh Tokens**
- **Hotel Management**
  - Create, edit, and delete hotels
  - View hotels with pagination (8 per page)
  - Server-side rendering for hotel listings
  - Individual property detail pages
- **Social Media Sharing**
  - Share hotel details on social media
- **Error Handling**
  - Custom error and not found pages

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/hotel-management-app.git
cd hotel-management-app
```

### 2. Install Dependencies

```bash
npm install  # or yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file and add the following:

```env
DATABASE_URL=mysql://username:password@localhost:3306/hotel_db
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
JWT_SECRET=your-jwt-secret
```

### 4. Set Up Database

Run Prisma migrations to initialize the database.

```bash
npx prisma migrate dev --name init
```

To populate sample data, run:

```bash
npx prisma db seed
```

### 5. Run the Application

```bash
npm run dev  # or yarn dev
```

Application will run at **http://localhost:3000**

## API Endpoints

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/auth/register` | Register new user    |
| POST   | `/api/auth/login`    | Login user           |
| GET    | `/api/hotels`        | Fetch all hotels     |
| POST   | `/api/hotels`        | Create new hotel     |
| PUT    | `/api/hotels/:id`    | Update hotel details |
| DELETE | `/api/hotels/:id`    | Delete hotel         |

## Challenges & Solutions

- **OAuth Login Issue:** Fixed by ensuring proper redirect URIs and checking Prisma adapter usage.
- **JWT Expiry Handling:** Implemented refresh token mechanism to regenerate access tokens.
- **Database Performance:** Used pagination and indexing to optimize queries.
