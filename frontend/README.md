# Quiz App Frontend

The frontend of the Quiz App, built with Next.js and TypeScript, provides a responsive interface for creating and managing quizzes.

## Prerequisites

- Node.js (v16 or higher)
- npm
- Backend running on `http://localhost:3001/api` (see `../backend/README.md`)

## Setup

1. Navigate to the frontend directory (if not already there):
   ```bash
   # Navigate to the frontend directory
   $ cd frontend
   ```
2. Install dependencies:
   ```bash
   # Install frontend dependencies
   $ npm install
   ```
3. Configure environment variables:

- Create a .env.local file in the frontend directory.
- Add the following configuration (adjust the URL based on your backend setup):
  `NEXT_PUBLIC_API_BASE_URL=backend-url`
- Ensure the backend is configured to run on port 3000 (default in backend/.env or in nestjs). Adjust the URL if your backend uses a different port.

4. Start the development server:
   ```bash
   # Start the frontend in development mode
   $ npm run dev
   ```
5. Open http://localhost:3000 in your browser.

## Scripts
     ```bash
- $ npm run dev: Start the development server (port 3000 by default).
- $ npm run build: Build the app for production.
- $ npm run start: Run the production build.
