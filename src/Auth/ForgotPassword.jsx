import React, { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import ApiController from '../controlers/ApiControler'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
    const navigation= useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const forgotPasswordUrl = import.meta.env.VITE_URL_FORGOT_PASSWORD;
    const [payload, setPayload] = useState(''); 
    const [Lock, setLock] = useState(false);
    const handleSubmit = async () => {
        setLock(true);
        try {
            const data = await ApiController(backendUrl, forgotPasswordUrl, {email:payload});
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
        }finally {
            // Unlock button after toast completes
            setTimeout(() => {
                setLock(false);

            }, 5000); // Match toast duration
        }
    }

  return (
    <div className='flex flex-col items-center border justify-center h-screen'>
        <div className={`flex items-center space-x-2 `}>
            <TrendingUp className='h-12 w-12 text-indigo-600 dark:text-indigo-400' />
            <span className='text-3xl font-bold text-gray-900'>StocksAI</span>
        </div>
        <h2 className='pt-5 pb-10 text-3xl font-bold'>Enter Email to reset your password</h2>
        <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
            <input
                type='text'
                placeholder='Email'
                className='px-3 py-1 font-thin text-sm text-gray-700 border rounded-lg w-[350px] h-[40px]'
                onChange={(e) => setPayload(e.target.value)}
            />
    
        <button  
            className={`bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md mt-2 ${
                Lock ? "cursor-wait opacity-50" : "cursor-pointer"
            }`} 
            onClick={handleSubmit} 
            disabled={Lock}
        >
            {Lock ? "Processing..." : "Forgot Password"}
        </button>

            </div>
        </div>

    </div>
  )
}

export default ForgotPassword