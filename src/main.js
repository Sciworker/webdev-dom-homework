import { getPromis, sendDataToApi } from "./api.js";
import { clearStorage, localAutorize } from "./autorize-local-storage.js";
import { fourHundredError, somethingsWrong } from "./error.js";
import { formRender } from "./render-form.js";

import { preloaderAutorize, renderAuthorize, scroll } from "./render-login.js";
import { renderComments } from "./render.js";

export const commentsEl = document.getElementById("comments");

export const baseURL = "https://wedev-api.sky.pro/api/v2/sviridevg/comments";
export const userURL = "https://wedev-api.sky.pro/api/user";
export const loginURL = "https://wedev-api.sky.pro/api/user/login";

export const commentPreloadEl = document.getElementById("commentPreload");
export const bodyContainerEl = document.getElementById("bodyContainer");
export const renderFormEl = document.getElementById("renderFormEl");
export const authorizButton = document.getElementById("authorization-button");
export const preloaderAuthorizationEl = document.getElementById(
  "preloader-authorization"
);

// Прелоадер страницы комментариев
commentsEl.textContent = "Пожалуйста подождите комментарии загружаются";

localAutorize();

// Получение данных с сервера v2.0
export const getFetchPromise = () => {
  getPromis().then((responseData) => {
    const commentsForRender = responseData.comments;
    renderComments(commentsForRender, commentsEl);
    renderAuthorize();
  });
};
getFetchPromise();
preloaderAutorize();
formRender();
clearStorage();

export const buttonEl = document.getElementById("add-form-button");
export const inputNameEl = document.getElementById("inputName");
export const inputTextEl = document.getElementById("inputText");
export const formEl = document.getElementById("form");

// Проверка на наличие текста в в форме
function error(a) {
  if (a.value === "") {
    a.classList.add("error");
    buttonEl.classList.add("error");
    return true;
  }
  return false;
}

// Функция добавления нового комментария
buttonEl.addEventListener("click", function (e) {
  inputNameEl.classList.remove("error");
  inputTextEl.classList.remove("error");
  buttonEl.classList.remove("error");
  const nameError = error(inputNameEl);
  const textError = error(inputTextEl);
  if (nameError || textError) {
    return;
  }

  // Прелоадер отправки комментария
  formEl.classList.value = "hide";
  commentPreloadEl.classList.value = "-loading";
  sendData();

  // Отправка данных на серевр v3.0
  function sendData() {
    sendDataToApi()
      .then((response) => {
        const respStat = response.status;
        if (response.status === 201) {
          return response.json();
        } else {
          throw respStat;
        }
      })
      .then((responseData) => {
        return getPromis();
      })
      .then((responseData) => {
        const commentsForRender = responseData.comments;
        renderComments(commentsForRender, commentsEl);
      })
      .then((Data) => {
        // Отображение формы
        formEl.classList.value = "add-form";
        commentPreloadEl.classList.value = "hide";
        // Очистка формы
        document.getElementById("inputText").value = "";
        scroll(formEl);
      })
      .catch((respStat) => {
        if (respStat === 400) {
          return fourHundredError();
        } else if (respStat === 500) {
          setTimeout(() => {
            sendData();
          }, 2500);
        } else {
          somethingsWrong();
        }
      });
  }
});

// Убираем уязвимость
export function goodByeHacker(text) {
  return text
    .replaceAll("<", "&lt")
    .replaceAll(">", "&gt")
    .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
    .replaceAll("QUOTE_END", "</div>");
}
