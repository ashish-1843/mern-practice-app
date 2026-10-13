# Frontend

A React + Vite frontend for the MERN app. It handles account creation, login, email verification, and a protected dashboard, while communicating with the Express backend in the sibling `Backend` folder.

## ✨ Features

- User registration
- Login flow with token-based session handling
- Email verification screen
- Protected dashboard route
- Responsive UI with React, Bootstrap, Tailwind, and custom shadcn-style components
- API integration with Axios and cookie-based refresh flow

## ✅ Requirements

Before running this app, make sure you have:

- Node.js and npm
- A version of Node supported by Vite 8
- The backend running locally at `http://localhost:3000`

## 🚀 Quick start

From this folder, run:

```bash
npm install
npm run dev
```

Then open:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

> The frontend API client and backend CORS settings are expected to match these local URLs. If you change ports, update both sides together.

## 📜 Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reloading. |
| `npm run build` | Build the production bundle in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run the project linter with Oxlint. |

## 🧭 App routes

| Route | Page | Access |
| --- | --- | --- |
| `/register` | Create an account | Public |
| `/login` | Sign in | Public |
| `/verify-email` | Enter the email verification code | Public |
| `/dashboard` | Dashboard and navigation | Requires authentication |
| `/dashboard/notes` | Notes management | Requires authentication |

Authentication is managed through the auth context. The app sends the access token on requests, uses credentialed requests for the refresh-token cookie, and restores the saved session when the app loads.

## 📦 Main dependencies

### Runtime dependencies

| Package | Purpose |
| --- | --- |
| `@base-ui/react` | Accessible UI primitives |
| `@fontsource-variable/geist` | Variable font assets |
| `@tailwindcss/vite` | Tailwind integration for Vite |
| `axios` | HTTP client for backend requests |
| `bootstrap` | Styling utilities |
| `class-variance-authority` | Component variant definitions |
| `cn` | Class-name utility |
| `lucide-react` | Icons |
| `react` | UI library |
| `react-bootstrap` | Bootstrap React components |
| `react-dom` | DOM rendering |
| `react-icons` | Additional icon set |
| `react-router` | Routing |
| `react-toastify` | Toast notifications |
| `sass` | Stylesheet preprocessing |
| `shadcn` | UI component setup and generation |
| `tailwindcss` | Utility-first CSS |
| `tw-animate-css` | Animation utilities |

### Development dependencies

| Package | Purpose |
| --- | --- |
| `@types/react` | React type definitions |
| `@types/react-dom` | React DOM type definitions |
| `@vitejs/plugin-react` | React support for Vite |
| `oxlint` | Linting |
| `vite` | Dev server and bundler |

This project includes shadcn configuration in `components.json` and shared UI components in `src/components/ui/`.

## 🗂️ Project structure

```text
src/
├── components/ui/       # Shared UI components
├── features/
│   ├── auth/            # Authentication context, pages, and API client
│   └── Dashboard/       # Dashboard page and navigation
├── lib/                 # Shared utilities
├── App.jsx              # App providers and router
├── app.routes.jsx       # Route definitions
└── ...
```

## 🔗 Backend connection

The API base URL is currently set in `src/features/auth/services/auth.api.js` to `http://localhost:3000`.

To run the full app, start the backend separately by following [the backend README](../Backend/README.md).

## 📝 Notes

- Use `npm install` before starting development.
- If you change the local server ports, update both the frontend API config and backend CORS config.
- This frontend is designed to work as a companion to the Express backend in the sibling folder.
