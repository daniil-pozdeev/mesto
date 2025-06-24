const config = {
	baseUrl: `${process.env.BASE_URL}${process.env.GROUP_ID}`,
	headers: {
		authorization: process.env.TOKEN,
		'Content-Type': 'application/json'
	}
}


export function fetchUser() {
	return getJSON("/users/me");
}

export function patchUser(name, description) {
	return fetchHandler(
		fetch(`${config.baseUrl}/users/me`, {
			method: 'PATCH',
			headers: config.headers,
			body: JSON.stringify({
				name: name,
				about: description
			})
		})
	)
}

export function fetchCards() {
	return getJSON("/cards");
}

export function postCard(name, link) {
	return fetchHandler(
		fetch(`${config.baseUrl}/cards`, {
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify({
				name: name,
				link: link
			})
		})
	)
}

export function deleteCard(id) {
	return fetchHandler(
		fetch(`${config.baseUrl}/cards/${id}`, {
			method: 'DELETE',
			headers: config.headers
		})
	)
}

export function putLike(cardId) {
	return fetchHandler(
		fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
			method: 'PUT',
			headers: config.headers
		})
	)
}

export function deleteLike(cardId) {
	return fetchHandler(
		fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
			method: 'DELETE',
			headers: config.headers
		})
	)
}

export function patchProfile(link) {
	return fetchHandler(
		fetch(`${config.baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: config.headers,
			body: JSON.stringify({
				avatar: link
			})
		})
	)
}

function getJSON(link) {
	return fetchHandler(
		fetch(`${config.baseUrl}${link}`, {
			headers: {
				authorization: process.env.TOKEN
			}
		})
	)
}

function fetchHandler(fetch) {
	return fetch
		.then((res) => {
  			if (res.ok) {
				return res.json().then((data) => {
					return data;
				});
			}

			return Promise.reject(`Ошибка: ${res.status}`);
		})
		.catch((err) => {
			console.log(err);
		}); 
}
