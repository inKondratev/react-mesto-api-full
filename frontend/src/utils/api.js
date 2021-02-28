import {handleOriginalResponse} from './utils';
class Api{
    constructor(options){
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    getInitialCards(token){
        return fetch(`${this._baseUrl}/cards`, {
            headers: {...this._headers, 'Authorization': `Bearer ${token}`,},
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
    dispatchProfileInfo(formData,token){
        return fetch(`${this._baseUrl}/users/me`,{
            method: 'PATCH',
            headers: {...this._headers, 'Authorization': `Bearer ${token}`,},
            body: JSON.stringify(formData)
        })
        .then(handleOriginalResponse)
        .then((res) => res)
    }
    createNewCard(formData, token){
      return fetch(`${this._baseUrl}/cards`,{
          method: 'POST',
          headers: {...this._headers, 'Authorization': `Bearer ${token}`,},
          body: JSON.stringify(formData)
      })
      .then(handleOriginalResponse)
      .then((res) => res)
    }
    deleteCard(cardId, token){
      return fetch(`${this._baseUrl}/cards/${cardId}`,{
        method: 'DELETE',
        headers: {...this._headers, 'Authorization': `Bearer ${token}`,},
    })
      .then(handleOriginalResponse)
      .then((res) => res)
    }

    setLike(cardId, token){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
        method: 'PUT',
        headers: {...this._headers, 'Authorization': `Bearer ${token}`,},
    })
      .then(handleOriginalResponse)
      .then((res) => res)
    }

    removeLike(cardId, token){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
        method: 'DELETE',
        headers: {...this._headers, 'Authorization': `Bearer ${token}`,},
      })
      .then(handleOriginalResponse)
      .then((res) => res)
    }
    updateAvatar(url, token){
      return fetch(`${this._baseUrl}/users/me/avatar`, {
          method:'PATCH',
          headers: {...this._headers, 'Authorization': `Bearer ${token}`,},
          body: JSON.stringify(url)
      })
      .then(handleOriginalResponse)
      .then((res) => res)
  }
}


const  api = new Api({
  baseUrl:"http://api.ikmst.students.nomoredomains.icu", 
      headers: {
          'Content-Type': 'application/json',
      }
});

export default api;