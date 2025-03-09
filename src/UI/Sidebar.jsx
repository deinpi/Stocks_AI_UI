import React, {useState} from "react";
import {ChevronLeft, ChevronRight, BarChart2} from "lucide-react";
import {cn} from "../lib/Utils.jsx";
import {useDashboard} from "../contexts/DashboardContext.jsx";

export const Sidebar = ({className}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {analysisIndex, changeAnalysisIndex, historyData, setSelectedAnalysis} = useDashboard();
  const [currentAnalysis, setCurrentAnalysis] = useState(historyData[analysisIndex]);
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
          {collapsed ? <ChevronRight size={20}/> : <ChevronLeft size={20}/>}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {historyData.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              {!collapsed && "No analysis history yet"}
              {collapsed && <BarChart2 className="mx-auto" size={20}/>}
            </div>
          ) :
          (
            <div className="space-y-1 p-2">
              {historyData.map((analysis) => (
                <div
                  key={analysis._id.$oid}
                  className={cn(
                    'p-2 rounded-md cursor-pointer',
                    currentAnalysis?._id.$oid === analysis._id.$oid
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100',
                    collapsed ? 'flex justify-center' : ''
                  )}

                  onClick={() => {
                    changeAnalysisIndex(analysis._id);
                    setSelectedAnalysis(analysis);
                  }}
                >
                  {collapsed ? (
                    <div className="flex flex-col items-center">
                    <span className={cn(
                      'w-6 h-6 flex items-center justify-center rounded-full text-xs',
                      analysis.result.Position === 'Long'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    )}>
                      {analysis.result.Position === 'Long' ? 'L' : 'S'}
                    </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{analysis.user_input.ticker_name}</span>
                      <span className={cn(
                        'text-xs px-2 py-0.5 rounded-full',
                        analysis.result.Position === 'Long'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      )}>
                      {analysis.result.Position}
                    </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
      </div>
    </div>

      //{historyData.map(item => (
      //key={item._id.$oid}
      //Ticker: {item.user_input.ticker_name}
      //Position: {item.result.Position}
      //Entry: {item.result.Entry}
      //Target: {item.result.Target}
      //Stoploss: {item.result.Stoploss}
      //Reason: {item.result.Reason}
  );
};

export default Sidebar;