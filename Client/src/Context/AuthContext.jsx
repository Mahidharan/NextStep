import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user/me", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Not logged in");

        const data = await res.json();
        setUser(data.user);

      } catch (err) {
        setUser(null);
        localStorage.removeItem("nextstep-user");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const logout = async () => {
    await fetch("http://localhost:8000/api/user/logout", {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("nextstep-user");
    setUser(null);
    window.location.href = "/login";
  };

  const updateUser = (updatedUser) => {
    localStorage.setItem("nextstep-user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
