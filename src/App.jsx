import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login"
import Register  from "./Auth/Register";
import Home from "./Pages/Home"
import { useAuth } from "./contexts/Authcontext";
import axios from 'axios';
import clsx from 'clsx'

function App() {
  axios.defaults.withCredentials = true;
  const {darkMode} = useAuth();
  return (
    <div className={clsx(darkMode && 'dark')}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App