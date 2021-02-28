import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import AddForm from "../AddForm/AddForm";

function AddPlacePopup(props) {
  const inputCardNameRef = React.useRef();
  const inputLinkRef = React.useRef();

  function handleInputCardName() {
    return inputCardNameRef.current.value;
  }
  function handleInputLink() {
    return inputLinkRef.current.value;
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace({
        name:handleInputCardName(),
        link:handleInputLink()
    })
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      children={
        <AddForm
          inputCardName={inputCardNameRef}
          inputLink={inputLinkRef}
          onInputCardName={handleInputCardName}
          onInputLink={handleInputLink}
        />
      }
      onSubmit={handleSubmit}
    />
  );
}

export default AddPlacePopup;
