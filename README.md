# MERN Practice App

A note-taking application built with a React frontend and an Express/MongoDB backend. Users can register, verify their email, sign in, and create, search, update, and delete their notes. The app also includes forgot-password and reset-password screens.

## Repository layout

| Folder | Description |
| --- | --- |
| [`Frontend/`](./Frontend/) | React 19 single-page application built with Vite. |
| [`Backend/`](./Backend/) | Express 5 API, MongoDB models, authentication, and note endpoints. |

## Requirements

- Node.js and npm
- MongoDB connection string
- Gmail OAuth2 credentials for sending verification and password-reset emails

## Run locally

1. Configure and start the backend using the [backend setup instructions](./Backend/README.md).
2. In a separate terminal, install and start the frontend:

   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

The Vite development server is normally available at `http://localhost:5173`. The backend listens on the port set by `PORT`.

### Connect the frontend to a local backend

The API clients currently use the deployed API at `https://mern-practice-app-mf0a.onrender.com`. Set their `baseURL` values to your local backend URL (normally `http://localhost:3000`) to use your local API:

- `Frontend/src/features/auth/services/auth.api.js`
- `Frontend/src/features/Dashboard/services/notes.api.js`

The backend already allows `http://localhost:5173` and the deployed frontend origin through CORS. If you use a different local frontend origin, update the CORS origins in `Backend/src/app.js`.

## Features

- Account registration, email verification, login, and logout
- Access-token authentication with a refresh-token cookie and session restoration
- Protected dashboard and note-management screens
- Create, list, search, update, and delete user-owned notes
- Forgot-password and reset-password screens

See the [frontend README](./Frontend/README.md) for routes and scripts, and the [backend README](./Backend/README.md) for required configuration and API endpoints.
