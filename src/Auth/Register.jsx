import React,{useState,useContext} from "react";
import { useNavigate,Link } from "react-router-dom";
import ApiController from "../controlers/ApiControler";

const Register = () => {
  const navigation= useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [Cpassword,setCPassword]=useState("");
  const [error, setError]= useState(false);
  const [payload,setPayload]=useState({
    email:"",
    password:"",
  });

  const handleSubmit= async()=>
  {
    try{
        if(payload.password!==Cpassword){
            setError(true);
            return;
        }
        const data=await ApiController(backendUrl,"/register",payload);
        if(data){
            navigation("/login");
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
        <h2 className="pt-5 pb-10 text-3xl font-bold">Create A New Account</h2>
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
           placeholder="password"
           className="px-3 py-1 font-thin text-gray-700 border rounded-lg w-[350px] h-[40px]"
           onChange={(e) => setPayload((prev) => ({ ...prev, password: e.target.value }))}
           />

          <input
           type="password"
           placeholder="confirm password"
           className="px-3 py-1 font-thin text-gray-700 border rounded-lg w-[350px] h-[40px]"
           onChange={(e) => setCPassword(e.target.value)}
           />
          </div>

          {
            error && <p className="text-red-500">Passwords do not match</p>
          }
          
          <button onClick={handleSubmit} className="bg-blue-700 text-white px-3 py-1 rounded-md ">Login</button>
        </div>
        <p className="py-5 text-sm text-blue-800">Don't have an account? <Link to={"/register"} >Register</Link></p>

    </div>
  );
};

export default Register;