export function openModal(popup) {
	popup.classList.add('popup_is-opened');
	popup.addEventListener('click', (evt) => {
		if (evt.target === popup) {
			closeModal(popup);
		}
	});

	document.addEventListener('keydown', closeByEsc);
}

export function closeModal(popup) {
	popup.classList.remove('popup_is-opened');

	document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
	if (evt.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_is-opened');
		closeModal(openedPopup);
	}
}
