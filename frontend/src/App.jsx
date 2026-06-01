import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [page, setPage] = useState('LOGIN'); // 'LOGIN' | 'REGISTER' | 'DASHBOARD'
  const [user, setUser] = useState(null); // { email, role }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    if (token && email && role) {
      setUser({ email, role });
      setPage('DASHBOARD');
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setPage('DASHBOARD');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    
    setUser(null);
    setPage('LOGIN');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <Navbar user={user} onLogout={handleLogout} />

      <main style={{ flex: 1 }}>
        {page === 'LOGIN' && (
          <Login 
            onAuthSuccess={handleAuthSuccess} 
            onNavigateToRegister={() => setPage('REGISTER')} 
          />
        )}
        {page === 'REGISTER' && (
          <Register 
            onAuthSuccess={handleAuthSuccess} 
            onNavigateToLogin={() => setPage('LOGIN')} 
          />
        )}
        {page === 'DASHBOARD' && user && (
          <Dashboard user={user} />
        )}
      </main>
    </div>
  );
}
