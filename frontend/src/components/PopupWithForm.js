import React from "react";

function PopupWithForm(props) {
  const {
    title,
    name,
    id,
    onClose,
    children,
    isOpen,
    buttonText,
    onSubmit,
    onCloseClick,
  } = props;

  return (
    <div
      onClick={onCloseClick}
      className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <form onSubmit={onSubmit} id={id} name={name} className="popup__form">
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            type="submit"
            aria-label="Сохранить"
            className="popup__button-save"
          >
            {buttonText}
          </button>
        </form>
        <button
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
          className="popup__button-cross"
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
