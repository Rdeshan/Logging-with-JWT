import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Welcome, {user?.username}!</h2>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
            <div className="dashboard-content">
                <h3>User Dashboard</h3>
                <p>This is your personal dashboard. You are logged in as a regular user.</p>
                {user?.role === 'admin' && (
                    <button
                        onClick={() => navigate('/admin')}
                        className="admin-button"
                    >
                        Go to Admin Dashboard
                    </button>
                )}
            </div>
        </div>
    );
};

export default Dashboard; 