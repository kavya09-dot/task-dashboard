import React, { useState } from 'react';
import { Task, TaskStatus } from '../../models/Task';
import './TaskForm.css';

type TaskFormProps = {
  onSubmit: (task: Omit<Task, 'id'>) => void;
  onClose: () => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('To Do');
  const [titleError, setTitleError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }
    
    onSubmit({
      title,
      description,
      status
    });
    
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('To Do');
    setTitleError('');
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form-container">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim()) setTitleError('');
              }}
              placeholder="Enter task title"
              className={titleError ? 'error' : ''}
            />
            {titleError && <div className="error-message">{titleError}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description (optional)"
              rows={3}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn submit">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;