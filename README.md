# Role-Based Leave Management System (MERN)

A full-stack **Role-Based Leave Management System** built using the **MERN stack**.  
This application supports real-world leave workflows with **authentication, authorization, and multi-level approvals**.

---

## 🚀 Tech Stack

### Frontend
- React (Hooks)
- React Router DOM
- Axios
- Custom CSS (UI-focused, logic-safe)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Authentication & Security
- JWT (JSON Web Tokens)
- Backend-enforced Role-Based Access Control (RBAC)

### Version Control
- Git & GitHub

---

## 👥 User Roles

### 👑 Admin
- View all leave requests
- Final approval / rejection of leaves
- Approve Manager leave requests
- Define and manage leave policies
- Logout

### 👔 Manager
- View employee leave requests
- Approve / reject employee leaves with remarks
- Cannot approve own leave
- Logout

### 🧑‍💼 Employee
- Apply for leave
- View leave history and status
- View leave policies
- Logout

---

## 🔄 Leave Workflow

1. Employee applies for leave  
2. Leave status → **Pending**  
3. Manager reviews employee leave  
4. Manager approves or rejects  
5. Admin gives **final approval**  
6. Approved leave deducts leave balance  
7. Status updates visible to all relevant roles  

This workflow mirrors real-world organizational leave systems.

---

## 📦 Data Models

### User
- name
- email
- password (hashed)
- role (Admin / Manager / Employee)
- isActive
- leaveBalance

### LeavePolicy
- name
- maxLeaves
- description

### LeaveRequest
- user
- policy
- fromDate
- toDate
- reason
- status (Pending / Approved / Rejected)
- approvedBy
- remarks

---

## 🔐 Role Credentials (For Testing)

### Admin
Email: admin@company.com
Password: admin123


### Manager
Email: employee@company.com
Password: employee123

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/20255-CM-055/Leave-Management.git
cd Leave-Management

2️⃣ Backend Setup
cd backend
npm install

Create a .env file inside backend:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Seed the Admin user (one-time):
node config/seedAdmin.js

Start backend server:
npm run dev

Backend runs on:
http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

🔗 API Overview (Key Endpoints)
Authentication

POST /api/auth/login – Login user

Leave Policies

GET /api/policies – View leave policies

Leave Requests

POST /api/leaves – Apply leave (Employee)

GET /api/leaves/my – Employee leave history

GET /api/leaves/manager – Manager view

GET /api/leaves/all – Admin view

PATCH /api/leaves/:id/approve – Approve leave

PATCH /api/leaves/:id/reject – Reject leave
