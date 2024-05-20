import { API_URL, getComments, postComment } from "./API.js";
import { renderComments } from "./UI.js";
import { formatDate } from "./utils.js";

export let commentsArray = null;
const form = document.querySelector(".add-form");
const addCommentButton = form.querySelector('.add-form-button');
const commentsContainer = document.querySelector(".comments");

addCommentButton.addEventListener("click", addComment);

getComments(API_URL)
    .then(comments => {
        renderComments(comments);
        commentsArray = comments;
        addCommentButton.disabled = false;
    })
    .catch(err => {
        console.error(err);
        commentsContainer.innerHTML = 'Упс, возникла ошибка при загрузке данных!';
    });

function addComment() {
    const formResponse = document.querySelector(".add-form-response");
    formResponse.style.color = '';
    formResponse.innerHTML = 'Отправление комментария...';
    addCommentButton.disabled = true;
    const author = form.querySelector(".add-form-name").value;
    const text = form.querySelector(".add-form-text").value;
    const date = formatDate(new Date());
    const comment = {author, text, date};

    postComment(API_URL, comment)
        .then(() => getComments(API_URL))
        .then(comments => {
            renderComments(comments);
            commentsArray = comments;
        })
        .then(() => {
            form.querySelector(".add-form-name").value = '';
            form.querySelector(".add-form-text").value = '';
            formResponse.style.color = 'green';
            formResponse.innerHTML = `Комментарий успешно отправлен`;
        })
        .catch(error => {
            formResponse.style.color = 'red';
            formResponse.innerHTML = `Произошла ошибка: ${error.message}`;
            console.error('Произошла ошибка с запросом:', error);
        })
        .finally(() => {
            addCommentButton.disabled = false;
        });
}
