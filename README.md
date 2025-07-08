# 🧸 Des signes et des mots

A platform to facilitate communication between a family and their nanny, to track children’s needs, daily routines, and important events.

---

## ✨ Features

### Version 1 (current)
- Nanny presentation page
- Family home page
- User authentication

### Upcoming
- Calendar page
- Admin: Password reset with email

---

## ⚙️ Prerequisites

Make sure the following tools are installed on your machine:

- [Node.js](https://nodejs.org/) v18 or later
- [MySQL 8](https://dev.mysql.com/downloads/mysql/)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/) (optional, to clone the project)

---

## 🛠️ Installation & Configuration

### 1. Clone the project

```bash
git clone <repository-url>
cd nounouproject
```

### 2. Install dependencies

In the root folder:

```bash
npm install
```

Then in `/frontend`:

```bash
cd frontend
npm install
```

### 3. Environment configuration

Create a `.env` file in the `/frontend` folder with:

```env
VITE_API_URL=http://localhost:3333
```

(Change this URL if deploying the backend elsewhere.)

### 4. Initialize the database

Create a MySQL database (default: `nounou`) and configure credentials in your backend environment:

Create a `.env` file in `/backend` or root with:

```env
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_password
DB_NAME=nounou
```

Then run the DB initialization:

```bash
cd backend
npm run db:init
```

> 💡 You can use the example SQL dump at `/20240726-110949-sample.sql` to populate sample data.

---

## ▶️ Run the application

### 1. Start the backend

```bash
cd backend
npm run dev
```

API will run on `http://localhost:3333`.

### 2. Start the frontend

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` (or as shown by Vite).

---

## 🧪 Best practices & TODOs

- Replace `localhost:3333` hardcoded URLs with `.env` config
- Rename `allergy` to `allergies` in DB and codebase
- Use `PropTypes` in all React components
- Add password reset feature for admins

---

## 🧑‍💻 Tech stack

- **Frontend**: React + Vite + CSS Modules
- **Backend**: Node.js + Express (or similar)
- **Database**: MySQL 8
