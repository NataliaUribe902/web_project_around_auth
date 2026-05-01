import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register({ handleRegistration }) {
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
    handleRegistration(data);
  };
  return (
    <>
      <header className="header page__section">
        <img
          alt="Logotipo Around The U.S."
          className="logo header__logo"
          src={logo}
        />
        <Link to="/signin" className="header__link">
          Iniciar sesión
        </Link>
      </header>

      <div className="login">
        <p className="login__title">Regístrate</p>
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
              Regístrate
            </button>
          </div>
        </form>

        <div className="login__signup">
          <Link to="/login" className="signup__link">
            ¿Ya eres miembro? Inicia sesión aquí
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
