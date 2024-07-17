import { bodyContainerEl } from "./main.js";
import { renderComments } from "./render.js";

// Функция для имитации запросов в API
function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

export function like(commentsForRender, commentsEl) {
  const likeButton = document.querySelectorAll(".like-button");
  likeButton.forEach((element, index) => {
    element.addEventListener("click", function (e) {
      element.classList.add("-loading");
      bodyContainerEl.classList.value = "container progress-cursor";
      delay(2000).then(() => {
        const currentPost = commentsForRender[index];
        let currentComment = currentPost.isLiked;
        let currentCounterLike = currentPost.likes;

        if (currentComment) {
          currentCounterLike = currentCounterLike - 1;
        } else {
          currentCounterLike = currentCounterLike + 1;
        }
        currentComment = !currentComment;

        currentPost.isLiked = currentComment;
        currentPost.likes = currentCounterLike;
        renderComments(commentsForRender, commentsEl);

        // По завершению рендера убираю у Body стиль курсора
        bodyContainerEl.classList.value = "container";
      });
    });
  });
}
