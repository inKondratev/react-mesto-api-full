import React from "react";

function EditForm(props) {
  
  return (
    <>
      <input
        name="name"
        type="text"
        required
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        className="popup__input popup__input_type_name"
        id="name-input"
        value={props.name}
        onChange={props.onChangeName}
      />
      <span id="name-input-error" className="popup__input-error"></span>
      <input
        name="about"
        type="text"
        required
        minLength="2"
        maxLength="200"
        placeholder="О себе"
        className="popup__input popup__input_type_description"
        id="description-input"
        value={props.description}
        onChange={props.onChangeDescription}
      />
      <span id="description-input-error" className="popup__input-error"></span>
    </>
  );
}

export default EditForm;
