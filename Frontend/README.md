# Frontend

A React 19 single-page application built with Vite. It provides registration, email verification, login, a protected dashboard, and note management. The frontend uses React Router, Axios, Tailwind CSS, and shared UI components.

## Requirements

- Node.js and npm
- The API backend; see the [backend README](../Backend/README.md)

## Setup and development

From this directory:

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal (normally `http://localhost:5173`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reloading. |
| `npm run build` | Build the production bundle in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run Oxlint. |

## Routes

| Route | Page | Access |
| --- | --- | --- |
| `/` | Login | Public |
| `/login` | Login | Public |
| `/register` | Create an account | Public |
| `/verify-email` | Enter the email verification code | Public |
| `/forgot-password` | Request a password-reset code | Public |
| `/dashboard` | Dashboard | Requires authentication |
| `/create-note` | Create, search, update, and delete notes | Requires authentication |
| `/reset-password` | Set a new password | Requires authentication |

Authentication state is managed by the auth context. The app stores the access token in `localStorage`, sends it as a bearer token, and uses a credentialed refresh request to restore a session from the refresh-token cookie.

## Backend connection

Both API clients currently use the deployed API URL `https://mern-practice-app-mf0a.onrender.com`:

- `src/features/auth/services/auth.api.js`
- `src/features/Dashboard/services/notes.api.js`

For local development, set each client's `baseURL` to the backend URL (normally `http://localhost:3000`). The backend CORS allowlist already includes `http://localhost:5173`; if you use a different frontend origin, update it in `Backend/src/app.js`. Configure the backend environment variables described in the [backend README](../Backend/README.md).

## Source layout

```text
src/
├── components/ui/         # Shared UI primitives
├── features/
│   ├── auth/              # Auth context, pages, hooks, and API client
│   └── Dashboard/         # Dashboard, note UI, state, and API client
├── App.jsx                # Providers and router
├── app.routes.jsx         # Route definitions
└── main.jsx               # Application entry point
```
