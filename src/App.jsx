// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes'; // Your routing setup
import { AuthProvider } from './contexts/AuthContext'; // Your Auth context
import Navbar from './components/Navbar'; // Import the Navbar
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { I18nextProvider } from "react-i18next";
import i18n from "./utils/i18n";

const App = () => {
  return (

    <AuthProvider>
      <I18nextProvider i18n={i18n}>
        <Router>
          <Navbar /> {/* Ensure Navbar is included here */}
          <AppRouter />
        </Router>
      </I18nextProvider>
    </AuthProvider>

  );
};

export default App;