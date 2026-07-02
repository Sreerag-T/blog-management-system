# Blog Management System — Frontend (React + Vite)

## Tech
- React 18
- React Router
- Axios (with JWT access/refresh interceptors)

## Setup

```bash
cd frontend
npm install
cp .env.example .env    # adjust VITE_API_BASE_URL if your backend runs elsewhere
npm run dev
```

The app runs at `http://localhost:5173` and expects the backend at
`http://127.0.0.1:8000/api` by default (see `.env`).

## What's included
- `Login` — authenticates against `/api/accounts/login/`, stores JWT tokens
- `PostList` — public list of all blog posts
- `PostDetail` — full post + comments, with edit/delete for the post owner
- `PostForm` — create/edit a post (reused for both)
- `CommentList` — add, edit, delete comments (edit/delete restricted to the
  comment's own author, enforced both here and on the backend)

Auth state lives in `AuthContext`. The axios instance in `api/axios.js`
attaches the access token to every request and silently refreshes it on a
401 before retrying once.

## Build for production

```bash
npm run build
```

Outputs static files to `dist/`, which can be served by any static host
(or by Django/Nginx in front of the API).
