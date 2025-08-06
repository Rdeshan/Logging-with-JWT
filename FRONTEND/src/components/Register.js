/*import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const[registerForm,setRegisterForm] = useState({
        username:"",
        email:"",
        password:""
    })
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleForm=(e)=>{
        const{name,value} = e.target;
        setRegisterForm((prev)=>({...prev,[name]:value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await register(registerForm.username, registerForm.email, registerForm.password);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Register</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={registerForm.username}
                            onChange={handleForm}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={registerForm.email}
                            onChange={handleForm}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name ="password"
                            value={registerForm.password}
                            onChange={handleForm}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button">Register</button>
                </form>
                <p className="auth-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register; */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleForm = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await register(
      registerForm.username,
      registerForm.email,
      registerForm.password
    );
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
        <i
          className="bi bi-person-plus-fill mb-4 icon-style"
          style={{ fontSize: '4rem', color: '#a259ff' }}
        ></i>

        <h3 className="fw-bold mb-4 heading" style={{ fontSize: '2.2rem' }}>
          Register
        </h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label label-style">Username</label>
            <input
              type="text"
              name="username"
              className="form-control rounded-pill px-3"
              value={registerForm.username}
              onChange={handleForm}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label label-style">Email</label>
            <input
              type="email"
              name="email"
              className="form-control rounded-pill px-3"
              value={registerForm.email}
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
              value={registerForm.password}
              onChange={handleForm}
              required
            />
          </div>

          <button type="submit" className="btn w-100 rounded-pill login-button">
            Register
          </button>
        </form>

        <p className="mt-3 text-white-all">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
