# 🚀 Fullstack Learning Journey

Welcome to my fullstack development diary! This repository tracks my progress as I dive into the world of web development, from React frontends to Node.js backends.

---

## 🏗️ Project Structure

- **/basics-practice**: A folder for initial study and practice experiments.
  - **/basics-practice/backend**: Node.js & Express server.
  - **/basics-practice/react-practice**: Frontend React application (State, Material UI).
  - **/practice/mongoose-practice**: Deep dive into Mongoose relationships and data modeling.
  - **/basics-practice/frontend**: Vanilla JavaScript and CSS practice.
- **/projects**: A dedicated workspace for building fullstack, production-ready applications. 🚀
  - **/projects/my-app** (Wanderlust): A fullstack AirBnB-like application using Express, EJS, and MongoDB for browsing and managing property listings. Featuring boilerplate layouts with `ejs-mate` and full CRUD functionality.

---

## 🚀 Getting Started

To get this project up and running on your local machine, follow these steps:

### 📥 Prerequisites

- **Node.js**: Ensure you have Node.js installed (LTS version recommended).
- **npm**: Comes bundled with Node.js.
- **MongoDB**: Local instance running (default port 27017).

### ⚙️ Installation & Setup

1. **Backend**:
   ```bash
   cd basics-practice/backend
   npm install
   npm run init      # Seeds the MongoDB database with initial chats
   npm run mongo     # Starts the server in dev mode
   ```

2. **Frontend (React)**:
   ```bash
   cd basics-practice/react-practice
   npm install
   npm run dev
   ```

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
  - **Nested Views**: Implemented organized view management by serving templates from sub-directories (e.g., `res.render("routes_acc/home.ejs")`).
- **CommonJS (CJS) vs ES Modules (ESM)**:
  - **Refactoring Strategy**: Transitioned the backend architecture from ESM (`import`) back to **CommonJS** (`require`) to align with industry-standard Express tutorials and simplify the use of global variables like `__dirname`.
  - **Status**: Backend is now successfully running on **CJS**.
  - **Module Selection**: Mastered the distinction between the two systems, opting for CJS for backend simplicity while maintaining ESM knowledge for React frontend development.
- **Dynamic Data with Faker.js**:
  - **Automated Mocking**: Integrated `@faker-js/faker` to generate large volumes of realistic user data (usernames, emails, UUIDs, and passwords) for testing and prototyping.
  - **API Adaptation**: Navigated version-specific API changes (e.g., transitioning from `userName()` to `username()` and `internet.uuid()` to `string.uuid()`).
- **Database Integration (SQL)**:
  - **MySQL Connectivity**: Established connections to local MySQL servers using the `mysql2` driver.
  - **Server Management**: Configured and managed a standalone **MySQL Server** using **MySQL Workbench** for database administration.
  - **Service Configuration**: Learned to manage background services and troubleshoot connectivity between Node.js and the MySQL database engine.
  - **Secure Parameterized Queries**: Implemented `?` placeholders in SQL queries to prevent **SQL Injection** and handle potentially dangerous characters.
  - **Full Database CRUD**: Successfully transitioned the user management system from in-memory arrays to a persistent **MySQL** database.
- **Database Integration (NoSQL)**:
  - **Mongoose Connectivity**: Established connections to local **MongoDB** instances using the `mongoose` Object Data Modeling (ODM) library.
  - **Schema & Model Design**: Mastered the "blueprint-to-engine" workflow: defining data shapes with **Schemas** and compiling them into **Models**.
  - **Advanced Validation (Guardrails)**: Implemented professional schema constraints (`min`, `max`, `minLength`, `maxLength`) with descriptive custom error messages.
  - **Update Integrity**: Leveraged the `runValidators: true` flag in Mongoose update methods to ensure data consistency during mutations.
  - **Asynchronous Database Operations**: Practiced clean `async/await` patterns for database connection and data mutation.
  - **Lazy Creation Logic**: Understanding that MongoDB automatically creates databases and collections (pluralized/lowercase) only when the first document is saved.
  - **Unified CRUD**: Translated complex SQL logic (INSERT, SELECT, UPDATE, DELETE) into intuitive Mongoose methods like `save()`, `find()`, `findByIdAndUpdate()`, and `findByIdAndDelete()`.
