import React, {createContext, useState, useContext, useMemo} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? storedUser : null;
  });

  const [sessionToken, setToken] = useState(() =>
    localStorage.getItem('session_token') || null
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
    sessionToken,
    setToken: (newToken) => {
      if (newToken) {
        localStorage.setItem('session_token', newToken);
        setToken(newToken);
      } else {
        localStorage.removeItem('session_token');
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
      localStorage.removeItem('session_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      setToken(null);
      setRemainingRequests(null);
    }
  }), [user, sessionToken, darkMode, remainingRequests]);

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
