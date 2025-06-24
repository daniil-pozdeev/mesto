import { deleteCard, putLike, deleteLike } from './api.js'


export function createCard(template, card, userId, onClickCallback) {
	const cardElement = template.querySelector('.card').cloneNode(true);

	const cardTitleElement = cardElement.querySelector('.card__title');
	const cardImageElement = cardElement.querySelector('.card__image');
	const cardLikeButtonElement = cardElement.querySelector('.card__like-button');
	const cardLikeCounterElement = cardElement.querySelector('.card__like-counter');
	const cardDeleteButtonElement = cardElement.querySelector('.card__delete-button');

	cardTitleElement.textContent = card.name;
	cardImageElement.src = card.link;
	cardImageElement.alt = card.name;
	cardImageElement.addEventListener('click', onClickCallback)

	if (card.likes.map(el => el['_id']).includes(userId)) {
		cardLikeButtonElement.classList.add('card__like-button_is-active');
	}

	cardLikeButtonElement.addEventListener('click', function () {
		if (cardLikeButtonElement.classList.contains('card__like-button_is-active')) {
			deleteLike(card._id)
				.then((res) => {
					cardLikeCounterElement.textContent = res.likes.length;
					cardLikeButtonElement.classList.remove('card__like-button_is-active');
				})
		} else {
			putLike(card._id)
				.then((res) => {
					cardLikeCounterElement.textContent = res.likes.length;
					cardLikeButtonElement.classList.add('card__like-button_is-active');
				})
		}
		
	});

	cardLikeCounterElement.textContent = card.likes.length;

	cardDeleteButtonElement.addEventListener('click', function (e) {
		const target = e.target;
		const cardElement = target.closest('.card');

		deleteCard(card._id);
		cardElement.remove();
	});

	if (card.owner._id !== userId) {
		cardDeleteButtonElement.style.display = "none" // ID don't equate for some reason
	}

	return cardElement;
}
