import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Trends from './pages/Trends';
import EditProfile from './pages/EditProfile';
import EnterData from './pages/EnterData';
import ChangeData from './pages/ChangeData';
import SetGoals from './pages/SetGoals';
import BackendDemo from './pages/BackendDemo';
import firebaseConfig from './backend/firebaseConfig';

import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/enterdata" element={<EnterData />} />
        <Route path="/changedata" element={<ChangeData />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/setgoals" element={<SetGoals />} />
        <Route path="/" element={<BackendDemo />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
