const AUTH_API_URL = 'https://wedev-api.sky.pro/api/user/login';
const AUTH_KEY = 'authUser';

export function setAuthData(userData) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
}

export function getAuthData() {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
}

export function getToken() {
    return getAuthData().user.token;
}

export async function login(auth) {
    try {
        const authData = {
            "login": auth.login,
            "password": auth.password
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(authData),
        };

        const response = await fetch(AUTH_API_URL, options);
        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Неправильный логин или пароль');
            } else if (response.status === 500) {
                throw new Error('Внутренняя ошибка сервера')
            } else {
                throw new Error('Ошибка сетевого запроса ' + response.status);
            }
        }
        const data = await response.json();
        console.log(data);
        setAuthData(data);
        return data;
    } catch(error) {
        if (error.message === 'Failed to fetch') error.message = 'Проблемы с интернет соединением';
        alert(`${error.message}`);
        throw error;
    }
}
