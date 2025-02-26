import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../UI/Navbar';
import { LineChart, TrendingUp, Clock } from 'lucide-react';
import Cookies  from 'js-cookie';
import {useAuth} from "../contexts/Authcontext";
import ApiController from '../controlers/ApiControler';


const Home = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const {user,token}=useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    stk: 'SBIN',
    exc: 'NSE',
    stp: 'intraday'
  });

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    if (!user) {
      // navigate('/login');
    }
  }, [user, navigate]);

  const cleanJsonString = (data) => {
    try {
        // Parse the JSON string to an object
        let parsedData = JSON.parse(data);

        // Convert it back to a string with proper formatting
        return JSON.stringify(parsedData, null, 2); // Pretty print with indentation
    } catch (error) {
        console.error("Invalid JSON format:", error);
        return null;
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(user);
      const response = await ApiController(backendUrl, 'technical', formData, 'post',token);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Technical analysis data:', data);
        setData(cleanJsonString(response.data));
        setLoading(false);
        print(data)
      }
    } catch (error) {
      console.error('Technical analysis request failed:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 ">
    <Navbar />
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white :bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-8">
            <LineChart className="h-8 w-8 text-indigo-600 :text-indigo-400" />
            <h2 className="text-2xl font-bold text-gray-900 :text-white">
              Technical Analysis
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Stock Name Section */}
              <div className="bg-gray-50 :bg-gray-700/50 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-indigo-600 :text-indigo-400" />
                  <label htmlFor="stk" className="block text-sm font-medium text-gray-700 :text-gray-300">
                    Stock Name
                  </label>
                </div>
                <input
                  type="text"
                  id="stk"
                  name="stk"
                  value={formData.stk}
                  onChange={(e) => setFormData({ ...formData, stk: e.target.value })}
                  className="px-2 py-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm :bg-gray-700 :border-gray-600 :text-white"
                  placeholder="Enter stock name"
                />
              </div>

              {/* Exchange Section */}
              <div className="bg-gray-50 :bg-gray-700/50 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <LineChart className="h-5 w-5 text-indigo-600 :text-indigo-400" />
                  <label htmlFor="exc" className="block text-sm font-medium text-gray-700 :text-gray-300">
                    Exchange
                  </label>
                </div>
                <select
                  id="exc"
                  name="exc"
                  value={formData.exc}
                  onChange={(e) => setFormData({ ...formData, exc: e.target.value })}
                  className="px-2 py-4 block w-full cursor-pointer rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm :bg-gray-700 :border-gray-600 :text-white"
                >
                  <option value="NSE">NSE</option>
                  <option value="BSE">BSE</option>
                </select>
              </div>

              {/* Setup Type Section */}
              <div className="bg-gray-50 :bg-gray-700/50 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="h-5 w-5 text-indigo-600 :text-indigo-400" />
                  <label htmlFor="stp" className="block text-sm font-medium text-gray-700 :text-gray-300">
                    Setup Type
                  </label>
                </div>
                <select
                  id="stp"
                  name="stp"
                  value={formData.stp}
                  onChange={(e) => setFormData({ ...formData, stp: e.target.value})}
                  className="px-2 cursor-pointer py-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm :bg-gray-700 :border-gray-600 :text-white"
                >
                  <option value="longterm">Long Term</option>
                  <option value="swing">Swing</option>
                  <option value="intraday">Intraday</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={loading}
                className="relative w-64 flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200 cursor-pointer"
              >
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-start overflow-hidden">
                    <div className="h-2 w-8 bg-white rounded-full animate-pendulum"></div>
                  </div>
                ) : (
                  'Analyze'
                )}
              </button>
            </div>
          </form>

        </div>
        {
          data && (
            <div className='bg-white :bg-gray-800 rounded-lg shadow-lg p-8 pt-10'>
                <div className="flex items-center space-x-3 mb-8">
                  <LineChart className="h-8 w-8 text-indigo-600 :text-indigo-400" />
                  <h2 className="text-2xl font-bold text-gray-900 :text-white">
                    Technical Analysis Result
                  </h2>
                </div>
                <pre className="text-sm overflow-x-auto :bg-gray-700 :text-white p-4 rounded-lg">
                    <h2>Position : {data?.Position}</h2>
                    <div className='flex justify-between'>
                      <h2>Enrty : {data?.Entry}</h2>
                      <h2>Target : {data?.Target}</h2>
                      <h2>Stoploss : {data?.Stoploss}</h2>
                    </div>
                    <p>Reason: {data.Reason}</p>
                </pre>
            </div>
          )
        }

      </div>
    </div>
  </div>
  )
}

export default Home