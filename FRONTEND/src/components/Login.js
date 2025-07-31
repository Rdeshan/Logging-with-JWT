/*
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

*/

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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
    <div className="container-fluid auth-container">
  <div className="glass-layer"></div>
      <div className="bubbles">
        {[...Array(10)].map((_, i) => (
          <span key={i} style={{ '--i': i + 1 }}></span>
        ))}
      </div>     
       <div className="auth-box text-center">
 <i className="bi bi-person-circle mb-4 icon-style"
  style={{ fontSize: '4rem', color: '#a259ff' }}
></i>

  <h3 className="fw-bold mb-4 heading" style={{ fontSize: '2.2rem' }}>Login</h3>
  
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label label-style">Email</label>
            <input
              type="email"
              name="email"
              className="form-control rounded-pill px-3"
              value={form.email}
              onChange={handleForm}
              required
            />
          </div>

          <div className="mb-4 text-start">
            <label className="form-label label-style">Password</label>
            <input
              type="password"
              name="password"
              className="form-control rounded-pill px-3"
              value={form.password}
              onChange={handleForm}
              required
            />
          </div>

          <button type="submit" className="btn w-100 rounded-pill login-button">
            Login
          </button>
        </form>

       <p className="mt-3 text-white-all">
  Don't have an account? <Link to="/register">Register</Link>
</p>
      </div>
    </div>
  );
};

export default Login;
