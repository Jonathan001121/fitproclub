import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import InfoPage from './InfoPage';
import Home from './Components/Home/Home';
import Exercises from './Components/Exercises/Exercises';
import MyCourse from './Components/MyCourse/MyCourse';
import Mediapipe from './Components/Mediapipe/Mediapipe';
import GameDirectory from './Components/GameDirectory/GameDirectory';
import CardioGame from './Components/CardioGame/CardioGame';
import CustomAvatar from './Components/CustomAvatar/CustomAvatar';
import './App.css';

function App() {
 return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<InfoPage />} />
          {/* <Route path="/mycourse" element={<MyCourse />} /> */}
          <Route path="/exercise1" element={<Exercises />} />
          <Route path="/exercise2" element={<Exercises />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/MyCourse" element={<MyCourse />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mediapipe" element={<Mediapipe/>} />
          <Route path="/gameDirectory" element={<GameDirectory/>} />
          <Route path="/cardiogame" element={<CardioGame/>} />
          <Route path="/customavatar" element={<CustomAvatar/>} />
       
        </Routes>
      </div>
    </BrowserRouter>
 );
}

export default App;