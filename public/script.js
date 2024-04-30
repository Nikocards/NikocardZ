/*	NikoCardZ - Page web pour voir nos cartes collectionnées
**
**	Avril 2024
**
**
**
*/

const clientId = 'kimne78kx3ncx6brgo4mv6wki5h1ko'; // s'te plait me kack pô :(
let collectionsData = {}
let collector = "nikoballz"
const totalCards = 16 * 3; // Nombre total de cartes dans la collection

async function fetchUserCards() {
	const cardContainer = document.getElementById('card-container');
	cardContainer.innerHTML = `
		<h2>Un messager arrive avec la collection que vous souhaitez consulter</h2>
		<img width="112" height="112" alt"Chat qui danse" src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_9d758856a6544239a47fdf3bcd8f4313/animated/light/4.0"></img>
		<div id="mainLoad" class="progress"><div style="width: 0%"></div></div>`;

	try {
		const prog = document.querySelector('#mainLoad>div');
		const response = await fetch('https://raw.githubusercontent.com/Nikocards/NikocardZ/main/public/users_cards.json');
		const responseData = await response.json();
		delete responseData.undefined;
		console.log('User Cards API Response:', response.status, responseData);
		const totalUsers = Object.keys(responseData).length;
		let count = 0;

		try {
			let newUsers = [];
			for(user in responseData) {
				prog.style.width = `${100*count/totalUsers}%`;
				count ++;

				if(user == "undefined") continue;
				if(!responseData[user].carte || !responseData[user].nb || responseData[user].carte.length != responseData[user].nb.length) {
					console.warn(`Utilisateur ignoré: ${user} (Données invalides)`);
					console.log(responseData[user]);
					continue;
				}
				if(!collectionsData[user]) {
					collectionsData[user] = {pseudo: user}
					newUsers.push(user);
					if(newUsers.length > 34) {
						await fetchTwitchDataMultiple(newUsers);
						//~ fetchTwitchDataMultiple(newUsers);
						newUsers = []
					}
				}
				collectionsData[user].cards = {}
				for(i in responseData[user].carte) {
					const card = Card2Id(responseData[user].carte[i]);
					if(card == 1000) continue;
					collectionsData[user].cards[card] = responseData[user].nb[i];
					if(card%3) collectionsData[user].cards[card+1] = Math.floor(responseData[user].nb[i]/5);
				}
			}
			if(newUsers.length) {
				await fetchTwitchDataMultiple(newUsers);
				//~ fetchTwitchDataMultiple(newUsers);
			}
		} catch(e) {console.error(e)}
	} catch (error) {
		console.error('Error fetching user cards data:', error);
	}
	requestAnimationFrame(() => {displayAlbumCards(collector)})

	async function fetchTwitchDataMultiple(users) {
		const query = JSON.stringify(users.map(username => {
			return {
				query: `
					query GetUser($login: String!) {
						user(login: $login) {
							profileImageURL(width: 28)
							displayName
						}
					}`,
				variables: { login: username }
			};
		}));
		try {
			const response = await fetch('https://gql.twitch.tv/gql', {
				method: 'POST',
				headers: {
					"Accept-Language": "en-US",
					Accept: "*/*",
					Authorization: void 0,
					'Content-Type': 'application/json',
					'Client-Id': clientId
				},
				body: query
			});
			const responseData = await response.json();
			console.log('Twitch API Response:', response.status, responseData);
			if(response.status == 200 && responseData.length) {
				responseData.forEach(rep => {
					if(rep.data.user) {
						const user = rep.data.user.displayName.toLowerCase()
						if(!collectionsData[user]) collectionsData[user] = {cards: {}};
						collectionsData[user].pseudo = rep.data.user.displayName;
						collectionsData[user].avatar = rep.data.user.profileImageURL;
					}
				});
			}
		} catch (error) {
			console.error('Error fetching data from Twitch API:', error);
		}
	}

	function Card2Id(card) {
		if(card == 1000) return 1000
		return ((card - 1) % 16) * 3 + (card > 16 ? 3 : 1)
	}
}

