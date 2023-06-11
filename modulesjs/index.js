const commentsList = document.getElementById ("list");
const inputName = document.getElementById ("input_name");
const inputComment = document.getElementById ("input_comment");
const addButton = document.getElementById ("add_button");
let comments = [];

import { receivedComments, updateComments } from "./API.js";

export function addLike () {
    const likeButton = document.querySelectorAll(".like-button");
    for (let i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener ("click", (event) => {
      event.stopPropagation();
      if (comments[i].isLiked === true){
        comments[i].isLiked = false;
        comments[i].likes --;
      }
      else if (comments[i].isLiked === false){
        comments[i].isLiked = true;
        comments[i].likes ++;
      }
      renderAllComments();
    })  
    }
  };
  
 export function feedbackComment () {
    const feedbackButtons = document.querySelectorAll(".comment");
    for (const feedbackButton of feedbackButtons) {
      feedbackButton.addEventListener ("click", () => {
        const feedbackName = feedbackButton.querySelector(".comment-header div:first-child").textContent;
        const feedbackText = feedbackButton.querySelector(".comment-text").textContent;
        inputComment.value = `>${feedbackText.trim()}\n${feedbackName}, `;
        inputComment.focus();
      })
    }
  };

  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = 'Пожалуйста, подождите, комментарии загружаются...';
  commentsList.append(messageElement);
  
  addButton.addEventListener ("click", () => {    
    inputName.classList.remove("error");
    inputComment.classList.remove("error");
   if (inputName.value === "" ||  inputComment.value === "") {
     if (inputName.value === "") {
       inputName.classList.add("error");
     }
     if ( inputComment.value === "") {
       inputComment.classList.add("error");
     }
     return;
 }

 addButton.disabled = true;
 addButton.textContent = "Комментарий добавляется...";

 updateComments();
 receivedComments();
})
