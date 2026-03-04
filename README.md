# 🚀 Fullstack Learning Journey

Welcome to my fullstack development diary! This repository tracks my progress as I dive into the world of web development, from React frontends to Node.js backends.

---

## 🏗️ Project Structure

- **/client**: Frontend React application built with Vite, MUI, and Tailwind CSS.
- **/server**: Backend Node.js & Express server.

---

## 🚀 Getting Started

To get this project up and running on your local machine, follow these steps:

### 📥 Prerequisites

- **Node.js**: Ensure you have Node.js installed (LTS version recommended).
- **npm**: Comes bundled with Node.js.

---

## ✅ Key Learning Milestones

### ⚛️ Frontend (React & Styling)

- **Advanced Styling**: Integrated **Tailwind CSS v4** with PostCSS for modern, utility-first styling.
- **Form Handling**: Mastered controlled components and `event.preventDefault()` for custom form submission logic.
- **Dynamic UI Components**: Created responsive product cards and pricing tabs using props-driven data arrays.
- **State & Props**: Professional use of `useState` with objects/arrays and the spread operator (`...`).
- **Lifting State Up**: Architected game logic through shared parent state for the Lottery system.
- **Material UI (MUI)**: Combined with Tailwind for a comprehensive component library experience.

### 🟢 Backend (Node.js & Express)

- **Express Server**: Configured routes, ports, and middleware foundations.
- **Core Server Methods**: Mastered the distinction between `app.get()` (specific routes), `app.use()` (global middleware/filters), and `app.listen()` (the "start button" for the server).
- **HTTP Methods Deep Dive**: Understanding specific use cases for `GET` (fetching data) vs `POST` (submitting/creating data).
- **Dynamic Routing**: Implemented **Path Parameters** (e.g., `/:username/:id`) to handle dynamic URLs and extract data using `req.params`.
- **Query Strings**: Utilized `req.query` to extract data from search parameters (e.g., `/search?q=apple`) and implemented basic validation for search queries.
- **Templating with EJS**: Integrated the **EJS (Embedded JavaScript)** template engine to generate dynamic HTML responses.
  - Configured via `app.set("view engine", "ejs")`.
  - Organized templates in a dedicated `/views` directory.
  - **Modular Architecture (Partials)**: Implemented EJS partials (using `<%- include(...) %>`) to create reusable UI components like a global `<head>` with shared CSS.
  - **Data Injection**: Mastered passing dynamic data from Express routes to EJS views using the `res.render("template", { key: value })` syntax.
  - **In-Template Logic**: Utilizing `<%= ... %>` for values, `<% ... %>` for control flow (loops, conditionals), and `<%- ... %>` for raw HTML/partials.
- **ES Modules (ESM) & JSON**: Utilizing modern `import/export` syntax via `"type": "module"` and importing JSON data directly using the `with { type: "json" }` assertion.
- **Modular Data Architecture**: Developed a dynamic profile system that fetches structured data from organized JSON sources.
- **Dynamic Routing & params**: Implemented complex path parameters (e.g., `/ig/:username`) to build an Instagram-style profile viewer.
- **Asset Management**: Integrated external CDNs (like Unsplash) for high-quality, dynamic image rendering in backend templates.
- **Middleware Mastery**: Implemented global middleware to handle requests and provide custom HTML responses.
- **Development Workflow**: Implementation of `nodemon` and `package.json` scripts for efficient coding cycles.

---

## 🛠️ Feature Showcases

### 🛍️ Product Catalog Dashboard

A modern, animated product listing UI built with Tailwind CSS:

- **`ProductTab`**: A flexible flex-grid layout that renders multiple product offerings.
- **`Products`**: Individual card components with hover animations (transform/translate) and shadow effects.
- **`Price`**: A specialized component handling currency display and interactive "Buy Now" triggers.

### 🌦️ Weather Application

A feature-rich weather dashboard using Material UI:

- `SearchBox`: Real-time input handling for API queries.
- `InfoBox`: Dynamic rendering of weather conditions and thermal statistics.

### 📝 Subscription Form

A sleek, Tailwind-styled registration form demonstrating:

- Custom focus rings and transition animations.
- Prevented default reload behavior for smooth SPA interaction.

### 🎰 Logic Games

- **Lottery**: A logic-heavy system demonstrating state-driven win conditions and UI reactivity.
- **Roll Dice**: A backend-driven mini-game where Express generates a random value (1-6) and renders it dynamically using a modular EJS template.

### 📸 Instagram Profile Mockup

A dynamic backend project demonstrating real-world data rendering:

- **Dynamic Routing**: Automatically serves different profiles based on URL sub-paths (e.g., `/ig/cats`).
- **Data Integration**: Loads user statistics and post data from structured JSON objects.
- **CDN Images**: Uses professional Unsplash photography to populate a realistic "grid" view.
- **Interactive UI**: Shared layout structure using EJS partials for a consistent professional feel.

---

## 🎯 Future Goals

- **Database Persistence**: Integrating MongoDB or PostgreSQL for data storage.
- **API Deep Dive**: Adding POST/PUT/DELETE routes to the Express server.
- **Authentication**: Implementing secure user login and session management.

---

_Keep coding, keep learning!_
