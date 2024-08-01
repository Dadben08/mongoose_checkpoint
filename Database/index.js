const express = require('express');
const connectDB = require('./config/Database');
const personRoutes = require('./routes/personRoutes');
const PORT = process.env.PORT || 5000;

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', personRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)});