function displayAlbumCards(collector) {
	const cardContainer = document.getElementById('card-container');
	cardContainer.innerHTML = ''; // Effacer le contenu précédent du conteneur

	const collection = collectionsData.hasOwnProperty(collector) ? collectionsData[collector] : {pseudo: collector, cards: {}};

	console.log(collection);

	displayAlbum(collection)

	function displayStats() {

	}

	function displayAlbum(collection) {
		const pages = [
			[1, 2, 3, 4, 5, 6, 13,14,15],
			[7, 10,16, 8,11,17, 9,12,18],
			[19,20,21,22,23,24,25,26,27],
			[28,29,30,31,32,33,34,35,36],
			[37,38,39,40,41,42,43,44,45],
			[46,47,48]
		];

		const totalPages = pages.length;

		const pageContainer = document.createElement('div');
		pageContainer.classList.add('album-page-container');

		for (let page = 1; page <= totalPages; page++) {
			const pageElement = document.createElement('div');
			const pageGrid = document.createElement('div');
			const pageHead = document.createElement('p');
			const pageFooter = document.createElement('p');

			pageElement.classList.add('album-page');
			if(page == 1) {
				pageElement.classList.add('visible');
			}
			pageElement.id = "page-" + page;
			pageGrid.classList.add('album-page-grid');

			pageHead.classList.add('album-page-head');
			pageHead.innerText = collection.pseudo

			pageFooter.classList.add('album-page-footer');
			pageFooter.innerText = `${page} / ${totalPages}`

			const cardsOnPage = pages[page - 1] || []; // Récupérer les cartes pour la page actuelle

			cardsOnPage.forEach(cardNumber => {
				const cardElement = document.createElement('div');
				const cardImgContainer = document.createElement('div');
				const cardImage = document.createElement('img');

				cardElement.classList.add('card');
				cardElement.id = "card-" + cardNumber;
				if(cardNumber%3 == 2) {
					cardElement.classList.add('holo');
				} else if(cardNumber % 3 == 0) {
					cardElement.classList.add('shiny');
				}
				if(collection.cards[cardNumber] || true) {///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					cardImage.src = `public/cards/${getVisible(cardNumber)}`;
					cardElement.classList.add('unlocked');
					cardElement.addEventListener('click', toogleFullscreen);
				} else {
					cardImage.src = `public/cards/${getLocked(cardNumber)}`;
					cardElement.classList.add('locked');
				}
				cardImage.alt = `Carte ${cardNumber}`;
				cardImage.width = 290;
				cardImage.height = 400;

				cardElement.appendChild(cardImgContainer);
				cardImgContainer.appendChild(cardImage);
				pageGrid.appendChild(cardElement);
			});

			pageElement.appendChild(pageHead);
			pageElement.appendChild(pageGrid);
			pageElement.appendChild(pageFooter);

			pageContainer.appendChild(pageElement);
		}

		// Ajouter des boutons de navigation
		const prevButton = document.createElement('button');
		prevButton.textContent = 'Page précédente';
		prevButton.addEventListener('click', () => navigatePage(-1));

		const nextButton = document.createElement('button');
		nextButton.textContent = 'Page suivante';
		nextButton.addEventListener('click', () => navigatePage(1));

		const buttonContainer = document.createElement('div');
		buttonContainer.classList.add('album-button-container');

		buttonContainer.appendChild(prevButton);
		buttonContainer.appendChild(nextButton);

		cardContainer.appendChild(pageContainer);
		cardContainer.appendChild(buttonContainer);

		// Vérifier si l'écran permet d'afficher les pages deux par deux
		const pageWidth = document.querySelector('.album-page').clientWidth;
		const screenWidth = document.body.clientWidth;
		const displayTwoPages = pageWidth * 2 <= screenWidth;// Fonction pour naviguer entre les pages

		function navigatePage(direction) {
			const visiblePage = document.querySelector('.album-page.visible');
			const currentPageNumber = parseInt(visiblePage.id.split('-')[1]);

			let nextPageNumber;
			if (displayTwoPages) {
				nextPageNumber = currentPageNumber + direction * 2; // Naviguer deux pages à la fois si displayTwoPages est vrai
			} else {
				nextPageNumber = currentPageNumber + direction;
			}

			const nextPage = document.getElementById(`page-${nextPageNumber}`);
			if (nextPage) {
				visiblePage.classList.remove('visible');
				nextPage.classList.add('visible');
				if(displayTwoPages) {
					visiblePage.classList.remove('next-visible');
					nextPage.classList.add('next-visible');
				}
			}
		}

		if(displayTwoPages) {
			// Afficher la première page par défaut
			const firstPage = document.getElementById('page-1');
			if (firstPage) {
				firstPage.classList.add('next-visible');
			}
		}
	}

	function getVisible(id) {
		return `${Math.floor((id+2)/3)}${id%3==0?"s":""}.png`
	}

	function getLocked(id) {
		if(id < 31) return `cache${1+(id-1)%3}.png`
		if(id < 46) return `cache${4+(id-1)%3}.png`
		return `cache${7+(id-1)%3}.png`
	}

	function toogleFullscreen(e) {
		if(document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			let target = e.target;
			while(target && !target.classList.contains("unlocked")) target = target.parentNode;
			if(target) target.requestFullscreen();
		}
	}
}

