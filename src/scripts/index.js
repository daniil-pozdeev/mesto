import { 
  getUserInfo, 
  getInitialCards, 
  updateProfile, 
  addNewCard, 
  deleteCard,
  likeCard,
  unlikeCard,
  updateAvatar
} from './api.js';
import { createCard } from './card.js';
import { openModal, closeModal } from './modal.js';

// DOM элементы
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');
const placesList = document.querySelector('.places__list');

// Попапы
const editPopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_add-card');
const avatarPopup = document.querySelector('.popup_type_avatar');
const imagePopup = document.querySelector('.popup_type_image');
const confirmPopup = document.querySelector('.popup_type_confirm');

// Формы
const editForm = editPopup.querySelector('.popup__form');
const addCardForm = addCardPopup.querySelector('.popup__form');
const avatarForm = avatarPopup.querySelector('.popup__form');

// Кнопки
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__edit-avatar-button');

let userId;

// Инициализация
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    renderProfile(userData);
    renderCards(cards);
  })
  .catch(err => console.error(err));

// Обработчики событий
editButton.addEventListener('click', () => {
  fillProfileForm();
  openModal(editPopup);
});

addCardButton.addEventListener('click', () => {
  openModal(addCardPopup);
});

editAvatarButton.addEventListener('click', () => {
  openModal(avatarPopup);
});

editForm.addEventListener('submit', handleProfileSubmit);
addCardForm.addEventListener('submit', handleAddCardSubmit);
avatarForm.addEventListener('submit', handleAvatarSubmit);

// Функции рендеринга
function renderProfile(userData) {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileAvatar.src = userData.avatar;
}

function renderCards(cards) {
  cards.forEach(card => {
    placesList.append(createCard(card, userId, openImagePopup, handleDeleteCard));
  });
}

// Обработчики форм
function handleProfileSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;
  
  submitButton.textContent = 'Сохранение...';
  
  updateProfile(
    editForm.elements.name.value,
    editForm.elements.about.value
  )
    .then(userData => {
      renderProfile(userData);
      closeModal(editPopup);
    })
    .catch(err => console.error(err))
    .finally(() => {
      submitButton.textContent = originalText;
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;
  
  submitButton.textContent = 'Создание...';
  
  addNewCard(
    addCardForm.elements.place.value,
    addCardForm.elements.link.value
  )
    .then(newCard => {
      placesList.prepend(createCard(newCard, userId, openImagePopup, handleDeleteCard));
      addCardForm.reset();
      closeModal(addCardPopup);
    })
    .catch(err => console.error(err))
    .finally(() => {
      submitButton.textContent = originalText;
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;
  
  submitButton.textContent = 'Сохранение...';
  
  updateAvatar(avatarForm.elements.avatar.value)
    .then(userData => {
      profileAvatar.src = userData.avatar;
      avatarForm.reset();
      closeModal(avatarPopup);
    })
    .catch(err => console.error(err))
    .finally(() => {
      submitButton.textContent = originalText;
    });
}

function handleDeleteCard(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      closeModal(confirmPopup);
    })
    .catch(err => console.error(err));
}

function openImagePopup(cardData) {
  const image = imagePopup.querySelector('.popup__image');
  const caption = imagePopup.querySelector('.popup__caption');
  
  image.src = cardData.link;
  image.alt = cardData.name;
  caption.textContent = cardData.name;
  
  openModal(imagePopup);
}

function fillProfileForm() {
  editForm.elements.name.value = profileTitle.textContent;
  editForm.elements.about.value = profileDescription.textContent;
}