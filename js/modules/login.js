import { login } from './authAPI.js';


const loginForm = document.querySelector(".login-form");
const loginButton = loginForm.querySelector('.login-form-button');
loginButton.addEventListener("click", handleLogin);

function handleLogin() {
    const formResponse = document.querySelector(".login-form-response");
    formResponse.style.color = '';
    formResponse.innerHTML = 'Аутентификация...';
    loginButton.disabled = true;
    const username = document.querySelector(".login-form-username").value;
    const password = document.querySelector(".login-form-password").value;
    const authData = {"login": username, password};
    login(authData)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch(error => {
            formResponse.style.color = 'red';
            formResponse.innerHTML = `Ошибка: ${error.message}`;
        })
        .finally(() => {
            loginButton.disabled = false;
        });
}
