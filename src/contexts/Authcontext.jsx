import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token,setToken] = useState(null);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });

    useEffect(() => {
        const token= localStorage.getItem('token');
        const user =localStorage.getItem('user');

        if(token){
            setToken(token)
        }
        if(user){
            setUser(user)
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    const deleteUser = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, deleteUser, toggleDarkMode, darkMode ,token,setToken}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
