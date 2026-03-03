# 🚀 Fullstack Learning Journey

Welcome to my fullstack development diary! This repository tracks my progress as I dive into the world of web development, from React frontends to Node.js backends.

## 🏗️ Project Structure

- **/client**: Frontend React application built with Vite.
- **/server**: Backend Node.js & Express server.

---

## ✅ What I Have Learned

### ⚛️ Frontend (React)

- **State Management**: Mastered using `useState` with objects and arrays, including the spread operator (`...`) for immutable updates.
- **Hooks**: Deep dived into `useEffect` for handling side effects like API calls and mounting logic.
- **Component Architecture**: Learned to decompose UIs into small, reusable components and handle "lifting state up."
- **API Integration**: Integrated real-world APIs (like OpenWeatherMap) using `fetch` and `async/await`.
- **UI & Styling**: Used Material UI (MUI) for professional-looking components and implemented conditional styling.
- **Logic Abstraction**: Introduced helper functions/files to keep UI components focused on rendering.

### 🟢 Backend (Node.js & Express)

- **Server Setup**: Learned how to initialize an Express server and configure ports.
- **ES Modules (ESM)**: Configured `package.json` with `"type": "module"` to use modern `import/export` syntax.
- **Express Routing**: Created route handlers (`app.get`) to serve data and simple messages.
- **JSON Handling**: Mastered sending JSON responses (`res.json`) to be consumed by frontends.
- **NPM Packages**: Integrated external packages like `figlet` to create ASCII art in the console.
- **Development Workflow**: Using `nodemon` for automatic server restarts and `npm` scripts for efficiency.
- **Module Architecture**: Organized code using child modules (e.g., fruit data split into individual files) and exporting them through a central `index.js`.

---

## 🛠️ Fullstack Integration

- **API Communication**: Understanding how a frontend requests data from a backend endpoint (e.g., `/fruits`).
- **Project Organization**: Managing separate `client` and `server` environments in a single repository.

---

## 🎯 What I Want to Learn (Future Goals)

- **Database Integration**: Connecting to MongoDB or PostgreSQL to persist data.
- **Authentication**: Implementing User Login/Signup using JWT or Firebase.
- **Advanced State**: Moving from local state to Context API or Redux for larger apps.
- **Middleware**: Deepening knowledge of Express middleware for logging, security, and validation.
- **Deployment**: Taking the whole app live on platforms like Vercel, Render, or AWS.

---

### How to Run Locally

1. **Backend**:
   ```bash
   cd server
   npm run dev
   ```
2. **Frontend**:
   ```bash
   cd client
   npm run dev
   ```

---

_Keep coding, keep learning!_
