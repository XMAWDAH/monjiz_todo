<h1>
  <img src="frontend/public/logo.png" width="35" style="vertical-align: middle;">
  Monjiz
</h1>

**Monjiz** is a full-stack task management web designed to help users organize, track, and manage their daily tasks efficiently. The system provides a modern and responsive user interface with a powerful backend API.

The frontend is built with React, while the backend is powered by Laravel, providing a scalable and secure architecture for managing tasks.

## ✨ Features

* Create, update, and delete tasks
* Organize tasks easily
* Responsive and modern user interface
* Secure backend API
* Fast communication between frontend and backend

## ⚙️ Installation

### Clone the repository

```
git clone https://github.com/XMAWDAH/monjiz_todo.gi
```

### Backend Setup (Laravel)

```
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend Setup (React)

```
cd frontend
npm install
npm start
```

## 📂 Project Structure
```
/frontend  → React application
/backend   → Laravel API
```

