
import React, { useState, useEffect } from 'react';
import './EditTaskModal.css';

const EditTaskModal = ({ task, onClose, onUpdate }) => {
  const [updatedTask, setUpdatedTask] = useState(task);

  useEffect(() => {
    setUpdatedTask(task);
  }, [task]);

  const handleChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedTask);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={updatedTask.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <textarea
            name="description"
            value={updatedTask.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <select name="status" value={updatedTask.status} onChange={handleChange}>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <select name="priority" value={updatedTask.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="High">High</option>
          </select>
          <div className="modal-actions">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
