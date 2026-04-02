import { createContext, useContext, useEffect, useState } from 'react';
import http from '../api/http.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('finance_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('finance_token'));
  const [loading, setLoading] = useState(Boolean(token && !user));

  useEffect(() => {
    if (!token || user) {
      return;
    }

    const loadProfile = async () => {
      try {
        const response = await http.get('/users/me');
        setUser(response.data.data);
        localStorage.setItem('finance_user', JSON.stringify(response.data.data));
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token, user]);

  const login = async (credentials) => {
    const response = await http.post('/auth/login', credentials);
    const { user: authUser, token: authToken } = response.data.data;

    localStorage.setItem('finance_token', authToken);
    localStorage.setItem('finance_user', JSON.stringify(authUser));
    setToken(authToken);
    setUser(authUser);
    return authUser;
  };

  const logout = () => {
    localStorage.removeItem('finance_token');
    localStorage.removeItem('finance_user');
    setToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, token, loading, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};