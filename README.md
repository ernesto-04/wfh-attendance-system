# WFH Attendance & Employee Monitoring System

A full-stack web application that enables employees to submit work-from-home attendance records and allows HR administrators to manage employee data and monitor attendance submissions.

## Features

- JWT Authentication
- Role-Based Access Control (Admin / Employee)
- Employee Management
- Attendance Check-In with Photo Upload
- Attendance History
- Attendance Monitoring Dashboard

---

## Tech Stack

### Backend
- NestJS
- TypeScript
- Prisma ORM
- MySQL
- JWT Authentication
- Multer (File Upload)

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router

### Deployment
- Vercel (Frontend)
- Railway (Backend & Database)

---

## System Architecture

```text
React Frontend
      │
      ▼
NestJS REST API
      │
      ▼
Prisma ORM
      │
      ▼
MySQL Database
```

---

## Screenshots

### Login Page

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/ddf4509d-0352-406d-923f-10cddeae02d6" />

### Dashboard

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/3a7daa74-148e-4496-84b7-6a1d777a7859" />

### Attendance Check-In


<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/db856fba-f253-45e0-8832-a0627640551a" />

### Attendance History

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/87814cc0-c18c-4cf7-9130-eeb6b6d681f9" />

### Employee Management

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/70e09cb2-e18e-4dd2-81ab-54e20f829397" />

---

## Demo Accounts

### Admin

```text
Email: admin@test.com
Password: Admin123!
```

### Employee

```text
Email: employee@test.com
Password: Employee123!
```

---

## Local Setup

### Backend

```bash
npm install
npx prisma migrate dev
npm run start:dev
```

### Frontend

```bash
npm install
npm run dev
```
