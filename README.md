# 🌱 EcoBazaar – Carbon Footprint Aware Shopping Assistant

EcoBazaar is a full-stack web application designed to promote sustainable shopping by showcasing eco-friendly products along with their carbon impact and eco-certification status. The platform supports role-based access where sellers can upload products and users can browse eco-friendly alternatives.

---

## 🚀 Features

- 🔐 User Authentication (Register & Login) using JWT
- 🧑‍💼 Role-Based Access (USER, SELLER)
- 🛍️ Product Listing with:
  - Name, description, price
  - Carbon impact
  - Eco-certified badge
  - Product images (file upload)
- 📦 Seller-only Product Upload
- 🌐 Public Product Browsing
- 🧭 Responsive Frontend UI

---

## 🛠️ Tech Stack

**Backend**
- Java, Spring Boot
- Spring Security + JWT Authentication
- MySQL Database
- Hibernate / JPA

**Frontend**
- React.js
- Axios
- React Router DOM

---

## 📁 Project Structure

Ecobazaar/
├── backend/ # Spring Boot Backend
│ ├── src/main/java
│ ├── src/main/resources
│ └── uploads/ # (ignored in git)
└── ecobazaar-frontend/ # React Frontend
├── src/
├── public/
└── package.json


---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup

```bash
cd backend
mvn spring-boot:run

Configure application.properties with your MySQL credentials.

2️⃣ Frontend Setup
cd ecobazaar-frontend
npm install
npm start

---

Frontend runs at: http://localhost:3000
Backend runs at: http://localhost:8082



🔐 API Endpoints (Sample)

POST /api/auth/register – Register user

POST /api/auth/login – Login and get JWT

GET /api/products – View all products (public)

POST /api/products – Add product (SELLER only, with image upload)

🧪 Demo Dataset

The project uses a mini dataset of eco-friendly products such as:

Bamboo Toothbrush

Reusable Steel Bottle

Cloth Shopping Bag

Wooden Cutlery Set

Recycled Paper Notebook

🏁 Future Enhancements

🗑️ Delete / Edit Product

🛒 Cart & Orders

🔎 Search & Filter Products

📊 Analytics Dashboard for Carbon Impact
