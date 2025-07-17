// ✅ STEP 1: KanbanBoard.jsx - Main UI for 3 Column View with Edit Modal

import React, { useEffect, useState } from 'react';
import CreateTask from './CreateTask';
import EditTaskModal from './EditTaskModal';
import socket from '../socket';
import './KanbanBoard.css';
const baseUrl = process.env.REACT_APP_API_URL;


const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();

    socket.on('taskCreated', (task) => {
      setTasks((prev) => [...prev, task]);
    });

    return () => socket.off('taskCreated');
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(`${baseUrl} api/tasks`, {

      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    const data = await res.json();
    setTasks(data);
  };

  const handleDelete = async (id) => {
await fetch(`${baseUrl}api/tasks/${id}`, { 
        method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = async (updatedTask) => {
    const res = await fetch(`${baseUrl}api/tasks/${updatedTask._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(updatedTask),
    });

    const newTask = await res.json();

    setTasks((prev) =>
      prev.map((task) => (task._id === newTask._id ? newTask : task))
    );

    setEditingTask(null);
  };

  const renderColumn = (status) => (
    <div className="column">
      <h3>{status}</h3>
      {tasks.filter((task) => task.status === status).map((task) => (
        <div key={task._id} className="task-card">
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <span>Priority: {task.priority}</span>
          <div className="task-actions">
            <button onClick={() => handleDelete(task._id)}>🗑 Delete</button>
            <button onClick={() => handleEdit(task)}>✏️ Edit</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="kanban-wrapper">
      <h2 className="board-title">Kanban Task Board</h2>
      <CreateTask onTaskCreated={(newTask) => setTasks((prev) => [...prev, newTask])} />
      <div className="kanban-board">
        {renderColumn('Todo')}
        {renderColumn('In Progress')}
        {renderColumn('Done')}
      </div>
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdate={handleUpdateTask}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
