# Smart Prep Tracker 🚀

A full-stack web application to help users track coding problems, monitor progress, and stay consistent with interview preparation.

---

## 🔹 Features

- User authentication using JWT (Register / Login)
- Add, update, delete coding problems
- Track problem status (Not Started / In Progress / Solved)
- Filter problems by topic and difficulty
- Pagination for large problem lists
- Analytics dashboard showing progress stats
- Protected routes and secure APIs
- Responsive and clean UI

---

## 🔹 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt for password hashing

---

## 🔹 Project Structure

smart-prep-tracker/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── src/
│ ├── pages/
│ ├── components/
│ ├── services/
│ └── App.jsx
│
└── README.md


---


## Setup Instructions

## 🔹 How to Run Locally

### 1️ Clone Repository
```bash
git clone https://github.com/Chen-29sb/smart-prep-tracker.git
cd smart-prep-tracker

**### 2 Backend Setup**

```bash
cd backend
npm install

Create a .env file inside the backend directory:

.env file-->
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the backend server-->
npm start

Backend runs on-->
http://localhost:5000


-----

**### 3 Frontend Setup**

cd frontend
npm install
npm run dev

Frontend runs on--->
http://localhost:5173

----

**### 4 API Routes**

Authentication

POST /api/auth/register
POST /api/auth/login

Problems (Protected)

GET /api/problems
POST /api/problems
PUT /api/problems/:id
DELETE /api/problems/:id

-----

**###Security Design**

JWT verification handled in backend
User ownership enforced using req.user._id
Frontend never sends user IDs
Axios interceptor attaches token automatically
Protected UI routes using a custom ProtectedRoute

-----

**###Key Learnings**

Full-stack authentication flow
Secure REST API development
Frontend–backend responsibility separation
React state management with hooks
Server-side pagination and filtering
Error and loading state handling
Scalable project architecture

-----

**AUTHOR - SHRISTI BHOMRAJKA**

-----

```md
**## 🔹 Screenshots**

### Login
![Login](docs/screenshots/login.png)

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Problems
![Problems](docs/screenshots/problems.png)

**###Note**
This project was built with a focus on backend correctness, security, and real-world full-stack practices rather than only UI design.


