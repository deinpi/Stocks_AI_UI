import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from "../contexts/Authcontext";
import Logo from './Logo';

export const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const { user, deleteUser, darkMode, toggleDarkMode } = useAuth();

  const handleLogout = () => {
    deleteUser();
    navigate('/login');
  };

  return (
    <nav className=" shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg "
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 " />
              )}
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-2 rounded-lg "
              >
                <UserIcon className="h-5 w-5 " />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg  ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm "
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
