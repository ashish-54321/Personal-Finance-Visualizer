import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Budgeting from './pages/Budgeting';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/budgeting" element={<Budgeting />} />
      </Routes>
    </Router>
  );
}

export default App;