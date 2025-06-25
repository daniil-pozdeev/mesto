import { deleteCard, likeCard, unlikeCard } from './api.js';

export function createCard(cardData, userId, handleCardClick, handleDeleteClick) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  // Проверка владельца карточки
  if (cardData.owner._id !== userId) {
    deleteButton.style.display = 'none';
  }

  // Проверка лайков
  if (cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Обработчики событий
  cardImage.addEventListener('click', () => handleCardClick(cardData));
  likeButton.addEventListener('click', () => handleLike(cardData._id, likeButton, likeCounter));
  deleteButton.addEventListener('click', () => handleDeleteClick(cardData._id, cardElement));

  return cardElement;
}

function handleLike(cardId, likeButton, likeCounter) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  
  (isLiked ? unlikeCard(cardId) : likeCard(cardId))
    .then(updatedCard => {
      likeCounter.textContent = updatedCard.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(err => console.error(err));
}