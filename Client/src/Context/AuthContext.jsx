import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("nextstep-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setTimeout(() => setLoading(false), 0);
  }, []);

  const login = (userData) => {
    localStorage.setItem("nextstep-user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("nextstep-user");
    setUser(null);
    window.location.href = "/login";
  };
  const updateUser = (updatedUser) => {
    localStorage.setItem("nextstep-user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
