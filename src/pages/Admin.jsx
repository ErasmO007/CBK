import React from "react";
import { useAuth } from "../Auth/AuthProvider";

export default function AdminPage() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 20 }}>
      <h1>Panel Admin</h1>
      <p>Bienvenido {user?.username}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
