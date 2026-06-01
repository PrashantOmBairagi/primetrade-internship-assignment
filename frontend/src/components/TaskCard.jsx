import React from 'react';
import { Edit2, Trash2, CheckCircle2, Play, AlertCircle, Mail } from 'lucide-react';

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="glass-panel" style={{
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '16px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '4px',
        background: task.status === 'COMPLETED' ? 'var(--success)' : 
                    task.status === 'IN_PROGRESS' ? 'var(--accent)' : 'var(--warning)'
      }} />

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <span className={`badge ${task.status.toLowerCase()}`}>
            {task.status.replace('_', ' ')}
          </span>
          
          {task.user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <Mail size={12} />
              <span>Owner: {task.user.email}</span>
            </div>
          )}
        </div>

        <h3 style={{
          fontSize: '1.15rem',
          fontWeight: '700',
          marginBottom: '8px',
          textDecoration: task.status === 'COMPLETED' ? 'line-through' : 'none',
          color: task.status === 'COMPLETED' ? 'var(--text-muted)' : 'var(--text-primary)'
        }}>
          {task.title}
        </h3>
        
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.5',
          wordBreak: 'break-word'
        }}>
          {task.description || 'No description provided.'}
        </p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '16px',
        borderTop: '1px solid rgba(255,255,255,0.04)'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {task.status !== 'COMPLETED' && (
            <button
              onClick={() => onStatusChange(task.id, task.status === 'PENDING' ? 'IN_PROGRESS' : 'COMPLETED')}
              className="secondary-button"
              style={{ padding: '6px 12px', fontSize: '0.8rem', borderColor: 'var(--accent)' }}
            >
              {task.status === 'PENDING' ? 'Start' : 'Complete'}
            </button>
          )}
          {task.status === 'COMPLETED' && (
            <button
              onClick={() => onStatusChange(task.id, 'PENDING')}
              className="secondary-button"
              style={{ padding: '6px 12px', fontSize: '0.8rem', color: 'var(--warning)' }}
            >
              Reopen
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => onEdit(task)}
            className="secondary-button"
            title="Edit Task"
            style={{ padding: '8px', width: '36px', height: '36px' }}
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="secondary-button"
            title="Delete Task"
            style={{ 
              padding: '8px', 
              width: '36px', 
              height: '36px',
              color: '#fca5a5'
            }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
