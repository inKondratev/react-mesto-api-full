import React, { useState } from "react";
import SignForm from "../SignForm/SignForm";

function Login(props) {
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
    props.onAuthorize(email, password);
  }
  return (
    <SignForm
      title="Вход"
      buttonName="Войти"
      onSubmit={handleSubmit}
      email={email}
      password={password}
      handleChangeEmail={handleChangeEmail}
      handleChangePassword={handleChangePassword}
    />
  );
}

export default Login;
