import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('akr_user');
    return saved ? JSON.parse(saved) : { id: 'usr-admin', name: 'AKR Race Director', role: 'admin', email: 'admin@ajithkumarracing.com' };
  });
  const [token, setToken] = useState(() => localStorage.getItem('akr_auth_token') || 'akr-demo-token');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('akr_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('akr_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('akr_auth_token', token);
    } else {
      localStorage.removeItem('akr_auth_token');
    }
  }, [token]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await api.login({ email, password });
      if (res.success) {
        setUser(res.user);
        setToken(res.token);
        return { success: true };
      }
      return { success: false, message: res.message || 'Login failed' };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('akr_user');
    localStorage.removeItem('akr_auth_token');
  };

  const isAdmin = user && user.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, isAdmin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
