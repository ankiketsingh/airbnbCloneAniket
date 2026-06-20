# 🌍 Wanderlust

A full-stack property listing web application inspired by Airbnb.

🚀 **Live Demo:** https://airbnbcloneaniket-2.onrender.com
💻 **GitHub Repository:** https://github.com/ankiketsingh/airbnbCloneAniket

---

## 📖 Overview

Wanderlust is a full-stack web application where users can explore property listings, view listing details, create their own listings, upload images, write reviews, and manage their account.

The project follows MVC architecture and uses server-side rendering with EJS.

---

## ✨ Features

* 📱 Responsive UI for mobile, tablet, and desktop
* 🔐 User signup, login, and logout
* 🛡️ Authentication and authorization using Passport.js
* 🏠 Create, edit, and delete property listings
* ⭐ Add and delete reviews
* ☁️ Upload property images using Cloudinary
* 🗺️ Interactive property location maps using Mapbox
* 💬 Flash messages for success and error notifications
* 🕒 Session management with MongoDB session store
* ✅ Server-side validation using Joi
* 🔒 Password hashing using Passport Local Mongoose
* 🎯 RESTful routing and MVC architecture

---

## 🎯 Project Purpose

This project was built as a major full-stack web development project to practice real-world backend concepts such as:

* MVC architecture
* RESTful routes
* User authentication and authorization
* MongoDB database operations
* Session and cookie handling
* Image uploads with Cloudinary
* Error handling and validation
* Deployment using Render
* Git and GitHub workflow

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* Bootstrap
* JavaScript
* EJS
* EJS-Mate

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication and Security

* Passport.js
* Passport Local
* Passport Local Mongoose
* Express Session
* Connect Mongo
* Connect Flash

### Other Tools

* Cloudinary
* Multer
* Mapbox
* Joi
* Render
* GitHub

---

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/ankiketsingh/airbnbCloneAniket.git
cd airbnbCloneAniket
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Create environment variables

Create a `.env` file in the root directory:

```env
SECRET=thisisasecret

CLOUD_NAME=dfhatnx2m
CLOUD_API_KEY=787267847344268
CLOUD_API_SECRET=cu3acLLGwFVaTaFb0KEa8qWYtx4


ATLASH_DB_URL=mongodb+srv://sankaryadav8092_db_user:g1CLQqJLuUcll5Nu@cluster0.2zlaare.mongodb.net/?appName=Cluster0
```

> Never upload your `.env` file or secret keys to GitHub.

### 4. Start the server

```bash
nodemon app.js
```

Open this in your browser:

```text
http://localhost:8080/listings
```

---

## 📂 Project Structure

```text
airbnbCloneAniket/
│
├── controllers/          # Request handling and business logic
├── init/                 # Initial sample data and database setup
├── models/               # Mongoose models: Listing, User, Review
├── public/               # Static files: CSS, JavaScript, images
├── router/               # Express routes for listings, reviews, and users
├── util/                 # Utility files: wrapAsync and ExpressError
├── views/                # EJS templates
│   ├── includes/         # Navbar, footer, flash messages
│   ├── layouts/          # Boilerplate layout files
│   ├── listings/         # Listing pages
│   └── users/            # Login and signup pages
│
├── app.js                # Main application entry point
├── cloudConfig.js        # Cloudinary configuration
├── middleware.js         # Authentication and validation middleware
├── schemajoi.js          # Joi validation schemas
├── package.json
└── README.md
```

---

## 🔗 Deployment

The application is deployed on Render.

**Live Link:**  https://airbnbcloneaniket-2.onrender.com

---

## 👨‍💻 Author

**Aniket Kumar**

* GitHub: https://github.com/ankiketsingh
* Project Repository: https://github.com/ankiketsingh/airbnbCloneAniket

---

Developed with ❤️ while learning Full Stack Web Development through the Apna College Web Development Bootcamp.
