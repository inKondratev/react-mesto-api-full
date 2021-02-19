import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/Vector3.svg";
import NavBar from "../NavBar/NavBar";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo" />
      {props.loggedIn ? (
        <NavBar userData={props.userData} onSignin={props.onSignin} />
      ) : (
        <NavLink className="navbar__register" to="/signup">
          Регистрация
        </NavLink>
      )}
    </header>
  );
}
export default Header;
