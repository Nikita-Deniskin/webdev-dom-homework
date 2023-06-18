const inputName = document.getElementById ("input_name");
const inputComment = document.getElementById ("input_comment");
const addButton = document.getElementById ("add_button");
let comments = [];

import { addLike } from "./index.js";
import { feedbackComment } from "./index.js";
import { renderAllComments } from "./render.js";

const needTrueDate = (date) => {
    const newDate = new Date(Date.parse(date));
    const year = newDate.getFullYear().toString().slice(2);
    const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
    const day = ("0" + newDate.getDate()).slice(-2);
    const hours = ("0" + newDate.getHours()).slice(-2);
    const minutes = ("0" + newDate.getMinutes()).slice(-2);
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

export const receivedComments = () => {
    return fetch ("https://wedev-api.sky.pro/api/v1/:den_nik22/comments",{
      method: "GET"
    })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: needTrueDate(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        }
      });
      comments = appComments;
      renderAllComments(comments);
    })
  }

receivedComments(comments);

export const updateComments = () => {
      fetch("https://wedev-api.sky.pro/api/v1/:den_nik22/comments", {
        method: "POST",
        body: JSON.stringify({
          name: inputName.value,
          text: inputComment.value,
          forceError: true
        }),
      })
      .then((response) => {
        if (response.status === 500) {
          throw new Error('Сервер упал');
        }
        if (response.status === 400) {
          throw new Error('Неверный запрос');
        }
        return response.json();
      })
      .then(() => {
        return receivedComments();
      })
      .then(() => {
        addButton.disabled = false;
        addButton.textContent = "Написать";
        inputName.value = '';
        inputComment.value = '';
      })
      .catch((error) => {
        console.warn(error);
        addButton.disabled = false;
        addButton.textContent = "Написать";
        if (error.message === 'Сервер упал') {
          alert('Сервер упал');
        } else if (error.message === 'Неверный запрос') {
          alert('Имя и комментарий должны быть не короче 3-х символов');
        } else {
          alert('Кажется, что-то пошло не так, повторите позже');
        }
      });

      renderAllComments(comments);

    }