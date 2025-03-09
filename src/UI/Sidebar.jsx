import React, { useState } from "react";
import { ChevronLeft, ChevronRight, BarChart2 } from "lucide-react";
import { cn } from "../lib/utils";
import { useDashboard } from "../contexts/DashboardContext";

export const Sidebar = ({ setData, className }) => {
    const [collapsed, setCollapsed] = useState(false);
    const { analysisIndex, changeAnalysisIndex, historyData } = useDashboard();
  
    const toggleSidebar = () => {
      setCollapsed(!collapsed);
    };

    return (
      <div
        className={cn(
          "flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          className
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          {!collapsed && (
            <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
              History
            </h2>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
  
        <div className="flex-1 overflow-y-auto">
          {historyData.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              {!collapsed && "No analysis history yet"}
              {collapsed && <BarChart2 className="mx-auto" size={20} />}
            </div>
          ) : 
          //if history data exists, map through the data and display it
          (
            <div>
              {historyData.map((analysis) => {
                const analysisRes = analysis?.result;
                return (
                  <div
                    key={analysis.id}
                    className={cn(
                      "p-2 rounded-md cursor-pointer space-y-1",
                      console.log(analysisIndex),
                      analysisIndex === historyData.indexOf(analysis)
                      
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100",
                      collapsed ? "flex justify-center" : ""
                    )}
                    onClick={() => {
                        setData(analysis); 
                        changeAnalysisIndex(historyData.indexOf(analysis));
                    }}
                  >
                    {collapsed ? (
                      <div className="flex flex-col items-center">
                        <span
                          className={cn(
                            "w-6 h-6 flex items-center justify-center rounded-full text-xs",
                            analysisRes?.Position === "Long"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          )}
                        >
                          {analysisRes?.Position === "Long" ? "L" : "S"}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          {analysis?.user_input?.ticker_name}
                        </span>
                        <span
                          className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            analysisRes?.Position === "Long"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          )}
                        >
                          {analysisRes?.Position}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };
  