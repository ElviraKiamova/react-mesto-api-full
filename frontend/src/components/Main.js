import React from "react";
import Card from "../components/Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const {
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
    onCardLike,
    onCardDelete,
    cards,
  } = props;

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile page__profile">
        <button
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
          onClick={onEditAvatar}
          aria-label="Править"
          type="button"
          className="profile__button-avatar"
        />
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            aria-label="Редактировать"
            type="button"
            className="profile__button-pen"
          />
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          aria-label="Добавить"
          type="button"
          className="profile__button-cross"
        />
      </section>

      <section className="elements page__elements">
        {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
      </section>
    </main>
  );
}

export default Main;
