import React from "react";
import PopupWithTooltip from "../PopupWithTooltip/PopupWithTooltip";

function InfoTooltip(props) {
  function handleSubmit() {}
  return (
    <PopupWithTooltip
      name="tooltip"
      isOpen={props.isOpen}
      onClose={props.onClose}
      children={props.children}
      onSubmit={handleSubmit}
    />
  );
}

export default InfoTooltip;
