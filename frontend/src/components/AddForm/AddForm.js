import React from "react";

function AddForm(props) {
  return (
    <>
      <input
        name="name"
        type="text"
        required
        minLength="2"
        maxLength="30"
        placeholder="Название"
        className="popup__input popup__input_type_card-name"
        id="card-name-input"
        ref={props.inputCardName}
        onChange={props.onInputCardName}
      />
      <span id="card-name-input-error" className="popup__input-error"></span>
      <input
        name="link"
        type="url"
        required
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_type_url"
        id="url-input"
        ref={props.inputLink}
        onChange={props.onInputLink}
      />
      <span id="url-input-error" className="popup__input-error"></span>
    </>
  );
}

export default AddForm;
