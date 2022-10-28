import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({
  onSubmit,
  isOpen,
  onClose,
  buttonText,
  onCloseClick,
}) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({
      profile_name: name,
      profile_job: description,
    });
  }

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      name="profile"
      title="Редактировать профиль"
      buttonText={buttonText}
      onCloseClick={onCloseClick}
    >
      <input
        value={name}
        onChange={handleNameChange}
        id="input-name"
        type="text"
        name="profile_name"
        className="popup__input-form"
        placeholder="Введите ваше имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span id="error-input-name" className="error-message" />
      <input
        value={description}
        onChange={handleDescriptionChange}
        id="input-about"
        type="text"
        name="profile_job"
        className="popup__input-form"
        placeholder="Введите вашу работу"
        minLength="2"
        maxLength="200"
        required
      />
      <span id="error-input-about" className="error-message" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
