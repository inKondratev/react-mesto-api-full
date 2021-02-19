import React from "react";
import { useHistory } from "react-router-dom";

function NavBar(props) {
  const history = useHistory();

  function handleClick() {
    props.onSignin()
    localStorage.removeItem("jwt");
    history.push("/signin");
  }
  return(
    <div className="navbar__container">
    {props.userData.email}
    <button className="navbar__button" onClick={handleClick}>Выйти</button>
    </div>
  )
  
};

export default NavBar;
