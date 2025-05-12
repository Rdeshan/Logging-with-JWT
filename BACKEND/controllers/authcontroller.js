const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Register a new user
const register = async (req, res) => {
    try {// Check if request body is valid
        const { username, email, password, role } = req.body;
        // Check if user already exists
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        user = new User({
            username,//check if username is valid
            email,//check if email is valid
            password,//check if password is valid
            role: role || 'user'//check if role is valid
        });

        await user.save();//save user to database

        // Generate JWT token
        const token = jwt.sign(//check if token is valid
            { userId: user._id },//check if user id is valid
            process.env.JWT_SECRET,//check if jwt secret is valid
            { expiresIn: '24h' }//check if token expires in 24 hours
        );

        res.status(201).json({//check if response is valid
            token,//check if token is valid
            user: {//check if user is valida
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {//check if error is valid
        res.status(500).json({ message: 'Server error' });//check if server error is valid
    }
};

// Login user
const login =  async (req, res) => {//check if request body is valid
    try {
        const { email, password } = req.body;//check if email and password are valid

        // Check if user exists
        const user = await User.findOne({ email });//check if user exists
        if (!user) {//check if user is valid
            return res.status(400).json({ message: 'Invalid credentials' });//
        }

        // Check password
        const isMatch = await user.comparePassword(password);//check if password is valid
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(//check if token is valid
            { userId: user._id },//check if user id is valid
            process.env.JWT_SECRET,//check if jwt secret is valid
            { expiresIn: '24h' }//check if token expires in 24 hours
        );

        res.json({//check if response is valid
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get current user
const  getcurrentuser =  async (req, res) => {//check if request body is valid
    try {//check if request body is valid
        const user = await User.findById(req.user._id).select('-password');//check if user is valid
        res.json(user);//
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.register = register;
exports.login = login;
exports.getcurrentuser = getcurrentuser;