# 🌿 Greenview Hostel Management System

A full-stack web application built with the MERN stack to digitize and streamline hostel management operations for Greenview Hostel.

## 🚀 Tech Stack

- **Frontend:** React.js 18 + Vite + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas
- **Auth:** JWT + bcryptjs

## ✨ Features

### Admin

- Register and manage students
- Mark daily attendance
- Generate and track mess fee invoices
- Manage complaints and suggestions
- Approve or reject mess-off requests
- Export student data as CSV

### Student

- View attendance with doughnut chart
- View paid and pending invoices
- Submit complaints and suggestions
- Apply for mess-off leave
- Track request statuses

## 🛠️ Setup & Installation

### Prerequisites

- Node.js installed
- MongoDB Atlas account

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in the `/backend` folder:

### Seed Database

```bash
cd backend
node seed_full.js
```

## 👤 Default Credentials

| Role    | Email               | Password      |
| ------- | ------------------- | ------------- |
| Admin   | admin@greenview.com | admin1234     |
| Student | aryan@greenview.com | Student@1234 |

## 📁 Project Structure

Hostel-MERN-main/
├── backend/ # Express.js API
│ ├── models/ # MongoDB schemas
│ ├── controllers/ # Business logic
│ ├── routes/ # API endpoints
│ └── utils/ # JWT & DB connection
└── client/ # React.js frontend
└── src/
└── components/
├── LandingSite/
├── Dashboards/
│ ├── AdminDashboard/
│ └── StudentDashboard/
└── Common/
