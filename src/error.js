import { commentPreloadEl, formEl, inputNameEl, inputTextEl} from "./main.js";

// Ошибка 400
export function fourHundredError() {
  alert("Имя или текст короче 3 символов");
  inputNameEl.classList.add("error");
  inputTextEl.classList.add("error");
  formEl.classList.value = "add-form";
  commentPreloadEl.classList.value = "hide";
}

// Ошибка когда что то пошло не так
export function somethingsWrong() {
  alert("Что то пошло не так, попробуйте пожалуйста позже");
  return setTimeout(() => {
    formEl.classList.value = "add-form";
    commentPreloadEl.classList.value = "hide";
  }, 2500);
}
