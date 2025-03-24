import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import ApiController from "../controlers/ApiControler";
import {BarChart2, Lock, Mail} from "lucide-react";
import {Input} from "../UI/Input.jsx";
import {Button} from "../UI/Button.jsx";
import {Footer} from "../UI/Footer.jsx";

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
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
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
                  Create an Account
                </p>
              </div>
              <div className="space-y-4 m-2 w-3/4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) =>
                    setPayload((prev) => ({...prev, email: e.target.value}))
                  }
                  fullWidth
                  leftIcon={<Mail size={16}/>}
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  onChange={(e) =>
                    setPayload((prev) => ({...prev, password: e.target.value}))
                  }
                  fullWidth
                  leftIcon={<Lock size={16}/>}
                  required
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  onChange={(e) => setCPassword(e.target.value)}
                  fullWidth
                  leftIcon={<Lock size={16}/>}
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
                      to="/termsAndConditions"
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
      <Footer/>
    </div>
  );
};

export default Register;
