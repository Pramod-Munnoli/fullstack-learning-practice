const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/my_app_db')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page', message: 'Welcome to your new Fullstack App!' });
});

// App Listen
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
