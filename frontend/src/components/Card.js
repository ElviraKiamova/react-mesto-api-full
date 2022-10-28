import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const { link, name, _id } = card;
  const likes = card.likes.map((item) => item._id);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(_id, isLiked);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  return (
    <article className="element">
      <button
        onClick={handleDeleteClick}
        type="button"
        className={
          isOwn ? "element__delete-button" : "element__delete-button_disabled"
        }
      />
      <img
        className="element__image"
        alt={name}
        src={link}
        onClick={handleClick}
      />
      <div className="element__block">
        <h2 className="element__title">{name}</h2>
        <div className="element__container-heart">
          <button
            type="button"
            className={`element__heart-button ${
              isLiked ? "element__heart-button_dark" : ""
            }`}
            onClick={handleLikeClick}
          />
          <p
            className="element__counter"
          >
            {likes.length}
          </p>
        </div>
      </div>
    </article>
  );
}

export default Card;
