import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Navbar} from "../UI/Navbar";
import {LineChart, TrendingUp, Search} from "lucide-react";
import {useAuth} from "../contexts/AuthContext.jsx";
import ApiController from "../controlers/ApiControler";
import {Input} from "../UI/Input";
import {Select} from "../UI/Select";
import {Button} from "../UI/Button";
import {Sidebar} from "../UI/Sidebar";
import {formatCurrency} from "../lib/Utils.jsx";
import {useDashboard} from "../contexts/DashboardContext.jsx";
import Footer from "../UI/Footer.jsx";

const Home = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const technical_url = import.meta.env.VITE_URL_TECHNICAL;
  const fetch_inputs_url = import.meta.env.VITE_URL_FETCH_INPUTS;
  const get_history_url = import.meta.env.VITE_URL_GET_HISTORY;
  const get_remaining_requests_url = import.meta.env.VITE_URL_GET_REMAINING_REQUESTS;

  const navigate = useNavigate();
  const {user, sessionToken, remainingRequests, setRemaining} = useAuth();
  const {selectedAnalysis, setSelectedAnalysis, historyData, setHistoryData} = useDashboard();

  const [loading, setLoading] = useState(false);

  const [exchangeOptions, setExchangeOptions] = useState([]);
  const [setupOptions, setSetupOptions] = useState([]);
  const [tickerOptions, setTickerOptions] = useState([]);

  const [ticker, setTicker] = useState("");
  const [exchange, setExchange] = useState("NSE");
  const [setup, setSetup] = useState("swing");
  const [formData, setFormData] = useState({
    stk: "", exc: "", stp: "",
  });
  const setupTypeMapping = {
    intraday: 'Intraday', swing: 'Swing', longterm: 'Long Term'
  };

  const [tickerSuggestions, setTickerSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [tickerError, setTickerError] = useState('');

  const [data, setData] = React.useState(null);

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (!user) {
    } else {
      fetchInputs();
      fetchAnalysesHistory();
      fetchRemainingRequests();
    }
    setIsCheckingAuth(false);

  }, [user, navigate]);

  const fetchInputs = async () => {
    if (!user || !sessionToken) return; // Ensure user is logged in and token is available

    try {
      const response = await ApiController(backendUrl, fetch_inputs_url, {}, "get", sessionToken);
      const data = await response;

      // Set the fetched data into state
      setExchangeOptions(data?.exchange);
      setSetupOptions(data?.setup_types);
      setTickerOptions(data?.stocks);
    } catch (error) {
      console.error("Error fetching input options:", error);
    }
  };

  const fetchAnalysesHistory = async () => {
    try {
      const response = await ApiController(backendUrl, get_history_url, {}, "get", sessionToken);
      const res = response.data;
      const parsedData = res.map(item => ({
        ...item, result: JSON.parse(item.result)
      }));

      setHistoryData(parsedData);
      setSelectedAnalysis(parsedData[0])

    } catch (error) {
      console.error("Fetch analysis history failed:", error);
    }
  };

  const fetchRemainingRequests = async () => {
    try {
      const response = await ApiController(backendUrl, get_remaining_requests_url, {}, "get", sessionToken);
      const res = response.data;
      console.log(res);
      setRemaining(res?.attempts);
    } catch (error) {
      console.error("Fetch remaining requests failed", error);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!ticker) {
        setTickerError('Please enter a ticker');
        return;
      }

      if (!tickerOptions.includes(ticker)) {
        setTickerError('Please select a valid ticker from the suggestions');
        return;
      }
      formData.stk = ticker;
      formData.exc = exchange;
      formData.stp = setup;
      const response = await ApiController(backendUrl, technical_url, formData, "post", sessionToken);
      const res = JSON.parse(response.data);
      setData(res);
      setLoading(false);
      fetchAnalysesHistory();
      fetchRemainingRequests();

    } catch (error) {
      console.error("Technical analysis request failed:", error);
    } finally {
      setLoading(false);
      setSelectedAnalysis(historyData[0])
    }
  };

  const handleTickerChange = (e) => {
    const value = e.target.value.toUpperCase();
    setTicker(value);
    setTickerError('');

    if (value.length > 0) {
      const filtered = tickerOptions.filter((t) => t.includes(value));
      setTickerSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectTicker = (selected) => {
    setTicker(selected);
    setShowSuggestions(false);
    setTickerError('');
  };

  if (isCheckingAuth) {
    return <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">Loading...</div>
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar/>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar/>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center space-x-3 mb-8">
                <LineChart className="h-6 w-6 text-blue-600 dark:text-blue-500"/>
                <h2 className="text-2xl font-bold text-black dark:text-white">
                  Technical Analysis
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="relative">
                  <Input
                    label="Ticker"
                    placeholder="Enter stock ticker"
                    value={ticker}
                    error={tickerError}
                    onChange={handleTickerChange}
                    fullWidth
                    leftIcon={<Search size={16}/>}
                  />
                  {showSuggestions && tickerSuggestions.length > 0 && (<div
                    className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {tickerSuggestions.map((suggestion) => (<div
                      key={suggestion}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-white"
                      onClick={() => handleSelectTicker(suggestion)}
                    >
                      {suggestion}
                    </div>))}
                  </div>)}
                </div>
                <Select
                  label="Exchange"
                  options={exchangeOptions}
                  value={exchange}
                  onChange={setExchange}
                  fullWidth
                />

                <Select
                  label="Setup"
                  options={setupOptions}
                  value={setup}
                  onChange={setSetup}
                  fullWidth
                />
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={handleAnalyze}
                  isLoading={loading}
                  leftIcon={<TrendingUp size={16}/>}
                  size="lg"
                >
                  Analyze
                </Button>
              </div>
            </div>

            {selectedAnalysis && (<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {selectedAnalysis.user_input.ticker_name} ({selectedAnalysis.user_input.exchange})
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {setupTypeMapping[selectedAnalysis.user_input.setup_type]} Analysis
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${selectedAnalysis.result.Position === "Long" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`}
                  >
                    {selectedAnalysis.result.Position}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Entry Price
                    </p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(selectedAnalysis.result.Entry)}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Target Price
                    </p>
                    <p className="text-xl font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(selectedAnalysis.result.Target)}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Stop Loss
                    </p>
                    <p className="text-xl font-semibold text-red-600 dark:text-red-400">
                      {formatCurrency(selectedAnalysis.result.Stoploss)}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2 text-gray-900 dark:text-white">
                    Analysis Reasoning
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                    <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                      {selectedAnalysis.result.Reason}
                    </p>
                  </div>
                </div>
              </div>
            </div>)}
          </div>
        </div>
      </div>
      <Footer classname="mt-3"/>
    </div>);
};

export default Home;
