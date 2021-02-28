import React from "react";

function PopupWithForm(props) {
  
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
          <h2 className="popup__header">{props.title}</h2>
          <fieldset className="popup__input-container">
            {props.children}
          </fieldset>
          <button
            type="submit"
            className={`popup__button popup__button_${props.name}`}
            ria-label="Кнопка подтверждения"
          >
            Сохранить
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
