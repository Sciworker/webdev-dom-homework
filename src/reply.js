import { inputTextEl } from "./main.js";

export function reply(commentsForRender) {
  const replyText = document.querySelectorAll(".comment-text");
  replyText.forEach((element, index) => {
    element.addEventListener("click", function (e) {
      const currentPostText = commentsForRender[index];

      // Если dTransfer >= 0 значит есть перенос строки с последнего элемента \n (Репост репоста)
      const idTransfer = currentPostText.text.lastIndexOf("\n");
      let currentCommentText;
      if (idTransfer >= 0) {
        const lastComment = currentPostText.text.slice(idTransfer);
        currentCommentText = lastComment;
      } else {
        currentCommentText = currentPostText.text;
      }

      let currentCommentAuthor = currentPostText.author.name;
      inputTextEl.value = `QUOTE_BEGIN > "${currentCommentAuthor}" \n ${currentCommentText} QUOTE_END \n `;
    });
  });
}
