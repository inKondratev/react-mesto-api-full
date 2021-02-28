import React from "react";

function SignForm(props) {
  return (
    <div className="login__container">
      <h1 className="login__header">{props.title}</h1>
      <form className="login__form">
        <input
          value={props.email}
          onChange={props.handleChangeEmail}
          type="email"
          name="email"
          placeholder="Email"
          className="login__input login__input_type-email"
        ></input>
        <input
          value={props.password}
          onChange={props.handleChangePassword}
          type="password"
          name="password"
          placeholder="Password"
          className="login__input login__input_type-password"
        ></input>
      </form>
      <div className="button__container">
        <button className="login__button" onClick={props.onSubmit}>
          {props.buttonName}
        </button>
      </div>
    </div>
  );
}

export default SignForm;
