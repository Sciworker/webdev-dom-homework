import { renderFormEl } from "./main.js";


export function formRender() {
  const formHtml = `
    <div id="form" class="add-form hide">
    <input
      id="inputName"
      type="text"
      class="add-form-name"
      placeholder="Введите ваше имя" readonly/>
    <textarea
      id="inputText"
      type="textarea"
      class="add-form-text"
      placeholder="Введите ваш коментарий"
      rows="4"></textarea>
    <div class="add-form-row">
      <button id="add-form-button" class="add-form-button">Написать</button>
    </div>
  </div>
    `;
  renderFormEl.innerHTML = formHtml;

}

