import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import TaskCard from '../components/TaskCard';
import { Plus, Search, Filter, Layers, ListTodo, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Dashboard({ user }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [editingId, setEditingId] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formStatus, setFormStatus] = useState('PENDING');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Toast status
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message: '' }

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const fetchTasksData = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      showToast('Failed to fetch tasks.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      showToast('Task title is required!', 'error');
      return;
    }

    try {
      if (editingId) {
        // Edit flow
        const updated = await updateTask(editingId, {
          title: formTitle,
          description: formDesc,
          status: formStatus
        });
        showToast('Task updated successfully!');
        setTasks(tasks.map(t => t.id === editingId ? updated : t));
        cancelEditing();
      } else {
        // Create flow
        const created = await createTask({
          title: formTitle,
          description: formDesc,
          status: 'PENDING'
        });
        showToast('Task created successfully!');
        setTasks([created, ...tasks]);
        resetForm();
      }
    } catch (err) {
      showToast('Action failed. Verify authorization.', 'error');
    }
  };

  const handleEditClick = (task) => {
    setEditingId(task.id);
    setFormTitle(task.title);
    setFormDesc(task.description || '');
    setFormStatus(task.status);
  };

  const cancelEditing = () => {
    setEditingId(null);
    resetForm();
  };

  const resetForm = () => {
    setFormTitle('');
    setFormDesc('');
    setFormStatus('PENDING');
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(id);
      showToast('Task deleted successfully!');
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      showToast('Failed to delete task.', 'error');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const taskToUpdate = tasks.find(t => t.id === id);
      const updated = await updateTask(id, {
        ...taskToUpdate,
        status: newStatus
      });
      showToast(`Status updated to ${newStatus.replace('_', ' ')}!`);
      setTasks(tasks.map(t => t.id === id ? updated : t));
    } catch (err) {
      showToast('Failed to update status.', 'error');
    }
  };

  // Compute filtered tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: '0 20px 40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Toast Notification */}
      {toast && (
        <div className={`notification-toast ${toast.type}`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '30px',
        alignItems: 'start'
      }} className="responsive-grid">
        
        {/* Responsive layout switcher (using standard css inject later or inline styles) */}
        <style>{`
          @media (min-width: 900px) {
            .responsive-grid {
              grid-template-columns: 350px 1fr !important;
            }
          }
        `}</style>

        {/* Sidebar / Left Column: Task Creation & Edit Form */}
        <div className="glass-panel" style={{ padding: '28px', position: 'sticky', top: '20px' }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '800',
            marginBottom: '20px',
            color: editingId ? 'var(--accent)' : 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {editingId ? 'Edit Task Parameter' : 'Create New Task'}
          </h3>

          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Task Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="Buy crypto, write documentation..."
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Description (Optional)</label>
              <textarea
                className="form-input"
                placeholder="Include specifications or subtasks..."
                rows="4"
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                style={{ resize: 'none', fontFamily: 'inherit' }}
              />
            </div>

            {editingId && (
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Lifecycle Status</label>
                <select
                  className="form-input"
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value)}
                  style={{ cursor: 'pointer' }}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button
                type="submit"
                className="glow-button"
                style={{ flex: 1, padding: '12px' }}
              >
                {editingId ? 'Update Task' : (
                  <>
                    <Plus size={16} />
                    Add Task
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="secondary-button"
                  style={{ flex: 1, padding: '12px' }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: Dashboard Task Viewer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Filtering and Query Bar */}
          <div className="glass-panel" style={{
            padding: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: '1 1 280px' }}>
              <Search size={18} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }} />
              <input
                type="text"
                className="form-input"
                placeholder="Search queries or titles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '38px', fontSize: '0.9rem', padding: '10px 10px 10px 38px' }}
              />
            </div>
            
            {/* Status Filter buttons */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
              {['ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    background: statusFilter === status ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                    color: statusFilter === status ? 'var(--bg-deep)' : 'var(--text-secondary)',
                    border: statusFilter === status ? 'none' : '1px solid var(--border)',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {status.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Grid display of Tasks */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
              Loading tasks from system...
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="glass-panel" style={{
              padding: '60px 40px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              color: 'var(--text-muted)'
            }}>
              <ListTodo size={40} style={{ color: 'var(--text-muted)', marginBottom: '8px' }} />
              <p style={{ fontSize: '1.05rem', fontWeight: '500', color: 'var(--text-secondary)' }}>No tasks found</p>
              <p style={{ fontSize: '0.85rem' }}>Create your first task or refine your filter preferences above.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {filteredTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
