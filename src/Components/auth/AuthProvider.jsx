import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);  // {username, role, token}

  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // Esto simula login real — cámbialo cuando tengas backend
  const login = (username, password) => {
    if (username === "admin" && password === "123") {
      const data = { username, role: "admin", token: "fake-admin" };
      localStorage.setItem("auth", JSON.stringify(data));
      setUser(data);
      return { ok: true };
    }
    if (username === "user" && password === "123") {
      const data = { username, role: "user", token: "fake-user" };
      localStorage.setItem("auth", JSON.stringify(data));
      setUser(data);
      return { ok: true };
    }
    return { ok: false, message: "Credenciales incorrectas" };
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
