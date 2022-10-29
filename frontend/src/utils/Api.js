import BASE_URL from "./constants";

class Api {
  constructor(url) {
    this._url = url;
    this._headers = {
      authorization: '34063916-fb53-4e1b-84c7-1baa3625af58',
      'Content-Type': 'application/json'
    }
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.message}`)
  }

   // отрисовка карточек с сервера
   getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
    .then(this._checkResponse);

  }


    // получаем информацию о пользователе
    getUserInfo() {
      return fetch(`${this._url}/users/me`, {
        method: "GET",
        headers: this._headers,
      })
      .then(this._checkResponse)
    }




  // Редактирование профиля
  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
    method: "PATCH",
    headers : this._headers,
    body: JSON.stringify({
      name: data.profile_name,
      about: data.profile_job
    })
    })
    .then(this._checkResponse)
  }



  // Обновление аватара пользователя
  handleUserAvatar(userAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userAvatar.avatar
      })
    
    })
    .then(this._checkResponse)
  }



  // Добавление новой карточки
  createCardApi(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResponse)
  }


  // Отображение количества лайков карточки
  toggleLike(id, isLiked) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    })
    .then(this._checkResponse);
  }



    //Удаление карточки
    deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._checkResponse)
    }
}


const api = new Api(BASE_URL);

export default api;