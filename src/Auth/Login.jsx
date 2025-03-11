import React, {useState, useContext} from "react";
import {useNavigate, Link} from "react-router-dom";
import ApiController from "../controlers/ApiControler";
import {useAuth} from "../contexts/AuthContext.jsx";
import {BarChart2, Mail, Lock} from 'lucide-react';
import {Input} from "../UI/Input.jsx";
import {Button} from "../UI/Button.jsx";

const Login = () => {
  const navigation = useNavigate();
  // const {user,setUser}= useContext();
  const {user, setUser, setToken} = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const login_url = import.meta.env.VITE_URL_LOGIN;
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const data = await ApiController(backendUrl, login_url, payload);
      if (data) {
        setUser(payload.email);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", payload.email);
        navigation("/");
      }
    } catch (err) {
      console.log(err);
    }

  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex flex-col items-center space-y-2 mt-1">
            <div className="flex items-center  space-x-1">
              <BarChart2 className="h-8 w-8 text-blue-600 dark:text-blue-500"/>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Stocks AI
            </span>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Sign in to your account</p>
            </div>
            <div className="space-y-4 m-2 w-3/4">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"

                onChange={(e) => setPayload((prev) => ({...prev, email: e.target.value}))}
                fullWidth
                leftIcon={<Mail size={16}/>}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"

                onChange={(e) => setPayload((prev) => ({...prev, password: e.target.value}))}
                fullWidth
                leftIcon={<Lock size={16}/>}
                required
              />
            </div>
            <div className="flex justify-end w-3/4">
              <Link to="/forgotPassword" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="w-3/4">
              <Button
                type="submit"
                fullWidth
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </div>
            <div className="m-2 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;