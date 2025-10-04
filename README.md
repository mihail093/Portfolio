<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=230&section=header&text=My%20Portfolio&fontSize=55&fontAlignY=33&desc=Full%20Stack%20MERN%20Application&descAlignY=56&descSize=26)

# 🌟 Personal Portfolio
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/) [![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) [![MongoDB](https://img.shields.io/badge/MongoDB-8.14-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/) [![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Status](https://img.shields.io/badge/status-active-success.svg)]() [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)]()

**A modern, responsive portfolio website with complete admin panel for content management**

[![Live Demo](https://img.shields.io/badge/Demo-Live-success?style=for-the-badge&logo=vercel)](https://portfolio-olive-seven-98.vercel.app/) [![Documentation](https://img.shields.io/badge/Docs-Read-blue?style=for-the-badge&logo=readthedocs)](#getting-started) [![Report Bug](https://img.shields.io/badge/Bug-Report-red?style=for-the-badge&logo=github)](https://github.com/mihail093/Portfolio/issues) [![Request Feature](https://img.shields.io/badge/Feature-Request-orange?style=for-the-badge&logo=github)](https://github.com/mihail093/Portfolio/issues)

</div>

---

## 📸 Screenshots

<div align="center">
  <img src="./screenshots/home-light-mode.webp" alt="Homepage Light Mode" width="45%"/>
  <img src="./screenshots/home-dark-mode.webp" alt="Homepage Dark Mode" width="45%"/>
  <br>
  <em>HOME PAGE Light and Dark Theme</em>
</div>

<br>

<div align="center">
  <img src="./screenshots/projects-light-mode.webp" alt="Projects Page Light Mode" width="45%"/>
  <img src="./screenshots/projects-dark-mode.webp" alt="Projects Page Dark Mode" width="45%"/>
  <br>
  <em>PROJECTS PAGE Light and Dark Theme</em>
</div>

<br>

<div align="center">
  <img src="./screenshots/contact-page.webp" alt="Contact Page" width="70%"/>
  <br>
  <em>CONTACT PAGE</em>
</div>

---

## ✨ Features

<table>
  <tr>
    <td>
      <h3>🎨 Frontend</h3>
      <ul>
        <li>📱 Fully Responsive Design</li>
        <li>🌓 Dark/Light Theme</li>
        <li>✨ Various Animations</li>
        <li>📸 Image carousel for each project</li>
        <li>🎬 Intro video for each project</li>
      </ul>
    </td>
    <td>
      <h3>🔐 Backend</h3>
      <ul>
        <li>🛡️ JWT Authentication</li>
        <li>📊 Full CRUD Operations</li>
        <li>☁️ Cloudinary Integration</li>
        <li>⭐ Featured Projects</li>
        <li>🎯 Real-time Updates</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend Technologies
<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
</p>

### Backend Technologies
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary"/>
</p>

</div>

---

## 📊 Architecture

```mermaid
graph LR
    A[Client Browser] -->|HTTP/HTTPS| B[React Frontend]
    B -->|API Calls| C[Express Backend]
    C -->|Authenticate| D[JWT Middleware]
    C -->|CRUD| E[(MongoDB)]
    C -->|Upload| F[Cloudinary CDN]
    D -->|Verify| C
    E -->|Return Data| C
    F -->|Media URLs| C
    C -->|JSON Response| B
    B -->|Render| A
```

---

## 🚀 Getting Started

<details>
<summary><b>📋 Prerequisites</b></summary>

Before you begin, ensure you have the following installed:

- **Node.js**
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Cloudinary Account**
- **EmailJS Account**
- **Git** (for cloning the repository)

</details>

<details>
<summary><b>⚡ Quick Start</b></summary>

### 1️⃣ Clone the repository

```bash
git clone https://github.com/mihail093/Portfolio.git
cd portfolio
```

### 2️⃣ Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3️⃣ Configure environment variables

Create `.env` files in both backend and frontend directories:

**Backend `.env`:**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1d
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
ADMIN_NAME=your_name
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=production
CLIENT_URL=http://localhost:5173
```

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4️⃣ Start the application

```bash
# Start backend (from backend directory)
npm start

# Start frontend (from frontend directory)
npm run dev
```

🎉 **Application is now running!**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

</details>

---

## 📁 Project Structure

<details>
<summary><b>Click to view project structure</b></summary>

```
portfolio/
├── 📂 backend/
│   ├── 📂 config/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── jwt.js
│   ├── 📂 controllers/
│   │   ├── authController.js
│   │   ├── mediaController.js
│   │   └── projectController.js
│   ├── 📂 middleware/
│   │   └── authMiddleware.js
│   ├── 📂 models/
│   │   ├── Admin.js
│   │   ├── Media.js
│   │   └── Project.js
│   ├── 📂 routes/
│   │   ├── authRoutes.js
│   │   ├── mediaRoutes.js
│   │   └── projectRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── 📂 frontend/
    ├── 📂 src/
    │   ├── 📂 components/
    │   │   ├── 📂 admin/
    │   │   ├── 📂 layout/
    │   │   ├── 📂 ui/
    │   │   └── 📂 animations/
    │   ├── 📂 context/
    │   │   ├── AuthContext.jsx
    │   │   └── ThemeContext.jsx
    │   ├── 📂 pages/
    │   │   ├── Home.jsx
    │   │   ├── Projects.jsx
    │   │   ├── About.jsx
    │   │   └── Contact.jsx
    │   ├── 📂 services/
    │   │   ├── apiService.js
    │   │   └── authService.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env
    ├── package.json
    └── vite.config.js
```

</details>

---

## 🔐 API Endpoints

<details>
<summary><h4>Authentication</h4></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/admin/login` | Admin login | ❌ |
| GET | `/api/auth/admin/me` | Get admin profile | ✅ |
| GET | `/api/auth/admin/logout` | Logout admin | ✅ |

</details>

<details>
<summary><h4>Projects</h4></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/projects` | Get all projects | ❌ |
| GET | `/api/projects/:id` | Get single project | ❌ |
| GET | `/api/projects/featured` | Get featured projects | ❌ |
| POST | `/api/projects` | Create new project | ✅ |
| PUT | `/api/projects/:id` | Update project | ✅ |
| DELETE | `/api/projects/:id` | Delete project | ✅ |

</details>

<details>
<summary><h4>Media</h4></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/media` | Get all media | ❌ |
| GET | `/api/media/:id` | Get single media | ❌ |
| GET | `/api/media/tags` | Get all tags | ❌ |
| POST | `/api/media` | Upload media | ✅ |
| DELETE | `/api/media/:id` | Delete media | ✅ |

</details>

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

### 👨‍💻 Author

<div align="center">

### **Mihajlo Radosavljevic**

[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-orange?style=for-the-badge&logo=google-chrome&logoColor=white)](https://portfolio-olive-seven-98.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mihajlo-radosavljevic-57a19332b/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mihail093)
[![Email](https://img.shields.io/badge/Email-Contact-red?style=for-the-badge&logo=gmail&logoColor=white)](mailto:rmihajlo800@gmail.com)

</div>

---

## 💖 Support

<div align="center">

If you found this project helpful, please consider giving it a ⭐!

[![Star History Chart](https://api.star-history.com/svg?repos=mihail093/Portfolio&type=Date)](https://star-history.com/#mihail093/Portfolio&Date)

</div>

---

<div align="center">

### Show Some ❤️ by Starring this Repository!

Made with 💙 and ☕ by [Mihajlo Radosavljevic](https://github.com/mihail093)

![Footer](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer)

</div>
