import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (error) {
            setError('Failed to fetch users');
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(
                `http://localhost:5000/api/users/${userId}/role`,
                { role: newRole },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchUsers();
        } catch (error) {
            setError('Failed to update user role');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsers();
        } catch (error) {
            setError('Failed to delete user');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="admin-dashboard-container">
            <div className="dashboard-header">
                <h2>Admin Dashboard</h2>
                <div className="header-buttons">
                    <button onClick={() => navigate('/dashboard')} className="nav-button">
                        User Dashboard
                    </button>
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="users-list">
                <h3>User Management</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user._id)}
                                        className="delete-button"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard; 