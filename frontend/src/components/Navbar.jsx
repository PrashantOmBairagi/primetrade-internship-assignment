import React from 'react';
import { LogOut, Shield, Mail, Layers } from 'lucide-react';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="glass-panel" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 28px',
      borderRadius: '0 0 16px 16px',
      marginBottom: '40px',
      borderTop: 'none'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Layers size={20} color="white" />
        </div>
        <span style={{
          fontWeight: '800',
          fontSize: '1.25rem',
          letterSpacing: '-0.025em',
          background: 'linear-gradient(90deg, #ffffff, var(--accent))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          PRIMETRADE TASK MANAGER
        </span>
      </div>

      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border)',
              padding: '6px 12px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {user.role === 'ROLE_ADMIN' ? (
                <Shield size={16} style={{ color: '#8b5cf6' }} />
              ) : (
                <Mail size={16} style={{ color: 'var(--accent)' }} />
              )}
              <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{user.email}</span>
            </div>
            
            <span className={`badge ${user.role === 'ROLE_ADMIN' ? 'role-admin' : 'role-user'}`}>
              {user.role === 'ROLE_ADMIN' ? 'ADMIN' : 'USER'}
            </span>
          </div>

          <button 
            onClick={onLogout} 
            className="secondary-button" 
            style={{ 
              padding: '8px 16px', 
              fontSize: '0.85rem',
              color: '#fca5a5'
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
