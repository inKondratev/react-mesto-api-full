import {handleOriginalResponse} from './utils';
class Api{
    constructor(options){
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    getInitialCards(){
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(handleOriginalResponse)
        .then((res) => res)
    }
    getProfileInfo(){
        return fetch(`${this._baseUrl}/users/me`,{
            headers: this._headers
        })
        .then(handleOriginalResponse)
        .then((res) => res)
    }
    dispatchProfileInfo(formData){
        return fetch(`${this._baseUrl}/users/me`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(formData)
        })
        .then(handleOriginalResponse)
        .then((res) => res)
    }
    createNewCard(formData){
      return fetch(`${this._baseUrl}/cards`,{
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify(formData)
      })
      .then(handleOriginalResponse)
      .then((res) => res)
    }
    deleteCard(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}`,{
        method: 'DELETE',
        headers: this._headers,
    })
      .then(handleOriginalResponse)
      .then((res) => res)
    }

    setLike(cardId){
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`,{
        method: 'PUT',
        headers: this._headers,
    })
      .then(handleOriginalResponse)
      .then((res) => res)
    }

    removeLike(cardId){
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`,{
        method: 'DELETE',
        headers: this._headers,
      })
      .then(handleOriginalResponse)
      .then((res) => res)
    }
    updateAvatar(url){
      return fetch(`${this._baseUrl}/users/me/avatar`, {
          method:'PATCH',
          headers: this._headers,
          body: JSON.stringify(url)
      })
      .then(handleOriginalResponse)
      .then((res) => res)
  }
}


const  api = new Api({
  baseUrl:'https://mesto.nomoreparties.co/v1/cohort-17', 
      headers: {
          authorization: '4e6363ac-1195-46c5-9360-6be88656e9c8',
          'Content-Type': 'application/json'
      }
});

export default api;