import React from "react";
import EditForm from "../EditForm/EditForm";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
        name,
        about: description,
    });
  }
  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      children={
        <EditForm
          name={name}
          description={description}
          onChangeName={handleChangeName}
          onChangeDescription={handleChangeDescription}
        />
      }
      onSubmit={handleSubmit}
    />
  );
}

export default EditProfilePopup;