- **Mongoose: Chat Model**: Developed a structured chat object model with fields for sender (`from`), receiver (`to`), message (`msg` with `maxLength`), and timestamps (`created_at`).
- **Initial Data Seeding**: Mastered database initialization using `Model.insertMany()` through a dedicated `init.js` script for automated environment setup.
- **Asynchronous Flow**: Leveraged `async/await` and `.then()/.catch()` patterns for clean, non-blocking database operations.
- **Modular Data Architecture**: Developed a dynamic profile system that fetches structured data from organized JSON sources.
- **Dynamic Routing & params**: Implemented complex path parameters (e.g., `/ig/:username`) to build an Instagram-style profile viewer.
- **Asset Management**: Integrated external CDNs (like Unsplash) for high-quality, dynamic image rendering in backend templates.
- **Middleware Mastery**: Implemented global middleware to handle requests and provide custom HTML responses.
- **Fullstack Flow & POST Handling**:
  - **CORS (Cross-Origin Resource Sharing)**: Learned how to use the `cors` package to allow a frontend (on port 5173) to talk to a backend (on port 8080).
  - **Body Parsing**: Implemented `express.urlencoded` and `express.json` middleware to "catch" data sent from HTML forms.
  - **Registration System**: Built a complete flow where a form in the frontend sends data to a `/register` POST route in the backend.
- **RESTful API Development (CRUD Implementation)**:
  - **REST Design Patterns**: Adopting the standard REST naming conventions for resources (e.g., `GET /posts`, `POST /posts`, `PATCH /posts/:id`).
  - **CRUD Operations**: Implemented a complete Create, Read, Update, and Delete flow for a "Quora Post" simulation.
  - **Method Override**: Integrated the `method-override` package to support `PATCH` and `DELETE` requests from standard HTML forms using query string tagging (`?_method=PATCH` or `?_method=DELETE`).
  - **UUID Integration**: Utilized the `uuid` package to generate globally unique identifiers for database-less data persistence.
  - **Advanced Redirection**: Mastered `res.redirect("/posts")` to provide a seamless user experience after data mutations.
- **Modern JavaScript (OOP & Classes)**:
  - **Constructor Functions**: Understanding the traditional `function Person` and `prototype` way of creating objects.
  - **ES6 Classes**: Mastered the `class` syntax for cleaner, more modern object-oriented code.
  - **Inheritance & super()**:
    - Used `extends` to share logic between classes (e.g., `Student extends Person`).
    - Learned to use `super()` to call the parent constructor and avoid "unexpected keyword" syntax errors.
  - **Execution vs Reference**: Understanding the difference between `obj.talk` (the function itself) and `obj.talk()` (executing the function).
  - **Debugging**: Solving common issues like case-sensitivity (`Std` vs `std`) and absolute paths in `res.sendFile`.
- **Professional Error Handling**:
  - Implemented a custom **ExpressError** class to handle HTTP status codes and descriptive messages systematically.
  - Developed a **wrapAsync** utility function to catch asynchronous errors in route handlers, eliminating the need for repetitive `try/catch` blocks.
  - Integrated global error-handling middleware that renders a specialized `error.ejs` view for a polished user experience.
- **Stateless Authentication (JWT)**:
    - **Token-Based Security**: Transitioned from session-based (cookies) to stateless **JSON Web Tokens (JWT)** for more scalable authentication.
    - **Backend Verification**: Developed manual `isLoggedIn` middleware to verify tokens from the `Authorization` header on the server.
    - **Frontend Persistence**: Implemented **Axios Interceptors** to automatically attach the JWT from `localStorage` to all outgoing API requests.
    - **Global Auth State**: Integrated a global middleware in `app.js` to parse tokens on every request, populating `res.locals.currUser` for reactive UI updates across the SPA.
