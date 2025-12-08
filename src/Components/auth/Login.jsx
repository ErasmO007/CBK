import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import "./Login.css";


export default function Login() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const submit = (e) => {
    e.preventDefault();
    const res = auth.login(username, password);

    if (res.ok) {
      if (auth.user.role === "admin") navigate("/admin");
      else navigate("/");
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="login-container">

      {/* Lado izquierdo: imagen */}
      <div className="login-left">
  <img src="/images/login.jpg" alt="login" />
</div>


      {/* Lado derecho: formulario */}
      <div className="login-right">
        <h2>Iniciar sesión</h2>
        <p>Ingresa tus datos para continuar</p>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={submit}>
          <input
            className="login-input"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUser(e.target.value)}
          />

          <input
            className="login-input"
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>

        <p className="login-demo">
          Demo: <strong>admin / 123</strong> – <strong>user / 123</strong>
        </p>
      </div>
    </div>
  );
}
