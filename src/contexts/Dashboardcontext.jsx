import React, { createContext, useContext, useState } from "react";

// Create the context
const DashboardContext = createContext();

// Create the provider component
export const DashboardProvider = ({ children }) => {
  const [analysisIndex, setAnalysisIndex] = useState(0);
  const [historyData, setHistoryData] = useState([]);

  const changeAnalysisIndex = (index) => {
    setAnalysisIndex(index);
  };

  return (
    <DashboardContext.Provider
      value={{
        analysisIndex,
        changeAnalysisIndex,
        historyData,
        setHistoryData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use the DashboardContext
export const useDashboard = () => {
  return useContext(DashboardContext);
};
