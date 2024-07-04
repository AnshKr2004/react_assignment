import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';

const App: React.FC = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/second" element={userDetails.name ? <SecondPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
