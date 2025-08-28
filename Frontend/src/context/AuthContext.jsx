import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('libro_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        ...parsedUser,
        role: parsedUser.role || 'user'
      });
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const userWithRole = {
      ...userData,
      role: userData.role || 'user',
      isAuthenticated: true
    };
    localStorage.setItem('libro_user', JSON.stringify(userWithRole));
    setUser(userWithRole);
  };

  const logout = () => {
    localStorage.removeItem('libro_user');
    setUser(null);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isVendor = () => {
    return user?.role === 'vendor';
  };

  const isUser = () => {
    return user?.role === 'user';
  };

  const value = {
    user,
    login,
    logout,
    isAdmin,
    isVendor,
    isUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
