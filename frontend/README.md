# PrimeTrade Frontend (React & Vite)

[![Vercel](https://img.shields.io/badge/Vercel-Live%20Demo-black?style=for-the-badge&logo=vercel)](https://primetrade-internship-assignment.vercel.app)

---

🚀 **Live Production Link:** [primetrade-internship-assignment.vercel.app](https://primetrade-internship-assignment.vercel.app)

---

This is the interactive frontend portal built using **React.js**, **Vite**, and **Vanilla CSS** (Cyberpunk/Glassmorphic styling).

## Key Features Built:
1. **Interactive Auth Form**: Seamless transition between Register and Login.
2. **Dynamic Role Selection**: Register as `USER` or `ADMIN` directly via the UI toggle to instantly evaluate role-based access!
3. **Robust Axios Integration**: Dynamically intercepts outgoing requests to inject the JWT Bearer token into HTTP headers.
4. **Interactive Dashboard**: Search, filter by lifecycle status, create new items, and execute standard editing and deletion actions with beautiful visual toasts.

---

## Getting Started

### Prerequisites
1. Ensure **Node.js** and **npm** are installed on your system.
2. Ensure the **PrimeTrade Backend API** is up and running on `http://localhost:8080`.

### Installation & Launch
1. Open your terminal in this directory:
   ```bash
   cd frontend
   ```
2. Install the necessary packages:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the address shown (usually **[http://localhost:5173](http://localhost:5173)**).
5. Register a test user with a preferred role (USER or ADMIN) and explore the interactive dashboard!
