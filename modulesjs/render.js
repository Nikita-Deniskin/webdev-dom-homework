const commentsList = document.getElementById ("list");


import { addLike } from "./index.js";
import { feedbackComment } from "./index.js";

export function renderAllComments (comments) {
    const htmlData = comments
    .map((comment) => {
      return `
      <li class="comment">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="${comment.isLiked === true ? `like-button -active-like` : `like-button`}"></button>
        </div>
      </div>
    </li> `
    })
    .join ("");
    commentsList.innerHTML = htmlData;
    addLike(comments);
    feedbackComment();
  }
