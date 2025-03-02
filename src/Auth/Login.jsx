import React,{useState,useContext} from "react";
import { useNavigate,Link } from "react-router-dom";
import ApiController from "../controlers/ApiControler";
import {useAuth} from "../contexts/Authcontext";
import { TrendingUp } from 'lucide-react';

const Login = () => {
  const navigation= useNavigate();
  // const {user,setUser}= useContext();
  const {user,setUser,setToken}=useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const login_url= import.meta.env.VITE_URL_LOGIN;
  const [payload,setPayload]=useState({
    email:"",
    password:"",
  });

  const handleSubmit= async()=>
  {
    try{
      console.log("Login payload",payload);
        const data=await ApiController(backendUrl,login_url,payload);
        if(data)
        {
            setUser(payload.email);
            setToken(data.token);
            localStorage.setItem("token",data.token);
            localStorage.setItem("user",payload.email);
            navigation("/");
        }
    }
    catch(err){
       console.log(err);
    }

  }


  return (
    <div className="flex flex-col items-center border justify-center h-screen">
        <div className="flex gap-2">
           <div className={`flex items-center space-x-2 `}>
              <TrendingUp className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
              <span className="text-3xl font-bold text-gray-900">StocksAI</span>
          </div>
        </div>
        <h2 className="pt-5 pb-10 text-3xl font-bold">Sign in to your account</h2>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Email"
            className="px-3 py-1 font-thin text-sm text-gray-700 border rounded-lg w-[350px] h-[40px]"
            onChange={(e) => setPayload((prev) => ({ ...prev, email: e.target.value }))}
          />

          <input
           type="password"
           placeholder="Passowrd"
           className="px-3 py-1 font-thin text-gray-700 border rounded-lg w-[350px] h-[40px]"
           onChange={(e) => setPayload((prev) => ({ ...prev, password: e.target.value }))}
           />

          </div>
          <p className=" text-sm text-blue-800">Forgot Password ? <Link to={"/forgotPass"} >Click Here</Link></p>
          <button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md ">Login</button>
        </div>
        <p className="py-5 text-sm text-blue-800">Don't have an account? <Link to={"/register"} >Register</Link></p>

    </div>
  );
};

export default Login;