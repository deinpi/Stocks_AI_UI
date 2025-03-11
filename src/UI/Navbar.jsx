import React, {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {BarChart2, Moon, Sun, User as UserIcon, LogOut} from 'lucide-react';
import {useAuth} from "../contexts/AuthContext.jsx";
import {Button} from './Button';

export const Navbar = () => {
  const navigate = useNavigate();
  const {user, deleteUser, remainingRequests, darkMode, toggleDarkMode} = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    deleteUser();
    navigate('/login');
  };

  return (
    <div
      className="h-16 px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <BarChart2 className="h-8 w-8 text-blue-600 dark:text-blue-500"/>
        <span className="font-bold text-xl dark:text-white">Stocks AI</span>
      </div>

      <div className="flex items-center space-x-4">
        {/*<Button*/}
        {/*  variant="ghost"*/}
        {/*  size="sm"*/}
        {/*  onClick={toggleDarkMode}*/}
        {/*  className="rounded-full w-10 h-10 p-0"*/}
        {/*>*/}
        {/*  {darkMode === 'true' ? <Sun size={20} /> : <Moon size={20} />}*/}
        {/*</Button>*/}

        <div className="relative" ref={menuRef}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="rounded-full w-10 h-10 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <UserIcon size={20}/>
          </Button>

          {showUserMenu && (
            <div
              className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Remaining requests: <span className="font-medium">{remainingRequests}</span>
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                <LogOut size={16} className="mr-2"/>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
