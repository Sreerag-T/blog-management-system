# Blog Management System

A simple full-stack blog management application built using Django REST Framework and React.js.

The application allows users to create and manage blog posts, comment on posts, and ensures that users can only modify the content they own.

## Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- Simple JWT Authentication
- SQLite

### Frontend
- React.js
- React Router
- Axios
- Vite

---

## Features

- User authentication using JWT
- Admin can create users through Django Admin
- Users can create, edit and delete their own blog posts
- View blog posts from other users
- Add comments to blog posts
- Edit and delete own comments
- Authorization checks to prevent users from modifying other users' content

---

## Project Structure

```
blog-management-system/
│
├── backend/
│   ├── accounts/
│   ├── blog/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# Backend Setup

### Clone the repository

```bash
git clone https://github.com/Sreerag-T/blog-management-system.git
```

Go to backend

```bash
cd blog-management-system/backend
```

Create virtual environment

### Windows

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### Linux/macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run migrations

```bash
python manage.py migrate
```

Create admin user

```bash
python manage.py createsuperuser
```

Run backend server

```bash
python manage.py runserver
```

Backend runs at

```
http://127.0.0.1:8000/
```

---

# Frontend Setup

Go to frontend folder

```bash
cd ../frontend
```

Install packages

```bash
npm install
```

Create environment file

Windows

```powershell
Copy-Item .env.example .env
```

Linux/macOS

```bash
cp .env.example .env
```

Start React application

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173/
```

---

## Login

Create users from Django Admin.

Use those credentials to log into the React application.

---

## API Endpoints

### Authentication

```
POST /api/token/
POST /api/token/refresh/
```

### Blog

```
GET /api/posts/
POST /api/posts/
GET /api/posts/<id>/
PUT /api/posts/<id>/
DELETE /api/posts/<id>/
```

### Comments

```
POST /api/comments/
PUT /api/comments/<id>/
DELETE /api/comments/<id>/
```

---

## Authorization

- Users can only edit or delete their own blog posts.
- Users can only edit or delete their own comments.
- All authenticated users can view blog posts.

---

## Future Improvements

- Search functionality
- Pagination
- User profile page
- Rich text editor
- Image upload
- Like and bookmark feature

---

## Author

Sreerag T


### Github

https://github.com/Sreerag-T/blog-management-system


### Admin Details

username : admin
password : admin@123
