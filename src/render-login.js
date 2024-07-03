import {
  getAutorize,
  getRegistration,
  setName,
  setToken,
  token,
} from "./api.js";

import {
  commentsEl,
  formEl,
  getFetchPromise,
  preloaderAuthorizationEl,
} from "./main.js";

// Прелоадер авторизации
export function preloaderAutorize() {
  const preloaderAutorizeHtm = `
  <p>
  Для того чтобы оставить комментарий пройдите
  <button class="link-button" id="authorization-button">
    aвторизацию
  </button>
</p>
  `;
  preloaderAuthorizationEl.innerHTML = preloaderAutorizeHtm;
}

// Рендер окна авторизации
export function renderAuthorize() {
  const loginButton = document.getElementById("authorization-button");
  loginButton.addEventListener("click", function (e) {
    const authorizeFormHtml = `

    <div id="authorizeForm" class="add-form-authorization">
    <p class="comment-text">Авторизация</p>
    <input
      id="Login"
      type="text"
      class="add-form-name"
      placeholder="Введите логин" />
    <input
      id="pass"
      type="text"
      class="add-form-name"
      placeholder="Введите пароль" />
    <div class="add-form-row-authorization">
      <button id="entry" class="add-form-button">Вход</button>
      <button id="registration-button" class="add-form-button-authorization">
        Регистрация
      </button>
    </div>
    <button id="back" class="link-button"> Вернуться на главную </button>
  </div>
    `;
    commentsEl.innerHTML = authorizeFormHtml;
    preloaderAuthorizationEl.classList.value = "hide";

    goHome();

    const entryButton = document.getElementById("entry");
    const loginInputEl = document.getElementById("Login");
    const passwordInputEl = document.getElementById("pass");
    const AutorizeEl = document.getElementById("authorizeForm");
    scroll(AutorizeEl);
    renderRegistration();

    // Обработка кнопки авторизации
    entryButton.addEventListener("click", function (e) {
      getAutorize({
        login: loginInputEl.value,
        password: passwordInputEl.value,
      })
        .then((response) => {
          const respStatus = response.status;
          if (respStatus === 201) {
            return response.json();
          } else {
            throw respStatus;
          }
        })
        .then((responseData) => {
          setToken(responseData.user.token);
          console.log(responseData.user.token);
          setName(responseData.user.name);
          const user = {
            login: responseData.user.login,
            pass: responseData.user.password,
          };
          setAutorizeData("persone", JSON.stringify(user));
          getFetchPromise();
          setTimeout(() => {
            formEl.classList.value = "add-form";
            scroll(formEl);
          }, 500);
        })
        .catch((respStat) => {
          if (respStat === 400) {
            return alert("Неправильный логин или пароль");
          }
        });
    });
  });
}

// Рендер окна регистрации
export function renderRegistration() {
  const registrationButton = document.getElementById("registration-button");
  registrationButton.addEventListener("click", function (e) {
    const registrationFormHtml = `
    <div id="" class="add-form-authorization">
    <p class="comment-text">Регистрация</p>
    <input
      id="new-user-name"
      type="text"
      class="add-form-name"
      placeholder="Введите Имя" />
    <input
      id="new-user-login"
      type="text"
      class="add-form-name"
      placeholder="Введите Логин" />
    <input
      id="new-user-pass"
      type="text"
      class="add-form-name"
      placeholder="Введите пароль" />
    <div class="add-form-row-authorization">
      <button id="registration" class="add-form-button-authorization">
        Регистрация
      </button>
      <button id="authorization-button" class="add-form-button">Вход</button>
    </div>
    <button id="back" class="link-button"> Вернуться на главную </button>
  </div>
    `;

    commentsEl.innerHTML = registrationFormHtml;

    goHome();
    renderAuthorize();

    const registrationButtonEl = document.getElementById("registration");
    const registrationLoginEl = document.getElementById("new-user-login");
    const registrationNameEl = document.getElementById("new-user-name");
    const registrationBPassEl = document.getElementById("new-user-pass");

    registrationButtonEl.addEventListener("click", function (e) {
      getRegistration({
        login: registrationLoginEl.value,
        name: registrationNameEl.value,
        password: registrationBPassEl.value,
      })
        .then((response) => {
          const respStatus = response.status;
          console.log(respStatus);
          if (respStatus === 201) {
            return response.json();
          } else {
            throw respStatus;
          }
        })
        .then((responseData) => {
          registrationOk();
        })
        .catch((respStat) => {
          if (respStat === 400) {
            return alert(
              "Что-то пошо не так, возможно пользователь с таким логином уже существует или проверьте правильность заполнения форм"
            );
          }
        });
    });
  });
}

// Регистрация прошла успешно
export function registrationOk() {
  const registrationOktml = `
    
    <div id="" class="add-form-authorization">
      <p class="comment-text">Благодарим Вас</p>
      <H3>Регистрация прошла успешно!</H3>
      <p>
        перейдите на страницу<button class="link-button" id="authorization-button">
        aвторизации
      </button>
      </p>
    </div>
    `;

  commentsEl.innerHTML = registrationOktml;
  renderAuthorize();
}

// Функция возвращения на главную страницу
export function goHome() {
  const backButton = document.getElementById("back");
  backButton.addEventListener("click", function (e) {
    getFetchPromise();
    preloaderAutorize();
    setTimeout(() => {
      preloaderAuthorizationEl.classList.value = "";
    }, 1000);
  });
}

// Прокрутка документа после добавления комментария
export function scroll(ell) {
  ell.scrollIntoView({ block: "center", behavior: "smooth" });
}

//Получаем логин и пароль пользователя и помещаем в
const setAutorizeData = (key, data) => {
  localStorage.setItem(key, data);
};
