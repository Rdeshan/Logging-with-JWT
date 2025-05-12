import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {//check if children are valid
    // Check if the user is authenticated
    // and if the route is admin-only, redirect accordingly
    const { user } = useAuth();//check if user is valid
    
    if (!user) {//check if user is authenticated
        return <Navigate to="/login" replace />;//
    }

    if (adminOnly && user.role !== 'admin') {//check if user is admin
        return <Navigate to="/dashboard" replace />;//check if user is admin
    }

    return children;//check if children are valid
};

export default PrivateRoute; 