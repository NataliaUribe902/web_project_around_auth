import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login({ handleLogin }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };
  return (
    <>
      <header className="header page__section">
        <img
          alt="Logotipo Around The U.S."
          className="logo header__logo"
          src={logo}
        />
        <Link to="/signup" className="header__link">
          Regístrate
        </Link>
      </header>

      <div className="login">
        <p className="login__title">Inicia sesión</p>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            id="email"
            required
            name="email"
            type="email"
            placeholder="Correo electrónico"
            className="login__input"
            value={data.email}
            onChange={handleChange}
          />
          <input
            className="login__input"
            id="password"
            required
            name="password"
            type="password"
            placeholder="Contraseña"
            value={data.password}
            onChange={handleChange}
          />
          <div className="login__button-container">
            <button type="submit" className="login__button">
              Inicia sesión
            </button>
          </div>
        </form>

        <div className="login__signup">
          <Link to="/signup" className="signup__link">
            ¿Aún no eres miembro? Regístrate aquí
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
