import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login"
import Register  from "./Auth/Register";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import { ToastContainer } from 'react-toastify';
import Home from "./Pages/Home"
import { useAuth } from "./contexts/AuthContext.jsx";
import axios from 'axios';
import clsx from 'clsx'

function App() {
  axios.defaults.withCredentials = true;
  const {darkMode} = useAuth();
  return (
    <div className={clsx(darkMode && 'dark')}>
      <ToastContainer position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          // transition={Bounce}
      />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App