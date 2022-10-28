import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
  onCloseClick,
  onSubmit,
  isOpen,
  buttonText,
  onClose,
}) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="open-card"
      title="Новое место"
      buttonText={buttonText}
      onSubmit={handleSubmit}
      onCloseClick={onCloseClick}
    >
      <input
        id="input-card"
        type="text"
        name="input-name"
        className="popup__input-form popup__input-form_position"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span id="error-input-card" className="error-message" />
      <input
        id="input-link"
        type="url"
        name="input-about"
        className="popup__input-form popup__input-form_link"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span id="error-input-link" className="error-message" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
