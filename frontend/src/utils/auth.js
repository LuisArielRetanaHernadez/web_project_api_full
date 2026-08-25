import { URL_BASE } from '../contast/contast.js'

export const register = async (password, email) => {
  const response = await fetch(`${URL_BASE}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password,
      email
    })
  })

  const result = await response.json()
  return result
}

export const login = async (password, email) => {
  const response = await fetch(`${URL_BASE}signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password,
      email
    })
  })

  const result = await response.json()
  return result
}

export const getUserInfo = async (token) => {
  const response = await fetch(`${URL_BASE}users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })

  const result = await response.json()
  return result

}