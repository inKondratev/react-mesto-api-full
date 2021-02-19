import React from "react";
import iconOk from "../../images/ok.svg";

function ShowOk(props) {
  return (
    <div className="tooltip__container">
      <img src={iconOk} alt="show-ok" />
      <p>Вы успешно зарегистрировались!</p>
    </div>
  );
}

export default ShowOk;
