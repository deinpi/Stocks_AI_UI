import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, Moon, Sun, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from "../contexts/AuthContext.jsx";
import { Button } from './Button';

import Logo from './Logo';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, deleteUser, darkMode, toggleDarkMode } = useAuth();

  const handleLogout = () => {
    deleteUser();
    navigate('/login');
  };

  return (
    <div className="h-16 px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <BarChart2 className="h-6 w-6 text-blue-600 dark:text-blue-500" />
        <span className="font-bold text-xl dark:text-white">Stonks AI</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          className="rounded-full w-10 h-10 p-0"
        >
          {darkMode === 'true' ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
        
          {/* <div className="flex flex-col items-end">
            <span className="text-sm font-medium">{user?.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-500">{user?.email}</span>
          </div>*/}
          
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full w-10 h-10 p-0"
          >
            <UserIcon size={20} />
          </Button> 
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="rounded-full w-10 h-10 p-0"
          >
            <LogOut size={20} />
          </Button>
        
      </div>
    </div>
  );
};
