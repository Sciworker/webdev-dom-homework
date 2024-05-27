import { getComments, postComment } from "./commentsAPI.js";
import { renderComments, renderAuthLink, showAddCommentForm } from "./UI.js";
import { formatDate } from "./utils.js";
import { getAuthData, login } from "./authAPI.js";

export let commentsArray = null;
const form = document.querySelector(".add-form");
const addCommentButton = form.querySelector('.add-form-button');
const commentsContainer = document.querySelector(".comments");

addCommentButton.addEventListener("click", addComment);


getComments()
    .then(comments => {
        renderComments(comments);
        commentsArray = comments;
        addCommentButton.disabled = false;
    })
    .then(() => {
        const authData = getAuthData();
        if (authData) {
            showAddCommentForm();
        } else renderAuthLink();
    })
    .catch(err => {
        console.error(err);
        commentsContainer.innerHTML = 'Упс, возникла ошибка при загрузке данных!';
    });

function addComment(e) {
    const form = e.target.closest(".add-form");
    const formResponse = form.querySelector(".add-form-response");
    formResponse.style.color = '';
    formResponse.innerHTML = 'Отправление комментария...';
    addCommentButton.disabled = true;
    const author = form.querySelector(".add-form-name").value;
    const text = form.querySelector(".add-form-text").value;
    const date = formatDate(new Date());
    const comment = {author, text, date};

    postComment(comment)
        .then(() => getComments())
        .then(comments => {
            renderComments(comments);
            commentsArray = comments;
        })
        .then(() => {
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

export function handleLogin(e) {
    const loginButton = e.target;
    const authorizationForm = loginButton.closest(".login-form");
    const formResponse = authorizationForm.querySelector(".login-form-response");
    formResponse.style.color = '';
    formResponse.innerHTML = 'Аутентификация...';
    loginButton.disabled = true;
    const username = document.querySelector(".login-form-username").value;
    const password = document.querySelector(".login-form-password").value;
    const authData = {"login": username, password};
    login(authData)
        .then(() => {
            renderComments(commentsArray);
            showAddCommentForm();
        })
        .catch(error => {
            formResponse.style.color = 'red';
            formResponse.innerHTML = `Ошибка: ${error.message}`;
        })
        .finally(() => {
            loginButton.disabled = false;
        });
}

