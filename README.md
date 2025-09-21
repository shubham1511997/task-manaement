# Task Manager App

A full-stack **Task Manager Application** built with **Angular (frontend)**, **Node.js + Express (backend)**, and **MongoDB (database)**.  
It provides **user authentication with JWT** and full CRUD for tasks.

---

## 🚀 Features

- **User Authentication**
  - Register new users
  - Login with JWT authentication
  - Auto logout when token expires
  - Guards to restrict unauthorized access
- **Task Management**
  - Create, update, delete, and view tasks
  - Task status (default `Pending`)
  - Confirmation dialogs for add/edit/delete
- **Guards**
  - Prevent accessing login/register if logged in
  - Prevent accessing tasks without login

---

## 🛠️ Tech Stack

- **Frontend**: Angular + Angular Material + Bootstrap
- **Backend**: Node.js + Express
- **Database**: MongoDB (Atlas or local)
- **Authentication**: JWT (JSON Web Token)

---

## 📋 Prerequisites

Make sure you have the following installed on your computer:

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node)
- [Angular CLI](https://angular.io/cli)
- [MongoDB Atlas](https://www.mongodb.com/) (or local MongoDB)
- Git

---

## ⚙️ Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager

```

### 2. Backend Setup

```
cd backend
npm install

---create .env file---
PORT=4000
MONGO_URI=mongodb+srv://<db_username>:<db_password>@cluster0.mongodb.net/task-manager
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_jwt_secret

---run backend---
npm start
```

### 3. Setup Frontend

```
cd frontend
npm install
npm start
```

## Usage

```
Go to http://localhost:4200

Register a new account

Login with the same account

Add, edit, delete, and filter tasks

Logout when done
```

task-manager/
│
├── backend/ # Node.js + Express API
│ ├── src/
│ │ ├── models/ # Mongoose models
│ │ ├── routes/ # Express routes
│ │ ├── controllers/ # Controllers
│ │ └── index.js # App entry point
│ ├── package.json
│ └── .env
│
├── frontend/ # Angular app
│ ├── src/
│ │ ├── app/
│ │ │ ├── services/ # Auth + Task services
│ │ │ ├── guards/ # Auth guards
│ │ │ └── components/ # UI components
│ ├── angular.json
│ └── package.json
│
└── README.md
