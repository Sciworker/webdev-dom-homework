import { formatDate } from "./utils.js";

export const API_URL = 'https://wedev-api.sky.pro/api/v1/:Petr/comments';

export async function getComments(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 500) {
                throw new Error('Внутренняя ошибка сервера');
            } else {
                throw new Error('Ошибка сетевого запроса ' + response.status);
            }
        }

        const data = await response.json();
        const comments = data.comments;

        for (let comment of comments) {
            comment.date = formatDate(new Date(comment.date));
        }
        console.log(comments);
        return comments;
    } catch(error) {
        if (error.message === 'Failed to fetch') error.message = 'Проблемы с интернет соединением';
        alert(`${error.message}`);
        console.error('Возникла ошибка при загрузке данных: ', error);
        throw error;
    }
}

export async function postComment(url, newComment) {
    try {
        const newCommentData = {
            "text": newComment.text,
            "name": newComment.author,
            // "forceError": true,
        };
    
        console.log(JSON.stringify(newCommentData))
    
        const options = {
            method: 'POST',
            body: JSON.stringify(newCommentData),
        };
    
        const response = await fetch(url, options);
        if (!response.ok) {
            if (response.status === 400) {
                return response.json().then(error => {throw new Error(error.error)})
            } else if (response.status === 500) {
                throw new Error('Внутренняя ошибка сервера')
            } else {
                throw new Error('Ошибка сетевого запроса ' + response.status);
            }
        }
    } catch(error) {
        if (error.message === 'Failed to fetch') error.message = 'Проблемы с интернет соединением';
        alert(`${error.message}`);
        throw error;
    }
}
