# 🌿 EcoBazaar  
**A Smart Marketplace for Sustainable Living**

EcoBazaar is a full-stack eco-commerce platform designed to encourage **responsible shopping** by showcasing **environment-friendly products**, **carbon impact metrics**, and **eco badges**. The platform connects conscious buyers with eco-friendly sellers, while administrators ensure quality through moderation and analytics.

---

## 🚀 Project Status  
✅ **Milestone 4 Completed** – Core features, admin workflows, analytics, AI modules, and UI enhancements implemented.

---

## 🧩 Technology Stack

### Backend  
- Java 17  
- Spring Boot  
- Spring Data JPA (Hibernate)  
- Spring Security  
- MySQL  
- JWT-based Authentication  
- RESTful APIs  

### Frontend  
- React  
- Axios  
- React Router  
- HTML, CSS, JavaScript  

---

## ✨ Key Features

### 👤 User & Role Management  
- Secure user registration and login  
- Password encryption using BCrypt  
- JWT authentication for session management  
- Role-based access: **USER, SELLER, ADMIN**  
- Personalized dashboards  

### 🛍️ Product Marketplace  
- Sellers can add, edit, and manage eco-products  
- Product images, descriptions, and carbon impact display  
- Eco-certification indicator  
- Admin approval workflow for product publishing  
- Only verified products are visible to customers  

### 🛒 Cart, Orders & Wishlist  
- Add/remove items from cart  
- Wishlist management  
- Place orders with order confirmation  
- View order history and detailed order view  
- Carbon impact summary for carts and orders  

### 🛡️ Admin Panel  
- Approve or reject seller registrations  
- Approve or reject product listings  
- View platform statistics (users, sellers, products)  
- Global carbon impact leaderboard  

### 🌱 Sustainability & Analytics  
- Carbon impact calculation and aggregation  
- Eco badges for users (e.g., Green Starter, Carbon Saver, Eco Hero)  
- User analytics dashboard (monthly carbon savings)  
- Downloadable sustainability reports  

### 🤖 AI Features  
- AI-based chatbot for user assistance  
- AI-powered sustainability insights and reports  
- Recommendation module for eco-friendly alternatives  

### 🔐 Security  
- Spring Security integration  
- JWT-based protected endpoints  
- Role-based authorization for APIs  

---

## 🗂️ Project Structure

- `backend/` – Spring Boot REST API  
- `ecobazaar-frontend/` – React frontend application  
- `database/` – MySQL schema/configuration (if applicable)  

---

## ⚙️ Run the Project Locally

### ▶️ Backend  
```bash
cd backend
mvn spring-boot:run
````

Backend runs on: `http://localhost:8082`

### ▶️ Frontend

```bash
cd ecobazaar-frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

---

## 📌 Completed Milestones (Up to Milestone 4)

* ✅ Authentication & Authorization (JWT, Roles)
* ✅ Product management (Seller + Admin approval)
* ✅ Cart, Wishlist & Orders
* ✅ Admin dashboards & analytics
* ✅ Sustainability features (carbon impact, eco badges)
* ✅ AI chatbot & recommendation modules
* ✅ UI improvements and role-based navigation

---

## 🔮 Future Scope

* Payment gateway integration
* Real-time notifications (email/SMS)
* Cloud deployment (AWS/Azure)
* Mobile application version
* Advanced AI recommendations and insights

---

## 📜 License

This project is licensed under the **MIT License**.

