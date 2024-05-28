import { commentsArray } from "./main.js";
import { escapeHTML } from "./utils.js";
import { getAuthData } from "./authAPI.js";
import { handleLogin } from "./main.js"

const container = document.querySelector(".container");
const commentsContainer = document.querySelector(".comments");
const form = document.querySelector(".add-form");

export function renderComments(comments) {
    commentsContainer.innerHTML = '';
    for (const comment of comments) {
        commentsContainer.append(createCommentElement(comment));
    }
}

function likeComment(event) {
    if (getAuthData()) {
        const targetCommentElement = event.target.closest(".comment");
        const comment = commentsArray[Array.from(commentsContainer.children).indexOf(targetCommentElement)];
        toggleLike(comment);
        renderComments(commentsArray);
    } else {
        alert('Авторизуйтесь, чтобы лайкнуть комментарий')
    }
}

function toggleLike(comment) {
    comment.liked = !comment.liked;
    if (comment.liked) {
        comment.likes++;
    } else {
        comment.likes--;
    }
}

function createCommentElement({author, text, date, likes = 0, liked = false} = {}) {
    const commentElement = document.createElement('li');
    commentElement.classList.add('comment');
    commentElement.addEventListener("click",  function() {
        if (!event.target.classList.contains("like-button")) {
            form.querySelector(".add-form-text").value = text;
        }
    })
    commentElement.innerHTML = `
        <div class="comment-header">
            <div>${escapeHTML(author.name)}</div>
            <div>${date}</div>
        </div>
        <div class="comment-body">
            <div class="comment-text">${escapeHTML(text)}
            </div>
        </div>
        <div class="comment-footer">
            <div class="likes">
            <span class="likes-counter">${likes}</span>
            <button class="like-button${liked ? ' -active-like' : ''}"></button>
            </div>
        </div>
    `;
    commentElement.querySelector(".like-button").addEventListener("click", likeComment);

    return commentElement;
}

export function renderAuthLink() {
    const authLink = document.createElement('a');
    authLink.classList.add('auth-link');
    authLink.textContent = 'Чтобы добавить комментарий, авторизуйтесь';
    authLink.onclick = () => {
        renderAuthorizationForm();
    }
    container.append(authLink);
}

export function renderAuthorizationForm() {
    document.querySelector(".auth-link")?.remove();

    commentsContainer.innerHTML = `
        <div class="login-form">
            <input
                type="text"
                class="login-form-username"
                placeholder="Логин"
                required
            />
            <input
                type="password"
                class="login-form-password"
                placeholder="Пароль"
                required
            />
            <div class="login-form-response"></div>
            <div class="login-form-row">
                <button class="login-form-button">Войти</button>
            </div>
        </div>
    `;
    commentsContainer.querySelector(".login-form-button").addEventListener("click", handleLogin);
}

export function showAddCommentForm() {
    form.style.display = 'flex';
    const authData = getAuthData();
    form.querySelector(".add-form-name").value = authData.user.name;
    form.querySelector(".add-form-name").readOnly = true;
}

