project:
  name: "EcoBazaar – Carbon Footprint Aware Shopping Assistant"
  description: >
    EcoBazaar is a full-stack web application designed to promote sustainable shopping
    by showcasing eco-friendly products along with their carbon impact and eco-certification
    status. The platform supports role-based access where sellers can upload products and
    users can browse eco-friendly alternatives.

features:
  - "User Authentication (Register & Login) using JWT"
  - "Role-Based Access (USER, SELLER)"
  - "Public Product Listing"
  - "Seller-only Product Upload with Image Upload"
  - "Product Attributes: name, description, price, carbon impact, eco certification"
  - "Responsive Frontend UI"

tech_stack:
  backend:
    - "Java"
    - "Spring Boot"
    - "Spring Security + JWT"
    - "Hibernate / JPA"
    - "MySQL"
  frontend:
    - "React.js"
    - "Axios"
    - "React Router DOM"

project_structure:
  backend:
    description: "Spring Boot backend application"
    folders:
      - "src/main/java"
      - "src/main/resources"
      - "uploads (ignored in git)"
  frontend:
    description: "React frontend application"
    folders:
      - "src"
      - "public"
      - "package.json"

setup:
  backend:
    steps:
      - "Navigate to backend directory"
      - "Configure application.properties with MySQL credentials"
      - "Run: mvn spring-boot:run"
    runs_on: "http://localhost:8082"
  frontend:
    steps:
      - "Navigate to ecobazaar-frontend directory"
      - "Run: npm install"
      - "Run: npm start"
    runs_on: "http://localhost:3000"

api_endpoints:
  auth:
    - name: "Register"
      method: "POST"
      path: "/api/auth/register"
      description: "Register a new user (USER or SELLER)"
    - name: "Login"
      method: "POST"
      path: "/api/auth/login"
      description: "Authenticate user and return JWT token"
  products:
    - name: "Get All Products"
      method: "GET"
      path: "/api/products"
      access: "Public"
    - name: "Add Product"
      method: "POST"
      path: "/api/products"
      access: "SELLER only"
      content_type: "multipart/form-data (supports image upload)"

demo_dataset:
  description: "Mini dataset of eco-friendly products used for demo and testing"
  items:
    - "Bamboo Toothbrush"
    - "Reusable Steel Bottle"
    - "Cloth Shopping Bag"
    - "Wooden Cutlery Set"
    - "Recycled Paper Notebook"
    - "Bamboo Straw Set"
    - "Eco Soap Bar"
    - "Compostable Plates"
    - "Solar Garden Light"
    - "Reusable Coffee Cup"

future_enhancements:
  - "Edit and Delete Product"
  - "Shopping Cart and Orders"
  - "Search and Filter Products"
  - "Admin Dashboard"
  - "Carbon Impact Analytics"

author:
  name: "Abhinaya Bolishetti"
  github: "https://github.com/Abhinaya-Bolishetti"

license:
  type: "Academic / Learning Use Only"
