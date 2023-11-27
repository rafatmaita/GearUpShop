const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/authRoutes');
const productRoutes = require('./Routes/productRoutes');
const cors = require('cors');

const app = express();
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://rafatmaita:wXYDFX5fQhRoKQc5@myfirstnodejscluster.zcjq63q.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("Rafat you are a hero");
    }).catch(() => {
        console.log("Error With connect To The DataBase");
    });

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(authRoutes);
app.use(productRoutes);

// Start the server
const PORT = 5002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
