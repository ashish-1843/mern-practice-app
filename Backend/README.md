# Backend

The backend is a Node.js and Express API using MongoDB through Mongoose. It currently provides account registration, login, email verification, token refresh, session restoration, and logout endpoints.

## Requirements

- Node.js and npm
- MongoDB connection string
- Gmail OAuth2 credentials for sending verification emails

## Setup

From this folder, install dependencies:

```bash
npm install
```

Create a `.env` file in this folder and provide the configuration keys below. Use your own values; do not commit `.env` or share its credentials.


All listed variables are required at startup. `GOOGLE_*` values are used by Nodemailer to send mail through Gmail OAuth2.

## Run the API

```bash
npm run dev
```

The development script starts `server.js` using `npx nodemon`. The API listens on the `PORT` set in `.env`; the frontend is configured to call `http://localhost:3000` and the API currently allows the `http://localhost:5173` CORS origin.

## API

All endpoints are prefixed with `/api/auth`.

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/register` | Public | Register with a username, email, and password. |
| `POST` | `/login` | Public | Sign in with an email and password. |
| `POST` | `/verify-email` | Public | Verify an email using the submitted one-time code. |
| `POST` | `/refresh` | Public | Issue a new access token using the refresh-token cookie. |
| `GET` | `/get-me` | Authenticated | Return the current user using the bearer access token. |
| `GET` | `/logout` | Authenticated | Log out of the current session. |
| `POST` | `/create-note` | Authenticated | Create a new note for the authenticated user. |
| `GET` | `/get-notes` | Authenticated | Retrieve all notes for the authenticated user. |
| `PUT` | `/update-note/:noteId` | Authenticated | Update a note for the authenticated user. |
| `DELETE` | `/delete-note/:noteId` | Authenticated | Delete a note for the authenticated user. |

The frontend sends requests with credentials enabled and attaches the access token as a bearer token. The refresh endpoint relies on the refresh-token cookie.

## Packages

| Package | Use |
| --- | --- |
| `bcrypt` | Hash passwords and other sensitive values. |
| `cookie-parser` | Read cookies on incoming requests. |
| `cors` | Configure cross-origin requests from the frontend. |
| `dotenv` | Load configuration from `.env`. |
| `express` | HTTP server and API routing. |
| `jsonwebtoken` | Create and verify JSON Web Tokens. |
| `mongoose` | MongoDB connection and data models. |
| `nodemailer` | Send email through Gmail OAuth2. |

## Project structure

```text
server.js                  # Starts the configured Express app
src/
├── app.js                 # Middleware, database connection, and API mounting
├── config/                # Environment configuration and MongoDB connection
├── controllers/           # Authentication endpoint handlers
├── middlewares/           # Access-token authentication
├── models/                # User, session, OTP, and token blacklist models
├── routes/                # Authentication routes
├── services/              # Email delivery
└── utils/                 # Shared utilities
```

## Tests

There is no backend test suite configured yet. The current `npm test` script is a placeholder and exits with an error.
