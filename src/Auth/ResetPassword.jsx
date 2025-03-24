import React, {useEffect, useState} from 'react'
import {useSearchParams} from "react-router-dom";
import {BarChart2, Lock, Mail, TrendingUp} from 'lucide-react'
import {toast} from 'react-toastify';
import ApiController from '../controlers/ApiControler';
import {useNavigate, Link} from "react-router-dom";
import {Input} from "../UI/Input.jsx";
import {Button} from "../UI/Button.jsx";
import {Footer} from "../UI/Footer.jsx";

const ResetPassword = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const resetPassword_url = import.meta.env.VITE_URL_RESET_PASSWORD;
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigate();
  useEffect(() => {
    if (!token) {
      alert("Invalid or expired token");
    }
  }, [token]);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.warn('passwords do not match', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const data = await ApiController(backendUrl, resetPassword_url, {
        "password": newPassword,
      }, 'post', token);

      if (data) {
        toast.success(data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          navigation("/login");
        }, 5000);
      }

    } catch (err) {
      console.log(err)

    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex flex-col items-center space-y-2 mt-1">
              <div className="flex items-center space-x-1">
                <BarChart2 className="h-8 w-8 text-blue-600 dark:text-blue-500"/>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">Stocks AI
            </span>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Sign in to your account</p>
              </div>
              <div className="space-y-4 m-2 w-3/4">
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter a new password"

                  onChange={(e) => setNewPassword(e.target.value)}
                  fullWidth
                  leftIcon={<Lock size={16}/>}
                  required
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"

                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                  leftIcon={<Lock size={16}/>}
                  required
                />
              </div>
              <div className="w-3/4 mt-2 mb-2">
                <Button
                  type="submit"
                  fullWidth
                  onClick={handleResetPassword}
                >
                  Reset Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default ResetPassword