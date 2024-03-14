import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import InfoPage from './InfoPage';
import Exercises from './Components/Exercises/Exercises';
import MyCourse from './MyCourse';
import './App.css';

function App() {
 return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<InfoPage />} />
          <Route path="/mycourse" element={<MyCourse />} />
          <Route path="/exercise" element={<Exercises />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>
      </div>
    </BrowserRouter>
 );
}

export default App;