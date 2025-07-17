import React, { useState } from 'react';
import axios from 'axios';
import './AnimatedAuth.css';
import { useNavigate } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_API_URL;


const AnimatedAuth = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}api/auth/register`, registerData);
      alert('Registration successful!');
      setIsFlipped(false);
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}api/auth/login`, loginData);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      navigate('/dashboard'); // Change route after login
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="smoke">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        <div className="front">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              required
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button type="submit">Login</button>
            {error && <p className="error">{error}</p>}
          </form>
          <p className="flip-link" onClick={() => setIsFlipped(true)}>Don't have an account? Register</p>
        </div>

        <div className="back">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              required
              value={registerData.username}
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
            <button type="submit">Register</button>
            {error && <p className="error">{error}</p>}
          </form>
          <p className="flip-link" onClick={() => setIsFlipped(false)}>Already have an account? Login</p>
        </div>
      </div>
    </div>
  );
};

export default AnimatedAuth;
