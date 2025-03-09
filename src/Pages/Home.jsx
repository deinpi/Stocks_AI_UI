import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../UI/Navbar";
import { LineChart, TrendingUp, Clock, Search } from "lucide-react";
import Cookies from "js-cookie";
import { useAuth } from "../contexts/Authcontext";
import ApiController from "../controlers/ApiControler";
import { Input } from "../UI/Input";
import { Select } from "../UI/Select";
import { Button } from "../UI/Button";
import { formatCurrency } from '../lib/utils';

const exchangeOptions = [{ value: "NSE", label: "NSE" }];

const setupOptions = [
  { value: "intraday", label: "Intraday" },
  { value: "swing", label: "Swing" },
  { value: "longterm", label: "Long Term" },
];

const mockTickers = [
  "RELIANCE",
  "TCS",
  "HDFCBANK",
  "INFY",
  "ICICIBANK",
  "HINDUNILVR",
  "SBIN",
  "BAJFINANCE",
  "BHARTIARTL",
  "KOTAKBANK",
  "ASIANPAINT",
  "AXISBANK",
  "MARUTI",
  "TITAN",
  "ULTRACEMCO",
];

const Home = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const technical_url = import.meta.env.VITE_URL_TECHNICAL;
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [ticker, setTicker] = useState("SBIN");

  const [exchange, setExchange] = useState("NSE");
  const [setup, setSetup] = useState("intraday");
  const [tickerSuggestions, setTickerSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [formData, setFormData] = useState({
    stk: "",
    exc: "",
    stp: "",
  });

  // const {
  //   currentAnalysis,
  //   isLoading,
  //   error,
  //   fetchAnalysis,
  //   provideFeedback
  // } = useAnalysisStore();

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleTickerChange = (e) => {
    const value = e.target.value.toUpperCase();
    setTicker(value);

    if (value.length > 0) {
      const filtered = mockTickers.filter((t) => t.includes(value));
      setTickerSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectTicker = (selected) => {
    setTicker(selected);
    setShowSuggestions(false);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(user);
      formData.stk = ticker;
      formData.exc = exchange;
      formData.stp = setup;
      const response = await ApiController(
        backendUrl,
        technical_url,
        formData,
        "post",
        token
      );
      const res = JSON.parse(response.data);
      setData(res);
      setLoading(false);
    } catch (error) {
      console.error("Technical analysis request failed:", error);
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative">
                <Input
                  label="Ticker"
                  placeholder="Enter stock ticker"
                  value={ticker}
                  onChange={handleTickerChange}
                  fullWidth
                  leftIcon={<Search size={16} />}
                />
                {showSuggestions && tickerSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {tickerSuggestions.map((suggestion) => (
                      <div
                        key={suggestion}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-white"
                        onClick={() => handleSelectTicker(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
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
                leftIcon={<TrendingUp size={16} />}
                size="lg"
              >
                Analyze
              </Button>
            </div>
          </div>

          {data && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formData.stk} ({formData.exc})
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formData.stp} Analysis
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      data?.Position === "Long"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {data?.Position}
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
                      {formatCurrency(data?.Entry)}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Target Price
                    </p>
                    <p className="text-xl font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(data?.Target)}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Stop Loss
                    </p>
                    <p className="text-xl font-semibold text-red-600 dark:text-red-400">
                      {formatCurrency(data?.Stoploss)}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2 text-gray-900 dark:text-white">
                    Analysis Reasoning
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                    <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                      {data.Reason}
                    </p>
                  </div>
                </div>

                {/* <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="text-md font-medium mb-2 text-gray-900 dark:text-white">
                    Rate this analysis (0-10)
                  </h4>

                  {currentAnalysis.feedbackScore !== null ? (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-blue-800 dark:text-blue-300">
                      <p>
                        Thank you for your feedback! You rated this analysis:{" "}
                        <span className="font-bold">
                          {currentAnalysis.feedbackScore}/10
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          0
                        </span>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={feedbackValue}
                          onChange={(e) =>
                            setFeedbackValue(parseInt(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          10
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Your rating:{" "}
                          <span className="font-bold">{feedbackValue}</span>
                        </div>
                        <Button
                          onClick={() =>
                            handleFeedbackSubmit(currentAnalysis.id)
                          }
                          size="sm"
                        >
                          Submit Feedback
                        </Button>
                      </div>
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
