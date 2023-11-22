// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDirectory from './components/user-directory';
import UserProfile from './components/user-profile';
import './App.css'; // Import Tailwind CSS styles


function App() {
  return (
    <Router>
      <div className="mx-auto mt-8">
        <Routes>
          <Route path="/" element={<UserDirectory/>} />
          <Route path="/user/:userId" element={<UserProfile/>} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;
