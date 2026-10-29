# Backend

The backend is an Express 5 API backed by MongoDB and Mongoose. It provides account registration and email verification, token-based authentication, password-reset endpoints, and user-owned notes.

## Requirements

- Node.js and npm
- A MongoDB database
- Gmail OAuth2 credentials for sending verification and password-reset emails

## Setup

From this directory, install the dependencies:

```bash
npm install
```

Create a `.env` file in `Backend/` with the configuration required by `src/config/config.js`:

```env
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/mern-practice
JWT_SECRET=replace-with-a-long-random-secret
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
GOOGLE_REFRESH_TOKEN=your-google-oauth-refresh-token
GOOGLE_USER=your-gmail-address
```

Use your own MongoDB connection string and OAuth2 credentials. The server exits during startup when a required variable is missing.

## Run

```bash
npm start
```

This runs `node server.js`; the API listens on `http://localhost:<PORT>`. `npm run dev` runs `nodemon server.js`, but `nodemon` is not listed as a project dependency and must be available separately. The backend does not currently have a configured test suite; `npm test` is a placeholder that exits with an error.

The CORS allowlist in `src/app.js` includes `https://frontend-y50p.onrender.com` and `http://localhost:5173`. If your frontend uses another origin, add it to that list.

## API

The API is mounted at `/api/auth` and `/api/user`. Authenticated requests require an access token in the `Authorization` header. The refresh endpoint reads the HTTP-only `refreshToken` cookie; browser clients should send credentials so the cookie is included.

### Authentication — `/api/auth`

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Register with a username, email, and password; sends an email verification code. |
| `POST` | `/api/auth/login` | Public | Sign in with an email and password. |
| `POST` | `/api/auth/verify-email` | Public | Verify an email using the submitted one-time code (`otp`). |
| `POST` | `/api/auth/refresh` | Refresh cookie | Issue a new access token. |
| `GET` | `/api/auth/get-me` | Authenticated | Return the current user's basic profile. |
| `GET` | `/api/auth/logout` | Authenticated | End the current session and clear the refresh-token cookie. |
| `POST` | `/api/auth/forgot-password` | Public | Send a one-time code to the email in the request body. |
| `POST` | `/api/auth/reset-password/:email` | Public | Set a new password using `newPassword` in the request body. |

The password-reset endpoint currently changes the password by email and new password; it does not validate the one-time code.

### Notes — `/api/user`

All note endpoints require authentication. Notes are scoped to the current user.

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/user/create-note` | Create a note; request body requires `title` and `description`. |
| `GET` | `/api/user/get-notes` | List the current user's notes. |
| `PUT` | `/api/user/update-note/:noteId` | Update a note's `title` and `description`. |
| `DELETE` | `/api/user/delete-note/:noteId` | Delete one of the current user's notes. |

## Project structure

```text
server.js
src/
├── app.js                 # Middleware, CORS, database connection, and API mounting
├── config/                # Environment configuration and MongoDB connection
├── controllers/           # Authentication and note request handlers
├── middlewares/           # Access-token authentication
├── models/                # User, session, OTP, note, and blacklist models
├── routes/                # Authentication and user/note routes
├── services/              # Email delivery
└── utils/                 # Shared utilities
```

For frontend setup and local API connection, see the [frontend README](../Frontend/README.md).
