# Backend

The backend is an Express 5 API backed by MongoDB and Mongoose. It provides email-verified accounts, cookie-based refresh tokens, authenticated sessions, and user-owned notes.

## Requirements

- Node.js and npm
- A MongoDB database and connection string
- A Gmail account configured for OAuth2 email delivery

## Setup

From this directory, install dependencies:

```bash
npm install
```

Create `Backend/.env` with the following required settings. Replace the example values with your own; never commit or share real credentials.

```dotenv
PORT=3000
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=replace-with-a-long-random-secret
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
GOOGLE_REFRESH_TOKEN=your-google-oauth-refresh-token
GOOGLE_USER=your-gmail-address
```

The server requires every variable above at startup. The `GOOGLE_*` values are used by Nodemailer to send verification email through Gmail OAuth2.

## Run

```bash
npm start
```

This runs `node server.js`; the API listens on `http://localhost:<PORT>`. `npm run dev` runs `nodemon server.js` and requires `nodemon` to be available in your environment.

The CORS origin is currently hard-coded in `src/app.js` as `https://frontend-y50p.onrender.com`. For local development, change it to the frontend origin (normally `http://localhost:5173`). The frontend API URL must also be changed to point to this backend; see [the frontend README](../Frontend/README.md#backend-connection).

## API

All endpoints accept and return JSON unless noted. Authenticated endpoints require an access token in the `Authorization` request header. The frontend sends requests with credentials enabled so the refresh-token cookie can be used.

### Authentication — `/api/auth`

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Register with a username, email, and password. |
| `POST` | `/api/auth/login` | Public | Sign in with an email and password. |
| `POST` | `/api/auth/verify-email` | Public | Verify an email using the submitted one-time code. |
| `POST` | `/api/auth/refresh` | Public (refresh cookie) | Issue a new access token. |
| `GET` | `/api/auth/get-me` | Authenticated | Return the current user. |
| `GET` | `/api/auth/logout` | Authenticated | End the current session. |

### Notes — `/api/user`

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/user/create-note` | Authenticated | Create a note; request body requires `title` and `description`. |
| `GET` | `/api/user/get-notes` | Authenticated | List notes belonging to the current user. |
| `PUT` | `/api/user/update-note/:noteId` | Authenticated | Update a note's `title` and `description`. |
| `DELETE` | `/api/user/delete-note/:noteId` | Authenticated | Delete a note belonging to the current user. |

## Project structure

```text
server.js
src/
├── app.js                 # Middleware, CORS, database connection, and API mounting
├── config/                # Environment configuration and MongoDB connection
├── controllers/           # Authentication and note request handlers
├── middlewares/           # Access-token authentication
├── models/                # User, session, OTP, note, and blacklist models
├── routes/                 # Authentication and user/note routes
├── services/              # Email delivery
└── utils/                 # Shared utilities
```

There is no backend test suite configured. The current `npm test` script is a placeholder and exits with an error.
