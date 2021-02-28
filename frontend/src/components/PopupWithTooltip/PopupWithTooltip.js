import React from "react";

function PopupWithTooltip(props) {
  
  return (
    <section
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className={`popup__exit-button popup__exit-button_${props.name}`}
          onClick={props.onClose}
        ></button>
        <form
          className={`popup__form popup__form_${props.name}`}
          name={`form-${props.name}`}
          noValidate
          onSubmit={props.onSubmit}
        >
        {props.children}
        </form>
      </div>
    </section>
  );
}

export default PopupWithTooltip;
