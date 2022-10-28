import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  onSubmit,
  isOpen,
  onClose,
  buttonText,
  onCloseClick,
}) {
  const ref = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({
      avatar: ref.current.value,
    });
  }

  React.useEffect(() => {
    ref.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      name="new-avatar"
      title="Обновить аватар"
      buttonText={buttonText}
      onCloseClick={onCloseClick}
    >
      <input
        ref={ref}
        id="input-avatar"
        type="url"
        name="input-avatar"
        className="popup__input-form popup__input-form_link"
        placeholder="Ссылка на аватар"
        required
      />
      <span id="error-input-avatar" className="error-message" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
