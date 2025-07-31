const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authrouter = require('./routes/authrouter');
const userrouter = require('./routes/usersrouter')

// Load environment variables
dotenv.config();

// Debug: Check if MONGODB_URI is loaded
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'URI is set' : 'URI is not set');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const DbUrl = process.env.MONGODB_URI;

// MongoDB Connection
const connect = async () => {
  try {
   await mongoose.connect(DbUrl);
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
};

connect();

// Routes
app.use('/api/auth', authrouter);
app.use('/api/users', userrouter);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
