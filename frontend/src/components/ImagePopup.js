import React from "react";

function ImagePopup({ card, name, isOpen, onClose, onCloseClick }) {
  return (
    <div
      className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={onCloseClick}
    >
      <div className="popup__box-picture">
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__button-cross"
          onClick={onClose}
        />
        <img
          src={`${card?.link || "#"}`}
          alt={`${card?.name ?? " "}`}
          className="popup__picture"
        />
        <p className="popup__text-picture">{`${card?.name ?? " "}`}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
