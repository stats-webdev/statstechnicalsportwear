import React, { useState, useEffect } from 'react';
import './EarlyAccess.css';

function EarlyAccess({ products }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        setIsAuthenticated(true);
      } else {
        setError('Invalid username or password');
      }
    } else {
      setError('Credentials are loading, please wait...');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="login-page">
        <div className="login-container">
          <h2 className="login-header">Login to Early Access</h2>
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
  }

  return (
    <div className="early-access-container">
      <div className="early-access-content">
        <h1>Early Access Products</h1>
        <p>Welcome to our early access! Here are our upcoming products:</p>
        <div className="products-grid">
          {products.filter(product => 
            product.Series && product.Series.toLowerCase().includes('early access')
          ).map((product) => (
            <div key={product.ID} className="product-card">
              <img src={product.Image} alt={product.Name} />
              <h3>{product.Name}</h3>
              <p>{product.Description}</p>
              <p>Price: ${product.Price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EarlyAccess;
