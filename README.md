# MERN Practice App

A notes application built with a React frontend and an Express/MongoDB backend. Users can register, verify their email, sign in, and create, update, and delete their notes.

## Repository layout

| Folder | Description |
| --- | --- |
| [`Frontend/`](./Frontend/) | React 19 application built with Vite. |
| [`Backend/`](./Backend/) | Express API, MongoDB models, authentication, and note endpoints. |

## Requirements

- Node.js and npm (use a Node.js release supported by the installed Vite version)
- MongoDB connection string
- Gmail OAuth2 credentials for sending registration verification emails

## Run locally

Install and configure the backend first; see the [backend setup instructions](./Backend/README.md). Then install and start the frontend:

```bash
cd Frontend
npm install
npm run dev
```

The Vite development server is normally available at `http://localhost:5173`. The backend's `npm start` command listens on the port configured by `PORT`.

### Local API configuration

The frontend API clients currently use the deployed API at `https://mern-practice-app-mf0a.onrender.com`, and the backend currently allows the deployed frontend origin `https://frontend-y50p.onrender.com` through CORS. To use a local frontend and backend together, update the API base URL in both files below to your local backend URL, and update the CORS origin in `Backend/src/app.js` to your local frontend URL:

- `Frontend/src/features/auth/services/auth.api.js`
- `Frontend/src/features/Dashboard/services/notes.api.js`
- `Backend/src/app.js`

Keep the backend `PORT` consistent with the local API URL.

## Features

- Registration and email verification
- Login, protected pages, session restoration, and logout
- Create, list, update, and delete user-owned notes
- Access tokens with a refresh-token cookie

See the [frontend README](./Frontend/README.md) for frontend scripts and routes, and the [backend README](./Backend/README.md) for configuration and API details.
