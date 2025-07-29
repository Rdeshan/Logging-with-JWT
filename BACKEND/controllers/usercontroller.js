const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, isAdmin } = require('../middleware/auth');

// Get all users (admin only)
const getallusers = async (req, res) => {
    try {
        const users = await User.find().select('-password');// Exclude password from the response
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Get user by ID (admin only)
const getuserbyid = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');// Exclude password from the response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};



// Update user role (admin only)
const updaterole = async (req, res) => {
    try {
        const { role } = req.body;
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};



// Delete user (admin only)
const deleteuser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getallusers = getallusers;
exports.getuserbyid = getuserbyid;
exports.updaterole = updaterole;
exports.deleteuser = deleteuser;
