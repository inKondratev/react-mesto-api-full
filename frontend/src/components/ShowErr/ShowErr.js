import React from "react";
import iconErr from "../../images/err.svg";

function ShowOk(props) {
  return (
    <div className="tooltip__container">
      <img src={iconErr} alt="show-ok" />
      <p>Что-то пошло не так! Попробуйте ещё раз.</p>
    </div>
  );
}

export default ShowOk;
