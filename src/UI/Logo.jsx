import React from 'react'
import { TrendingUp } from 'lucide-react';
const Logo = () => {
  return (
    <div className={`flex items-center space-x-2 `}>
        <TrendingUp className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
        <span className="text-xl font-bold text-gray-900">StocksAI</span>
    </div>
  )
}

export default Logo