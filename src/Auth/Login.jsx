import React,{useState,useContext} from "react";
import { useNavigate,Link } from "react-router-dom";
import ApiController from "../controlers/ApiControler";
import {useAuth} from "../contexts/Authcontext";
const Login = () => {
  const navigation= useNavigate();
  // const {user,setUser}= useContext();
  const {user,setUser}=useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [payload,setPayload]=useState({
    email:"",
    password:"",
  });

  const handleSubmit= async()=>
  {
    try{
      console.log("Login payload",payload);
        const data=await ApiController(backendUrl,"/login",payload);
        if(data)
        {
            setUser(payload.email);
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
          <h4 className="text-lg font-bold">StocksAI</h4>
        </div>
        <h2 className="pt-5 pb-10 text-3xl font-bold">Sign in to your account</h2>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="demo@example.com"
            className="px-3 py-1 font-thin text-sm text-gray-700 border rounded-lg w-[350px] h-[40px]"
            onChange={(e) => setPayload((prev) => ({ ...prev, email: e.target.value }))}
          />

          <input
           type="password"
           className="px-3 py-1 font-thin text-gray-700 border rounded-lg w-[350px] h-[40px]"
           onChange={(e) => setPayload((prev) => ({ ...prev, password: e.target.value }))}
           />
          </div>
          
          <button onClick={handleSubmit} className="bg-blue-700 text-white px-3 py-1 rounded-md ">Login</button>
        </div>
        <p className="py-5 text-sm text-blue-800">Don't have an account? <Link to={"/register"} >Register</Link></p>

    </div>
  );
};

export default Login;