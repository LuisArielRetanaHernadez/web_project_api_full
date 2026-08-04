// constat
import {
  URL_BASE,
  GroupId
} from '../contast/contast';
import { getToken } from './token';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  setAuthToken(token) {
    if (token) {
      this._headers.authorization = token
    } else {
      delete this._headers.authorization
    }
  }

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    });
    if (res.ok) {
      const resJsns = await res.json();
      console.log(resJsns)
      return resJsns
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async createCard(name, link) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async deleteCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });

    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  // likes card

  async likeCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    });

    if (res.ok) {
      return res.json();
    }

    return await Promise.reject(`Error: ${res.status}`);
  }

  async likeCardDelete(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });

    if (res.ok) {
      return res.json();
    }

    return await Promise.reject(`Error: ${res.status}`);
  }

  async changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.likeCard(cardId);
    } else {
      return this.likeCardDelete(cardId);
    }
  }

  // users

  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async getUserAvatar(avatar) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async updateUserInfo(name, about) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async updateAvatarUser(avatar) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: `${URL_BASE}/}`,
  headers: {
    authorization: getToken() || '',
    "Content-Type": "application/json"
  }
});

export default api
