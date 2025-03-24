import React, {useState} from 'react'
import {BarChart2, Lock, Mail, TrendingUp} from 'lucide-react'
import ApiController from '../controlers/ApiControler'
import {toast} from 'react-toastify';
import {Link, useNavigate} from "react-router-dom";
import {Input} from "../UI/Input.jsx";
import {Button} from "../UI/Button.jsx";
import {Footer} from "../UI/Footer.jsx";

const ForgotPassword = () => {
  const navigation = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const forgotPasswordUrl = import.meta.env.VITE_URL_FORGOT_PASSWORD;
  const [payload, setPayload] = useState('');
  const [Lock, setLock] = useState(false);
  const handleSubmit = async () => {
    setLock(true);
    try {
      const data = await ApiController(backendUrl, forgotPasswordUrl, {email: payload});
      console.log(data);
      toast.success('Reset password link sent to registered Email', {
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
      }, 6000);

    } catch (err) {
      console.log(err);
    } finally {
      // Unlock button after toast completes
      setTimeout(() => {
        setLock(false);

      }, 5000); // Match toast duration
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex flex-col items-center space-y-2 mt-1">
              <div className="flex items-center space-x-1">
                <BarChart2 className="h-8 w-8 text-blue-600 dark:text-blue-500"/>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  Stocks AI
                </span>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  We'll send you a link to reset your password
                </p>
              </div>
              <div className="space-y-4 m-2 w-3/4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setPayload(e.target.value)}
                  fullWidth
                  leftIcon={<Mail size={16}/>}
                  required
                />
              </div>
              <div className="w-3/4">
                <Button
                  type="submit"
                  className={`${
                    Lock ? "cursor-wait opacity-50" : "cursor-pointer"
                  }`}
                  fullWidth
                  onClick={handleSubmit}
                  disabled={Lock}
                >
                  {Lock ? "Processing..." : "Send Reset Link"}
                </Button>
              </div>
              <div className="text-center">
                <Link
                  to="/login"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default ForgotPassword