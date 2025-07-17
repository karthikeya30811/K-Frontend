import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimatedAuth from './Components/AnimatedAuth';
import KanbanBoard from './Components/Kanban';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnimatedAuth />} />
                <Route path="/dashboard" element={<KanbanBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
