// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes'; // Your routing setup
import { AuthProvider } from './contexts/AuthContext'; // Your Auth context
import Navbar from './components/Navbar'; // Import the Navbar
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Ensure Navbar is included here */}
        <AppRouter />
      </Router>
    </AuthProvider>
  );
};

export default App;