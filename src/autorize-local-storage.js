import { getAutorize, setName, token } from "./api.js";
import { formEl, getFetchPromise, preloaderAuthorizationEl } from "./main.js";

import { scroll } from "./render-login.js";

export function localAutorize() {
  if (localStorage.length === 0) {
    return;
  } else {
    const raw = localStorage.getItem("persone");
    const user = JSON.parse(raw);
    getAutorize({
      login: user.login,
      password: user.pass,
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
        setName(responseData.user.name);
        getFetchPromise();
        preloaderAuthorizationEl.classList.value = "hide";
        formEl.classList.value = "add-form";
        setTimeout(() => {
          scroll(formEl);
        }, 500);
      });
  }
}

// Очистка localStorage через 1 минуту
export function clearStorage() {
  setInterval(() => {
    localStorage.clear();
  }, 60000);
}
