import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/credential`);
        const data = await response.json();
        setCredentials(data);
      } catch (error) {
        console.error('Error fetching credentials:', error);
        setError('Failed to fetch credentials.');
      }
    };

    fetchCredentials();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (credentials) {
      if (username === credentials.username && password === credentials.password) {
        setError('');
        localStorage.setItem('isAuthenticated', 'true'); // Store authentication flag in localStorage
        setIsAuthenticated(true); // Update the parent state
        navigate('/Dashboard'); // Redirect to the dashboard
      } else {
        setError('Invalid username or password');
      }
    } else {
      setError('Credentials are loading, please wait...');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-header">Login to Admin Dashboard</h2>
        {error && <p className="login-error">{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
