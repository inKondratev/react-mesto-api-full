import React from "react";
import EditAvatarForm from "../EditAvatarForm/EditAvatarForm";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = React.useRef();

  function handleInputRef() {
    return inputRef.current.value;
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar({
        avatar:handleInputRef()
    })
  }
  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      children={
        <EditAvatarForm inputRef={inputRef} onChange={handleInputRef} />
      }
      onSubmit={handleSubmit}
    />
  );
}

export default EditAvatarPopup;
