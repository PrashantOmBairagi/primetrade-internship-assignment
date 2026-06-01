# 🌟 PrimeTrade Developer Assignment

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.14-brightgreen?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=for-the-badge&logo=mysql)](https://www.mysql.com/)
[![Vite](https://img.shields.io/badge/Vite-5.2-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-Live%20Demo-black?style=for-the-badge&logo=vercel)](https://primetrade-internship-assignment.vercel.app)

---

### 🌐 Live Production Site
🚀 **Access Deployed Frontend:** [👉 primetrade-internship-assignment.vercel.app](https://primetrade-internship-assignment.vercel.app)

---

Welcome to the **PrimeTrade assignment repository**! This is an authentic, structured, and premium implementation of a secure REST API with Role-Based Access Controls (RBAC) powered by a high-aesthetic, glassmorphic React SPA interface.

---

## 🗺️ System Architecture

The following diagram illustrates the secure data flow and stateless architecture of the application:

```
┌─────────────────┐       HTTPS Requests with Bearer Token       ┌──────────────────────────┐
│   React App     │ ───────────────────────────────────────────> │    Strict HTTP Firewall  │
│  (Vite Client)  │ <─────────────────────────────────────────── │  (Blocks Double Slashes) │
└─────────────────┘             JSON HTTP Response               └──────────────────────────┘
         ▲                                                                     │
         │ Authenticates & retrieves JWT                                       ▼
         │                                                       ┌──────────────────────────┐
         │                                                       │       JwtAuthFilter      │
         │                                                       │ (Intercepts & Validates) │
         │                                                       └──────────────────────────┘
         │                                                                     │
         │                                                                     ▼
         │                                                       ┌──────────────────────────┐
         │                                                       │    SecurityFilterChain   │
         │                                                       │ (Enforces URL privileges)│
         └────────────────────────────────────────────────────── └──────────────────────────┘
                                                                               │
                                                                               ▼
┌─────────────────┐             Relational DB Mapping            ┌──────────────────────────┐
│    MySQL DB     │ <─────────────────────────────────────────── │      TaskController      │
│  (Port 3306)    │                                              │      (REST Endpoint)     │
└─────────────────┘                                              └──────────────────────────┘
```

---

## 🚀 Key Features

*   **🔒 Stateless JWT Authentication:** Fully stateless authentication using cryptographically signed JSON Web Tokens (HMAC-SHA256).
*   **👥 Role-Based Access Control (RBAC):** Users can only access and modify their own tasks, while `ROLE_ADMIN` possesses global visibility to monitor and manage all tasks across the system.
*   **💎 Premium Glassmorphic UI:** A state-of-the-art React frontend styled with custom glassmorphism, responsive grids, sleek micro-animations, and dynamic visual indicators.
*   **📖 Swagger OpenAPI Docs:** Complete interactive api sandbox with standard authentication schemes for easy route testing.
*   **🛡️ Robust Exception Handling:** Unified global JSON error dispatching for predictable REST consumption.

---

## 📂 Project Structure

```
primetrade-assignment/
├── backend/                   ← Standard Maven Spring Boot project
│   ├── src/main/java/com/primetrade/assignment/
│   │   ├── auth/              ← JWT Sign-in / Sign-up Controllers & DTOs
│   │   ├── enumeration/       ← Role & TaskStatus Enums
│   │   ├── exception/         ← Centralized global REST JSON Exception handlers
│   │   ├── security/          ← Security configuration, JWT Filter, Firewall rules
│   │   ├── tasks/             ← Task entities, CRUD Controllers & repositories
│   │   └── user/              ← User entities and JPA layer
│   ├── src/main/resources/    ← MySQL Database profiles
│   ├── pom.xml                ← Dependencies (Spring Security, Springdoc OpenAPI)
│   └── README.md              ← Detailed backend launch guidelines
│
├── frontend/                  ← Modern React (Vite) project
│   ├── src/
│   │   ├── api/               ← Axios client containing JWT request interceptors
│   │   ├── components/        ← Modular Card, Navbar, and responsive grids
│   │   ├── pages/             ← State-routed Login, Register, & Dashboard views
│   │   ├── index.css          ← Core design system & modern layout variables
│   │   └── App.jsx            ← SPA Root controller
│   ├── package.json           ← Node dependencies configuration
│   └── README.md              ← Detailed frontend launch guidelines
│
└── postman/
    └── PrimeTrade_API.postman_collection.json  ← Importable API test suite
```

---

## ⚡ Quick Start: Running both Projects

### Step 1: Run the Backend (Spring Boot + MySQL)

1. Ensure your local **MySQL** service is running on port `3306`.
2. Connect to MySQL and create the schema:
   ```sql
   CREATE DATABASE IF NOT EXISTS primetrade;
   ```
3. Open IntelliJ IDEA (or your favorite Java IDE), choose **Open**, and select the `backend/` directory.
4. Allow your IDE to load the project and download all Maven dependencies.
5. Click **Run** on `AssignmentApplication.java`. The backend will start on **`http://localhost:8080`**.
6. Access interactive API documentation instantly at: **[http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)**.

> [!WARNING]
> Always use a single slash when navigating to endpoints. Visiting `http://localhost:8080//swagger-ui.html` (with a double slash) will be rejected by Spring's `StrictHttpFirewall` to prevent directory traversal vulnerabilities.

### Step 2: Run the Frontend (React + Vite)

1. Open your terminal and navigate to the `frontend/` directory.
2. Install the package dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Click the output link (**`http://localhost:5173`**) in your browser, select **Register / Create one**, choose a role (`USER` or `ADMIN`), and start exploring the premium interface!

---

## 🌐 API Endpoint Specifications

All endpoints (except Authentication) require the following request header:
`Authorization: Bearer <Your_JWT_Token>`

### 🔑 Authentication Services
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Register a new user account & return credentials + JWT | Public |
| `POST` | `/api/v1/auth/login` | Authenticate user credentials & return new JWT | Public |

### 📋 Task Management Services
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/tasks` | Create a new task for the authenticated user | Authenticated |
| `GET` | `/api/v1/tasks` | Get tasks (Admins fetch all; Users fetch owned) | Authenticated |
| `GET` | `/api/v1/tasks/{id}` | Get detailed task specs by ID | Owner / Admin |
| `PUT` | `/api/v1/tasks/{id}` | Update task title, description, or status | Owner / Admin |
| `DELETE` | `/api/v1/tasks/{id}` | Delete task | Owner / Admin |

---

## 🧠 Core Educational Concepts Explained

### 1. Many-to-One JPA Relational Mapping
*   **File location:** [Task.java](file:///e:/primetrade-assignment/backend/src/main/java/com/primetrade/assignment/tasks/Task.java)
*   **Mechanism:** `@ManyToOne` maps multiple task records to a single user key in the database. Hibernate automatically creates a foreign key column named `user_id` inside the `tasks` table. We use `@JsonIgnore` on the User's tasks list to break potential infinite recursion loops during JSON serialization.

### 2. Stateless JWT Filter Implementation
*   **File location:** [JwtAuthFilter.java](file:///e:/primetrade-assignment/backend/src/main/java/com/primetrade/assignment/security/JwtAuthFilter.java) & [SecurityConfig.java](file:///e:/primetrade-assignment/backend/src/main/java/com/primetrade/assignment/security/SecurityConfig.java)
*   **Mechanism:** When a client authenticates successfully, the server issues a signed HMAC-SHA256 token containing username and roles. The React application intercepts outgoing requests to inject this token. On the backend, `JwtAuthFilter` extracts, validates, and populates Spring's Security context dynamically for every request without using session state.

### 3. Integrated Open-API Configuration
*   **File location:** [pom.xml](file:///e:/primetrade-assignment/backend/pom.xml#L50-L53)
*   **Mechanism:** By integrating `springdoc-openapi-starter-webmvc-ui`, Spring Boot automatically scans Rest Controllers and generates a visually engaging testing interface. Security configurations have been customized to allow testing endpoints directly by supplying your bearer token inside the Swagger UI authorize modal.

---

## 📈 Scalability & Production-Readiness Roadmap

To scale this application in production:

1.  **Decouple Layer Entities with DTOs:** Create dedicated Data Transfer Objects (DTOs) for incoming and outgoing data. This prevents exposing internal database entity attributes (like hashed passwords or relations) to the API consumers.
2.  **Add Composite DB Indexes:** Add a database index on the composite fields `tasks(user_id, status)` in MySQL to radically accelerate query speeds as the active task table grows to millions of rows.
3.  **Implement Lazy Loading:** Relational lists (e.g., `tasks` in `User.java`) should always utilize `FetchType.LAZY` loading to prevent costly recursive select statements when querying user metadata.
4.  **Distributed Session Cache (Redis):** Set up a Redis cache to store active token blacklists or frequently consulted static dashboard tasks. This eliminates redundant, expensive database reads on every single authenticated request.
5.  **Microservices Architecture:** Extract the authentication logic into a dedicated **Auth Microservice** that signs and validates JWTs, freeing up downstream API worker nodes to handle domain-specific features asynchronously.
6.  **Horizontal Scale via Load Balancing:** Deploy stateless Spring instances inside container groups (e.g., Docker & Kubernetes) behind an NGINX or AWS Application Load Balancer. Since state is offloaded to the JWT and database, any node can securely process any user request!
