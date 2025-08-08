# Quiz App Backend

The backend of the Quiz App, built with NestJS and TypeScript, provides RESTful APIs for quiz and question management using PostgreSQL (via Supabase).

## Prerequisites

- Node.js (v16 or higher)
- npm
- A Supabase account (see Setup for instructions)

## Setup

To set up the backend locally, follow these steps:

1. Navigate to the backend directory:
   ```bash
   # Navigate to the backend directory
   $ cd backend
   ```
2. Install dependencies:
   ```bash
   # Install backend dependencies
   $ npm install
   ```
   > **Note:** If you followed the general README, this step may already be complete.
3. Set up the Supabase database:

- Create an account at Supabase.
- Create a new project in your Supabase dashboard.
- Go to Project → Connection > ORMs > Prisma.
- Copy the .env.local example and replace [YOUR-PASSWORD] with your database password.
- Paste the modified content into a .env file in the backend directory.

4. Configure environment variables:

- Ensure your .env file includes the following ones too (adjust values as needed):
  **Frontend URL for CORS or redirects (e.g., development frontend URL):**

  ```env
  FRONTEND_URL=http://localhost:3000 (your front url)
  ```

  **Port for the backend server (avoid conflict with frontend port 3000)**

  ```env
  PORT=3001 (your preferences)
  ```

- Explanation:
  - **DATABASE_URL:** Used by Prisma for database migrations and queries. Replace `[YOUR-PASSWORD]` with your Supabase database password.
  - **DIRECT_URL:** Optional, used by TypeORM or raw SQL connections if needed. Should match `DATABASE_URL` unless a direct connection is required.
  - **FRONTEND_URL:** Set to the frontend development URL (e.g., `http://localhost:3000)`). Update for production if different.
  - **PORT:** Set to `3001` to avoid conflict with the frontend (default 3000). Adjust if needed.

5. Run database migrations with Prisma:
   ```bash
   # Apply database migrations
   $ npx prisma migrate dev
   ```
6. Start the development server:
   ```bash
   # Start the backend in development mode
   $ npm run start:dev
   ```

## Scripts

```bash
# Start the development server (port configured in .env, default 3001)
$ npm run start:dev

# Build the app for production
$ npm run build

# Run the production build
$ npm run start
```

## Notes

- Ensure the Supabase project is active and the connection string is correct before running migrations.
- The frontend must be configured with NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api in its .env.local file to communicate with this backend.
