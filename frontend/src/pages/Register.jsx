import React, { useState } from 'react';
import { registerUser } from '../api/auth';
import { UserPlus, KeyRound, Mail, AlertCircle } from 'lucide-react';

export default function Register({ onAuthSuccess, onNavigateToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ROLE_USER'); // Updated to match Java Role enum naming
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields!');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await registerUser(email, password, role);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      localStorage.setItem('role', data.role);
      
      onAuthSuccess({
        email: data.email,
        role: data.role
      });
    } catch (err) {
      setError(err.response?.data || 'Failed to register. Email might be taken.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '420px',
        padding: '40px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary-glow) 0%, var(--accent-glow) 100%)',
            border: '1px solid var(--border)',
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <UserPlus size={28} style={{ color: 'var(--primary)' }} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.025em', marginBottom: '8px' }}>
            Get Started
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Create a new account to test PrimeTrade features
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '8px',
            padding: '12px 16px',
            color: '#fca5a5',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }} />
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '44px' }}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <KeyRound size={18} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }} />
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '44px' }}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Role Designation</label>
            <div style={{
              display: 'flex',
              gap: '10px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border)',
              padding: '6px',
              borderRadius: '10px'
            }}>
              <button
                type="button"
                onClick={() => setRole('ROLE_USER')}
                style={{
                  flex: 1,
                  background: role === 'ROLE_USER' ? 'var(--primary)' : 'transparent',
                  color: role === 'ROLE_USER' ? 'white' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s ease'
                }}
                disabled={loading}
              >
                USER Role
              </button>
              <button
                type="button"
                onClick={() => setRole('ROLE_ADMIN')}
                style={{
                  flex: 1,
                  background: role === 'ROLE_ADMIN' ? '#8b5cf6' : 'transparent',
                  color: role === 'ROLE_ADMIN' ? 'white' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s ease'
                }}
                disabled={loading}
              >
                ADMIN Role
              </button>
            </div>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              marginTop: '6px',
              lineHeight: '1.4'
            }}>
              {role === 'ROLE_ADMIN' 
                ? '⚡ Admin privileges grant complete oversight to view and manage all database tasks.' 
                : '🔒 User privileges restrict task visibility to owned items only.'}
            </p>
          </div>

          <button
            type="submit"
            className="glow-button"
            style={{ width: '100%', padding: '14px', background: role === 'ROLE_ADMIN' ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' : 'var(--primary)' }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : (
              <>
                <UserPlus size={18} />
                Create Account
              </>
            )}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          paddingTop: '20px',
          marginTop: '8px'
        }}>
          Already have an account?{' '}
          <span 
            onClick={onNavigateToLogin}
            style={{
              color: 'var(--accent)',
              cursor: 'pointer',
              fontWeight: '600',
              textDecoration: 'underline'
            }}
          >
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
}