- **Full Authentication (Passport.js)**:
  - Integrated **Passport** and **LocalStrategy** for secure user registration and login flows.
  - Leveraged **passport-local-mongoose** for automated username/password hashing and salting via Mongoose plugins.
  - Implemented **Automatic Login** after signup and **Logout** functionality with specialized session clearing.
  - Developed **Conditional UI Rendering**: Utilized `res.locals.currUser` to dynamically show/hide navbar links based on the user's authentication state.
- **Scalable Architecture (Express Router)**:
  - Refactored the monolithic `app.js` into modular, resource-based routers (`listings`, `reviews`, `users`) using `Express.Router()`.
  - Implemented **Nested Routing** for reviews, enabling logical paths like `/listings/:id/reviews`.
- **Session Management**:
  - Configured **express-session** with secure options: `httpOnly` cookies, expiration (`maxAge`), and a secret key.
  - Leveraged `res.locals` to expose session data globally across all EJS templates.
- **Flash Messaging (UX Feedback)**:
  - Integrated **connect-flash** with `express-session` to display one-time success and error notifications.
  - Built a reusable `flash.ejs` EJS partial (Tailwind-styled, dismissible alerts) included in the global boilerplate.
- **State Management & Cookies**:
  - Integrated **cookie-parser** for client-side data persistence.
  - Mastered **Signed Cookies** for security, preventing client-side tampering via secret keys.
- **Advanced Data Modeling (Mongoose Relationships)**:
  - **One-to-Many**: Implemented a robust "Listing-to-Review" relationship using ObjectIDs and `.populate()`.
- **Authorization & Ownership Logic**:
  - **Listing Ownership**: Implemented logic to associate each listing with an owner, ensuring only the creator can edit or delete their property.
  - **Review Authorship**: Automated the association of reviews with the logged-in user, allowing only authors to remove their own feedback.
  - **Secure Authorization Middleware**: Developed `isOwner` and `isReviewAuthor` backend guards to prevent unauthorized data mutations.
  - **Conditional UI Rendering**: Dynamically show/hide "Edit" and "Delete" buttons based on user permissions for both listings and reviews.
- **Development Workflow**: Implementation of `nodemon` and `package.json` scripts for efficient coding cycles.

---

## 🛠️ Feature Showcases

### 🗄️ MySQL User Management System (SQL CRUD)

A professional-grade backend for managing user records directly in a persistent MySQL database:

- **Create**: A secure `/users/new` route that inserts new account records using parameterized `INSERT` queries.
- **Read**: An efficient `index` route (`/users`) displaying all registered records in a responsive HTML table.
- **Update**: A verification-first `/users/:id` PATCH route that validates the current password before authorizing an update to the username.
- **Delete**: A multi-step `/users/:id/delete` flow that requires the user to submit their credentials (username, email, and password) for a matching record check before the record is permanently deleted.
- **Security Check**: Integrated `.trim()` logic to ignore accidental leading/trailing spaces in form submissions.

### 🍃 MongoDB & Mongoose User System (NoSQL CRUD)

A modern, schema-based user management system leveraging the flexibility of NoSQL:

- **Professional Validation**: Implemented strict data typing and advanced property constraints (e.g., minimum age of 18) with user-friendly error responses.
- **Persistent Updates**: Ensured that schema "guardrails" remain active during updates by configuring `runValidators` explicitly.
- **Connection Reliability**: Optimized connection strings using `127.0.0.1` for faster local resolution on Windows.
- **Integrated CRUD**: Full implementation of data persistence, from initial connection to retrieving and updating records.

### 💬 WhatsApp Simulation (Express + MongoDB)

A real-time styled backend project integrating Express with NoSQL persistence:

