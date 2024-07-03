import { format } from "date-fns";
// import { getDate } from "./date.js";
import { like } from "./like.js";
import { reply } from "./reply.js";


// Функция рендера
export function renderComments(commentsForRender, commentsEl) {
  const commentsHtml = commentsForRender
    .map((post, index) => {
      // Условия изменения стилие сердечка и открытия окна редактирования
      const isLike = post.isLiked ? "-active-like" : "";
      const isEdit = post.isEdit ? "" : "hide";
      const isAuthor = post.isAuthor ? "" : "hide";

      // Верстка тела комментария
      return `<li class="comment" >
              <div class="comment-header">
                  <div> ${post.author.name} </div>
                  <div>${format(new Date(post.date), 'yyyy-MM-dd hh.mm.ss')}</div>
              </div>
              <div class="comment-body">
                  <div id=${post.id} class="comment-text">
                  ${post.text}
                  </div>
              </div>
              <div class="comment-footer">
                  <div class="likes">
                  <span id = "likes-counter" class="likes-counter">${
                    post.likes
                  }</span>
                  <button id=${index} class="like-button ${isLike}"></button>
                  </div>
                </div>
              </li>`;
    })
    .join("");

  commentsEl.innerHTML = commentsHtml;

  like(commentsForRender, commentsEl);
  reply(commentsForRender);
}
