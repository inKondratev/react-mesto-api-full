import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SignForm from "../SignForm/SignForm";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }
  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(email, password);
  }
  return (
    <>
      <SignForm
        title="Регистрация"
        buttonName="Зарегестрироваться"
        onSubmit={handleSubmit}
        email={email}
        password={password}
        handleChangeEmail={handleChangeEmail}
        handleChangePassword={handleChangePassword}
      />
      <div className="login__link-container">
        <NavLink to="/sign-in" className="login__link">
          Уже зарегистрированы? Войти
        </NavLink>
      </div>
    </>
  );
}

export default Register;
