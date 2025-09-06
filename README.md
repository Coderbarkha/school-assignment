# School Assignment Project

## Summary
This is a **mini-project** built using **React** (frontend) and **Node.js + Express** (backend) with **MySQL** database.  
The project allows users to **add schools** and **view the list of schools** in a responsive card layout.

The project consists of two main pages:

1. **Add School (`AddSchool.jsx`)**  
   - A form to input and store school data in the database.
   - Fields: `name`, `address`, `city`, `state`, `contact`, `email_id`, `image`.
   - Input validation (e.g., email and contact number) using `react-hook-form`.
   - Upload school images stored in the `schoolImages` folder.
   - Responsive for both desktop and mobile.

2. **Show Schools (`ShowSchools.jsx`)**  
   - Displays a list of all schools in a card layout (like an e-commerce site).
   - Only shows `name`, `address`, `city`, and `image`.
   - Includes delete functionality for removing a school.
   - Fully responsive for desktop and mobile.

---

## Tech Stack
- **Frontend:** React, Bootstrap, Axios, React Router DOM, react-hook-form
- **Backend:** Node.js, Express, Multer (for image upload), MySQL
- **Database:** MySQL

---

## Features
- Add school data with image upload.
- Input validation for email and contact number.
- View all schools in a responsive card layout.
- Delete schools directly from the UI.
- Fully responsive design for desktop and mobile.

---

## Installation & Setup

### Backend
1. Navigate to the `backend` folder:
 1. Navigate to the `backend` folder:
   ```bash
   cd backend
2. Install Dependencies
 npm install
3.Create .env file with your MySQL credentials:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=schooldb
4.Start the server:
node server.js

The backend will run at http://localhost:5000.


### Frontend
1.Navigate to the frontend folder:
cd frontend
2.Install dependencies:
npm install
3.Start the React app:
npm start

The frontend will run at http://localhost:3000.

Usage:
Usage

1.Go to Add School page to add a new school.

2.Fill out the form and upload an image.

3.After submitting, navigate to Show Schools page to view all schools.

4.Delete a school using the delete button.


###Screenshots
<img width="542" height="610" alt="addschool" src="https://github.com/user-attachments/assets/33ffb290-ffa7-4fa3-a10d-089622a9c9b3" />

<img width="1243" height="579" alt="showschool" src="https://github.com/user-attachments/assets/554fb532-4086-47d8-820e-a3f955a94f00" />

GitHub Repository

https://github.com/Coderbarkha/school-assignment




   ```bash
   cd backend
