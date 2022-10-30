
import React, { useState, useEffect, useCallback } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import api from "../utils/Api";
import * as auth from "../utils/auth";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoToolTip from "../components/InfoToolTip.js";
import ProtectedRoute from "./ProtectedRoute.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSelectedCard, setIsSelectedCard] = useState(false);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);


  const searchUserApiResult = () => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAvatarUpdate(data) {
    api
      .handleUserAvatar(data)
      .then((res) => {
        setCurrentUser((user) => ({ ...user, avatar: res.data.avatar }));
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }


  function handleAddPlaceSubmit(data) {
    api
      .createCardApi(data)
      .then((newCard) => {
        setCards([...cards, newCard.data]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
    }
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, [isOpen]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsSelectedCard(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsSelectedCard(false);
    setSelectedCard(null);
    setIsInfoToolTipOpen(false);
  };

  
  function handleCardLike(_id, isLiked) {
    api
      .toggleLike(_id, isLiked)
      .then((res) => {
        setCards((stateCards) => stateCards.map((c) => c._id === _id ? res.data : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardId));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handlePopupCloseClick(evt) {
    if (evt.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  const history = useHistory();
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  // Регистрация
  function handleRegister({ email, password }) {
    auth
      .register({ email, password })
      .then((res) => {
        if (res.data) {
          setIsRegistered(true);
          setIsInfoToolTipOpen(true);
          history.push("/sign-in");
      } else {
        setIsRegistered(false);
        setIsInfoToolTipOpen(true);
      }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Вход
  const handleLogin = (data) => {
    auth
      .authorize(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          setEmail(data.email);
          history.push("/");
          
      } else {
        setIsRegistered(false);
        setIsInfoToolTipOpen(true);
      }
  })
      .catch((err) => {
        console.log(err);
    });
  };


  

    // Проверить токен
    const handleTokenCheck = useCallback(
      (jwt) => {
        auth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.email);
          history.push("/");
        })
        .catch((err) => console.log(err));
      },
      [history],
    );

  
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      handleTokenCheck(jwt);
    }
  },[handleTokenCheck]);

  
useEffect(() => {
    searchUserApiResult();
},[loggedIn]);


React.useEffect(() => {
  if(loggedIn) {
    api.getInitialCards()
      .then((res => {
          setCards(res);
      }))

      .catch((err) => {
          console.log(err);
      });
  }
}, [loggedIn]);

function handleLogout() {
  localStorage.removeItem('jwt');
  setEmail('');
  setCurrentUser({});
  setCards([]);
  setLoggedIn(false);
}



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
        <Header email={email} onSignOut={handleLogout} />

          <Switch>
            <Route path="/sign-in">
              <Login loggedIn={loggedIn} onAuthorization={handleLogin} />
            </Route>
            <Route path="/sign-up">
              <Register onRegistered={handleRegister} />
            </Route>
            <ProtectedRoute
              exact
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              loggedIn={loggedIn}
              path="/"
            />
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
            <PopupWithForm
              popupId="popup-agreement-to-delete"
              containerClass="popup__container_delete"
              title="Вы уверены?"
              buttonText="Да"
            />
          </Switch>
          <Footer />
          <InfoToolTip
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            isRegistered={isRegistered}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleAvatarUpdate}
            buttonText="Сохранить"
            onCloseClick={handlePopupCloseClick}
          />  

         <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleUpdateUser}
            buttonText="Сохранить"
            onCloseClick={handlePopupCloseClick}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleAddPlaceSubmit}
            buttonText="Сохранить"
            onCloseClick={handlePopupCloseClick}
          />


          <ImagePopup
            isOpen={isSelectedCard}
            onClose={closeAllPopups}
            name="big-picture"
            card={selectedCard}
            onCloseClick={handlePopupCloseClick}
          />

          <PopupWithForm
            onClose={closeAllPopups}
            name="card-delete"
            title="Вы уверены?"
            buttonText="Да"
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
