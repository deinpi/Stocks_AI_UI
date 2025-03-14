import React, {createContext, useState, useContext, useMemo} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? storedUser : null;
  });

  const [token, setToken] = useState(() =>
    localStorage.getItem('token') || null
  );

  const [remainingRequests, setRemainingRequests] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  // Memoized context value
  const value = useMemo(() => ({
    user,
    setUser: (newUser) => {
      if (newUser) {
        localStorage.setItem('user', newUser);
        setUser(newUser);
      } else {
        localStorage.removeItem('user');
        setUser(null);
      }
    },
    token,
    setToken: (newToken) => {
      if (newToken) {
        localStorage.setItem('token', newToken);
        setToken(newToken);
      } else {
        localStorage.removeItem('token');
        setToken(null);
      }
    },
    darkMode,
    toggleDarkMode: () => {
      const newMode = !darkMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      setDarkMode(newMode);
    },
    remainingRequests,
    setRemaining: (newReq) => {
      setRemainingRequests(newReq--);
    },
    deleteUser: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
      setRemainingRequests(null);
    }
  }), [user, token, darkMode, remainingRequests]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
