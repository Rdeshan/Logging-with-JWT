import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const[form,setForm] = useState({
        email:"",
        password:""
    })
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();


    const handleForm =(e)=>{
        const{name,value} = e.target;
        setForm((prev)=>({...prev,[name]:value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await login(form.email, form.password);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name ="email"
                            value={form.email}
                            onChange={handleForm}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleForm}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button">Login</button>
                </form>
                <p className="auth-link">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login; 