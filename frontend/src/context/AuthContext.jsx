import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("ems-user")) || null
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem("ems-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("ems-user");
    }
  }, [user]);

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
