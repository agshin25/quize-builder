# Quiz App

A web application for creating and managing quizzes with questions. The app features a modern frontend built with Next.js and a robust backend powered by NestJS, using PostgreSQL (via Supabase) for data storage.

## Features

- Create, edit, and delete quizzes.
- Add questions to quizzes with customizable options.
- User-friendly interface for quiz management.
- Scalable backend with RESTful APIs.

## Tech Stack

- **Frontend**: Next.js (React framework)
- **Backend**: NestJS (Node.js framework)
- **Database**: PostgreSQL (hosted on Supabase)
- **ORM**: Prisma (schema management) and TypeORM (query operations)
- **Other**: TypeScript, Supabase for database

## Prerequisites

- Node.js (v16 or higher)
- npm or Yarn
- Supabase account and Database URLS
- Git

## Getting Started

1. Clone the repository:
   ```bash
   # Clone the repository and navigate to the project directory
   $ git clone <repository-url>
   $ cd quiz-app
   ```
2. Install dependencies for both frontend and backend:

   ```bash
   # Navigate to frontend and install dependencies

   $ cd frontend
   $ npm install
   ```

   ```bash
   # Navigate to backend and install dependencies

   $ cd ../backend
   $ npm install
   ```

3. Follow the detailed setup instructions in:

- frontend/README.md for frontend configuration and running the app.
- backend/README.md for backend configuration, database setup, and running the app.
