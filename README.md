# Talk

Talk is a full-stack web application currently in development. The repository contains a React frontend and an Express/MongoDB backend, with initial registration and login flows. The home screen is currently a placeholder; chat or messaging features are not implemented yet.

## Tech stack

- **Frontend:** React, Vite, React Router, Tailwind CSS
- **Backend:** Node.js, Express, Mongoose, MongoDB
- **Authentication:** bcrypt password hashing and JWTs stored in an HTTP-only cookie

## Project structure

```text
.
├── Backend/
│   ├── src/
│   │   ├── config/        # MongoDB connection
│   │   ├── middleware/    # Authentication middleware
│   │   ├── modules/auth/  # User model and authentication routes
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
└── Frontend/
    ├── src/
    │   ├── components/    # Home and authentication UI
    │   ├── services/      # API client
    │   └── App.jsx
    └── package.json
```

## Prerequisites

- Node.js and npm
- A MongoDB database (local or hosted)

## Local development

1. Clone the repository and install backend dependencies:

   ```bash
   git clone https://github.com/Md-Affan-564/TALK.git
   cd TALK/Backend
   npm install
   ```

2. Create `Backend/.env` with your own development values:

   ```dotenv
   MONGO_URI=mongodb://127.0.0.1:27017/talk
   JWT_SECRET=replace-this-with-a-long-random-secret
   ```

3. Start the backend in one terminal:

   ```bash
   npm run dev
   ```

   The backend listens on port `5000` by default.

4. In a second terminal, install and start the frontend:

   ```bash
   cd TALK/Frontend
   npm install
   ```

   Create `Frontend/.env` and set the API base URL:

   ```dotenv
   VITE_API_URL=http://localhost:5000
   ```

   Then run:

   ```bash
   npm run dev
   ```

   Vite serves the frontend at `http://localhost:5173` by default.

## Authentication API

The backend mounts authentication endpoints under `/api/auth`:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create an account with a username, email, and password |
| `POST` | `/api/auth/login` | Sign in with an email and password |
| `GET` | `/api/auth/me` | Return the current authenticated user |
| `POST` | `/api/auth/logout` | Clear the authentication cookie |

The frontend sends requests with credentials so the browser can include the authentication cookie.

## Frontend scripts

Run these from `Frontend/`:

- `npm run dev` — start the Vite development server
- `npm run build` — create a production build in `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

The backend currently provides `npm run dev` to start the server with nodemon.

## Development and security notes

- Keep real database connection strings and JWT secrets private. Use local `.env` files and never commit credentials.
- The backend CORS configuration currently allows `http://localhost:5173`; update it for any other frontend origin.
- This project is under active development and has not been documented or configured here for production deployment.
