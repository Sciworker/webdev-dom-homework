import {
  baseURL,
  goodByeHacker,
  loginURL,
  inputTextEl,
  inputNameEl,
  userURL,
} from "./main.js";

// Получение данных с комментариями с сервера
export function getPromis() {
  return fetch(baseURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
}

// Отправка данных с новым комментарием на сервер
export function sendDataToApi() {
  return fetch(baseURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text: goodByeHacker(inputTextEl.value),
    }),
  });
}

// Получаем имя авторизованнго пользователя для вставки в форму
export const setName = (newName) => {
  inputNameEl.value = newName;
};

// Получение токена авторизации
export let token;
export const setToken = (newToken) => {
  token = newToken;
};

// отправка данных авторизации на сервер
export function getAutorize({ login, password }) {
  return fetch(loginURL, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  });
}

// отправка данных авторизации на сервер
export function getRegistration({ login, name, password }) {
  return fetch(userURL, {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    }),
  });
}