function initInput() {
	const input = document.getElementById('collection-name');
	const dropDown = document.getElementById('dropDown');
	const refresh = document.getElementById('refresh-page');

	input.addEventListener('keyup', (e) => {
		const start = e.target.value.toLowerCase();
		if(start.length < 1) {
			// Trop court
			dropDown.classList.remove("visible")
			return
		}
		const suggestions = Object.keys(collectionsData).filter((id) => id.startsWith(start)).map((id) => {return {id: id, pseudo: collectionsData[id].pseudo, avatar: collectionsData[id].avatar || ""};});
		console.log(suggestions)
		switch(suggestions.length) {
			case 0:
				dropDown.classList.add("visible");
				dropDown.innerHTML = "<i>Collection inconnue...</i>";
				break;
			case 1:
				if(suggestions[0].id == e.target.value) {
					dropDown.classList.remove("visible");
				} else {
					setDropDownContent(suggestions)
				}
				if(collector != suggestions[0].id) {
					// Il faut actualiser l'album
					collector = suggestions[0].id;
					displayAlbumCards(collector)
				}
				break;
			default:
				if(collectionsData.hasOwnProperty(start) && collector != start) {
					// Plusieurs choix mais un pseudo valide a été saisi
					collector = start;
					displayAlbumCards(collector)
				}
				setDropDownContent(suggestions)
		}
	})

	input.addEventListener('focusout', (e) => {
		if(collector.startsWith(input.value.toLowerCase())) {
			input.value = collectionsData[collector].pseudo;
		}
		setTimeout(() => dropDown.classList.remove("visible"), 250)
	})

	dropDown.addEventListener('click', (e) => {
		if(e.target.dataset.collector || e.target.parentNode.dataset.collector) {
			// Clic sur l'une des suggestions
			input.value = e.target.innerText || e.target.parentNode.innerText;
			if(collector != (e.target.dataset.collector || e.target.parentNode.dataset.collector)) {
				collector = (e.target.dataset.collector || e.target.parentNode.dataset.collector);
				displayAlbumCards(collector);
			}
		}
	})

	refresh.addEventListener('click', fetchUserCards);

	function setDropDownContent(s) {
		dropDown.innerHTML = "";
		for(suggestion of s) {
			const p = document.createElement("p");
			p.innerHTML = `<img class="avatar" src=${JSON.stringify(suggestion.avatar)} alt="${suggestion.pseudo}" onerror="this.style.visibility = 'hidden'" /> ${suggestion.pseudo}`;
			p.dataset.collector = suggestion.id;
			dropDown.appendChild(p);
		}
		dropDown.classList.add("visible");
	}
}

document.addEventListener('DOMContentLoaded', function () {
	fetchUserCards(); // Appel de la fonction pour récupérer les données au chargement de la page
	initInput();
});

