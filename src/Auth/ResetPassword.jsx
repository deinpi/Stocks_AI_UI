import React,{ useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import { TrendingUp } from 'lucide-react'
import { toast } from 'react-toastify';
import ApiController from '../controlers/ApiControler';
import { useNavigate,Link } from "react-router-dom";

const ResetPassword = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const resetPassword_url = import.meta.env.VITE_URL_RESET_PASSWORD;
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigation= useNavigate();
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
               "password":newPassword,
            } , 'post', token);
            
            if(data){
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
    <div className='flex flex-col items-center border justify-center h-screen'>
        <div className={`flex items-center space-x-2 `}>
            <TrendingUp className='h-12 w-12 text-indigo-600 dark:text-indigo-400' />
            <span className='text-3xl font-bold text-gray-900'>StocksAI</span>
        </div>
        <h2 className='pt-5 pb-10 text-3xl font-bold'>Reset Password</h2>
        <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>    
            <input
                type='password'
                placeholder='Password'
                className='px-3 py-1 font-thin text-gray-700 border rounded-lg w-[350px] h-[40px]'
                onChange={(e) => setNewPassword(e.target.value)}
            />
    
            <input
                type='password'
                placeholder='Confirm password'
                className='px-3 py-1 font-thin text-gray-700 border rounded-lg w-[350px] h-[40px]'
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            </div>

            <button  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md mt-2" onClick={handleResetPassword} >Reset Passowrd</button>
        </div>

    </div>
  )
}

export default ResetPassword