# Blog Management System — Backend (Django + DRF)

## Tech
- Django 5
- Django REST Framework
- Simple JWT (authentication)
- SQLite (default, zero-config for local dev)

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt

python manage.py migrate
python manage.py createsuperuser   # this is your "administrator"
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/api/`.

## Creating users (as the administrator)

Since only admins can create users, do either of these:

1. **Django admin UI** — go to `http://127.0.0.1:8000/admin/`, log in with your
   superuser, and create users under Authentication and Authorization → Users.
2. **API** — log in as the superuser to get an access token, then:

```bash
POST /api/accounts/users/
Authorization: Bearer <admin_access_token>
{
  "username": "jdoe",
  "email": "jdoe@example.com",
  "password": "somepassword123"
}
```

## Authentication

JWT-based. Tokens are obtained via:

```
POST /api/accounts/login/       { "username": "...", "password": "..." }
POST /api/accounts/login/refresh/   { "refresh": "<refresh_token>" }
```

Send the access token as `Authorization: Bearer <token>` on subsequent requests.

## API Endpoints

| Method | Endpoint                  | Description                          | Auth required |
|--------|----------------------------|---------------------------------------|----------------|
| POST   | /api/accounts/login/       | Obtain access/refresh token pair      | No             |
| POST   | /api/accounts/login/refresh/ | Refresh access token                | No             |
| GET    | /api/accounts/me/          | Current user's profile                | Yes            |
| GET/POST | /api/accounts/users/      | List/create users (admin only)        | Yes (admin)    |
| GET    | /api/posts/                | List all posts                        | No             |
| POST   | /api/posts/                | Create a post                         | Yes            |
| GET    | /api/posts/{id}/           | Post detail, includes comments        | No             |
| PATCH/PUT | /api/posts/{id}/         | Update a post (author only)           | Yes (owner)    |
| DELETE | /api/posts/{id}/           | Delete a post (author only)           | Yes (owner)    |
| GET    | /api/comments/?post={id}   | List comments for a post              | No             |
| POST   | /api/comments/             | Add a comment (`post`, `content`)     | Yes            |
| PATCH/PUT | /api/comments/{id}/      | Update a comment (author only)        | Yes (owner)    |
| DELETE | /api/comments/{id}/         | Delete a comment (author only)        | Yes (owner)    |

## Design notes

- Ownership is enforced with a custom `IsOwnerOrReadOnly` object-level
  permission — anyone can read, only the author can write/delete.
- User provisioning is admin-only by design (no public signup), per the
  assignment's requirement that an administrator creates users.
- `SECRET_KEY`, `DEBUG`, and `ALLOWED_HOSTS` are set for local development.
  Before deploying, move `SECRET_KEY` to an environment variable, set
  `DEBUG=False`, and restrict `ALLOWED_HOSTS`.