- **Express-Mongo Bridge**: Configured a dedicated Express server that communicates with a `whatsapp` database in MongoDB.
- **Model-View-Controller (MVC) Prep**: Organized data structures into separate `/models` for cleaner architecture and scalability.
- **Full CRUD Operations**:
  - **Index (`GET /chats`)**: Displays all chats with formatted sender/receiver detail.
  - **New (`GET /chats/new`)**: Interactive form for starting new message threads.
  - **Create (`POST /chats`)**: Persistently saves new chat documents to MongoDB.
  - **Edit (`GET /chats/:id/edit`)**: Pre-populated edit interface for modifying messages.
  - **Update (`PUT /chats/:id`)**: Uses `method-override` and `findByIdAndUpdate` for seamless message editing.
  - **Delete (`DELETE /chats/:id/delete`)**: Permanent removal of chat records from the database.
- **Data Persistence**: Successfully implemented chat document validation and persistent storage with custom styling.

### ✍️ Quora Post Simulation (REST CRUD)

A fully functional "social media" post manager demonstrating backend state management:

- **Create**: A dedicated `/posts/new` form that generates unique IDs via `uuid`.
- **Read**: An index page (`/posts`) and individual post views (`/posts/:id`) with 404 error handling.
- **Update**: An edit interface (`/posts/:id/edit`) utilizing `method-override` to perform `PATCH` updates on the server.
- **Delete**: A restful deletion system (`/posts/:id`) that filters the global state and redirects the user.

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

### 🏨 Wanderlust (AirBnB Clone - Phase 5)

A professional property listing platform with full user lifecycle management, secure authentication, robust authorization, and rich interactive features:

- **Secure Authentication & Authorization**:
  - **Stateless JWT Auth**: Migration from session-based cookies to stateless **JSON Web Token (JWT)** authentication for improved scalability and security.
  - **User Accounts**: Powered by `Passport.js` with local strategy for secure signup, login, and logout.
  - **Authorization Layers**: Implemented ownership logic ensuring users can only manage their own listings and reviews.
  - **Encrypted Storage**: Automatic password hashing and salting using `passport-local-mongoose`.
  - **Dynamic UI**: Intuitive interface that adapts to user state (Guest vs. Owner vs. Authenticated User).
- **Architecture & Extensibility**:
  - **Modular Routing**: Powered by `Express.Router` for a clean, professional MVC-like structure.
  - **Review System**: Specialized nested routes and models for managing user feedback with author attribution.
  - **Security & Error Resilience**: Powered by `wrapAsync`, custom `ExpressError`, and **Signed Cookies** for secure state management.
- **User Experience (Session & Flash)**:
  - **Session-Backed State**: `express-session` ensures persistent, secure user sessions across requests.
  - **Dynamic Flash Notifications**: Dismissible success/error toasts with customized messaging based on user actions and permissions.
  - **Reusable UI Partials**: Extracted `navbar.ejs`, `footer.ejs`, and `flash.ejs` into a dedicated `/views/includes/` folder for DRY layout management.
- **Category Filtering**: Added category tags (Trending, Rooms, Mountains, Castles, etc.) to listings with a horizontal filter bar on the index page for one-click browsing.
- **Tax Toggle (UX)**: Implemented a "Display total after taxes" toggle switch on the listings index that dynamically shows/hides a +18% GST indicator per card using vanilla JS.
- **Like / Unlike System**:
  - Persistent `likes` array stored on the `Listing` MongoDB model.
  - Heart button on the show page toggles a like via a `POST /listings/:id/like` fetch call — no page reload.
  - Live like count badge updates instantly in the UI; redirects unauthenticated users to login.
- **Validation Logic**: Dual-layer resilience using **Joi** for schema enforcement and **Tailwind Peer classes** for a responsive, interactive client-side experience.
- **Static Assets**: Organized serving of CSS and JS from a dedicated `/public` directory.

---

## 🎯 Future Goals

- **Image Uploads**: Integrating **Cloudinary** for professional image hosting and management.
- **Maps Integration**: Adding interactive maps with **Mapbox** for property locations.
- **Deployment**: Taking the application live on a production cloud platform.

---

_Keep coding, keep learning!_
