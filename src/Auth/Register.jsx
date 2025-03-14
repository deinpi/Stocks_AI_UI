// import React,{useState,useContext} from "react";
// import { useNavigate,Link } from "react-router-dom";
// import ApiController from "../controlers/ApiControler";
// import {BarChart2, Lock, Mail, TrendingUp} from 'lucide-react';
// import {Input} from "../UI/Input.jsx";
// import {Button} from "../UI/Button.jsx";

// const Register = () => {
//   const navigation= useNavigate();
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const register_url = import.meta.env.VITE_URL_REGISTER;
//   const [Cpassword,setCPassword]=useState("");
//   const [error, setError]= useState(false);
//   const [payload,setPayload]=useState({
//     email:"",
//     password:"",
//   });

//   const handleSubmit= async()=>
//   {
//     try{
//         if(payload.password!==Cpassword){
//             setError(true);
//             return;
//         }
//         const data=await ApiController(backendUrl,register_url,payload);
//         if(data){
//             navigation("/login");
//         }
//     }
//     catch(err){
//        console.log(err);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
//           <div className="flex flex-col items-center space-y-2 mt-1">
//             <div className="flex items-center space-x-1">
//               <BarChart2 className="h-8 w-8 text-blue-600 dark:text-blue-500"/>
//               <span className="text-2xl font-bold text-gray-900 dark:text-white">Stocks AI
//             </span>
//             </div>
//             <div>
//               <p className="text-gray-600 dark:text-gray-400 mt-1">Create an Account</p>
//             </div>
//             <div className="space-y-4 m-2 w-3/4">
//               <Input
//                 label="Email"
//                 type="email"
//                 placeholder="Enter your email"

//                 onChange={(e) => setPayload((prev) => ({ ...prev, email: e.target.value }))}
//                 fullWidth
//                 leftIcon={<Mail size={16}/>}
//                 required
//               />
//               <Input
//                 label="Password"
//                 type="password"
//                 placeholder="Create a password"

//                 onChange={(e) => setPayload((prev) => ({ ...prev, password: e.target.value }))}
//                 fullWidth
//                 leftIcon={<Lock size={16}/>}
//                 required
//               />
//               <Input
//                 label="Confirm Password"
//                 type="password"
//                 placeholder="Confirm your password"

//                 onChange={(e) => setCPassword(e.target.value)}
//                 fullWidth
//                 leftIcon={<Lock size={16}/>}
//                 required
//               />

//               {
//                 error && <p className="text-red-500">Passwords do not match</p>
//               }

//             </div>
//             <div className="w-3/4 mt-1">
//               <Button
//                 type="submit"
//                 fullWidth
//                 onClick={handleSubmit}
//               >
//                 Sign Up
//               </Button>
//             </div>
//             <div className="m-2 text-center">
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Already have an account?{' '}
//                 <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
//                   Sign in
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     // <div className="flex flex-col items-center border justify-center h-screen">
//     //       <div className={`flex items-center space-x-2 `}>
//     //           <TrendingUp className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
//     //           <span className="text-3xl font-bold text-gray-900">StocksAI</span>
//     //       </div>
//     //     <h2 className="pt-5 pb-10 text-3xl font-bold">Create A New Account</h2>
//     //     <div className="flex flex-col gap-5">
//     //       <div className="flex flex-col gap-2">
//     //       <input
//     //         type="text"
//     //         placeholder="Email"
//     //         className="px-3 py-1 font-thin text-sm text-gray-700 border rounded-lg w-[350px] h-[40px]"
//     //         onChange={(e) => setPayload((prev) => ({ ...prev, email: e.target.value }))}
//     //       />
//     //
//     //       <input
//     //        type="password"
//     //        placeholder="Password"
//     //        className="px-3 py-1 font-thin text-gray-700 border rounded-lg w-[350px] h-[40px]"
//     //        onChange={(e) => setPayload((prev) => ({ ...prev, password: e.target.value }))}
//     //        />
//     //
//     //       <input
//     //        type="password"
//     //        placeholder="Confirm password"
//     //        className="px-3 py-1 font-thin text-gray-700 border rounded-lg w-[350px] h-[40px]"
//     //        onChange={(e) => setCPassword(e.target.value)}
//     //        />
//     //       </div>
//     //
//     //       {
//     //         error && <p className="text-red-500">Passwords do not match</p>
//     //       }
//     //
//     //       <button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md ">Login</button>
//     //     </div>
//     //     <p className="py-5 text-sm text-blue-800">Already have an account? <Link to={"/login"} >Login</Link></p>
//     //
//     // </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ApiController from "../controlers/ApiControler";
import { BarChart2, Lock, Mail } from "lucide-react";
import { Input } from "../UI/Input.jsx";
import { Button } from "../UI/Button.jsx";

const Register = () => {
  const navigation = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const register_url = import.meta.env.VITE_URL_REGISTER;
  const [Cpassword, setCPassword] = useState("");
  const [error, setError] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false); // State for checkbox
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      if (payload.password !== Cpassword) {
        setError(true);
        return;
      }
      const data = await ApiController(backendUrl, register_url, payload);
      if (data) {
        navigation("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex flex-col items-center space-y-2 mt-1">
            <div className="flex items-center space-x-1">
              <BarChart2 className="h-8 w-8 text-blue-600 dark:text-blue-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                Stocks AI
              </span>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Create an Account
              </p>
            </div>
            <div className="space-y-4 m-2 w-3/4">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, email: e.target.value }))
                }
                fullWidth
                leftIcon={<Mail size={16} />}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, password: e.target.value }))
                }
                fullWidth
                leftIcon={<Lock size={16} />}
                required
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                onChange={(e) => setCPassword(e.target.value)}
                fullWidth
                leftIcon={<Lock size={16} />}
                required
              />

              {error && <p className="text-red-500">Passwords do not match</p>}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="acceptTerms"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  I accept the{" "}
                  <Link
                    to="/terms-and-conditions"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
            </div>
            <div className="w-3/4 mt-1">
              <Button
                type="submit"
                fullWidth
                onClick={handleSubmit}
                disabled={!acceptTerms} // Disable button if checkbox is not checked
              >
                Sign Up
              </Button>
            </div>
            <div className="m-2 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
