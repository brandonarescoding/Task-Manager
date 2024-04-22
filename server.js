// Initialize the express app and set up the server

// Importing the required modules
const express = require('express');
const bodyParser = require('body-parser'); 
const path = require('path'); 
const dontenv = require('dotenv'); 

// Initialization of express app
const app = express();

// EJS template engine 
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 

// Middleware for parsing the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files 
app.use(express.static(path.join(__dirname, 'public')));

// Routes import
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const tasksRouter = require('./routes/tasks');

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/tasks', tasksRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Server listening on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

