import React from "react";

function  EditAvatarForm(props){
    return (
      <>
        <input
          name="avatar"
          type="url"
          required
          defaultValue=""
          placeholder="Ссылка на автар"
          className="popup__input popup__input_edit-avatar"
          id="url-input"
          ref={props.inputRef}
          onChange={props.onChange}
        />
        <span id="url-input-error" className="popup__input-error"></span>
      </>
    )
}


export default EditAvatarForm;
