import React, { useState } from 'react';
import socket from '../socket';
const baseUrl = process.env.REACT_APP_API_URL;

const CreateTask = ({ onTaskCreated }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'Todo',
    priority: 'medium',
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${baseUrl}api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(taskData),
    });

    const newTask = await res.json();
    socket.emit('createTask', newTask); // 🚀 Send real-time update
    onTaskCreated(newTask); // optional: update local state
    setTaskData({ title: '', description: '', status: 'Todo', priority: 'medium' });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
  <input name="title" value={taskData.title} onChange={handleChange} placeholder="Title" required />
  <textarea name="description" value={taskData.description} onChange={handleChange} placeholder="Description" />
  <select name="status" value={taskData.status} onChange={handleChange}>
    <option value="Todo">Todo</option>
    <option value="In Progress">In Progress</option>
    <option value="Done">Done</option>
  </select>
  <select name="priority" value={taskData.priority} onChange={handleChange}>
    <option value="low">Low</option>
    <option value="medium">medium</option>
    <option value="High">High</option>
  </select>
  <button type="submit">Create Task</button>
</form>
  );
};

export default CreateTask;
