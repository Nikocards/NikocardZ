/*	NikoCardZ - Page web pour voir nos cartes collectionnées
**
**	Avril 2024
**
**
**
*/

const clientId = 'kimne78kx3ncx6brgo4mv6wki5h1ko'; // s'te plait me kack pô :(
let collectionsData = {}
let collector = ""
const totalCards = 16 * 3; // Nombre total de cartes dans la collection

async function fetchUserCards(container) {
	// Si un élément DOM est passé en argument, on l'utilise pour afficher le message de chargement
	// Sinon (évenement clic sur le bouton), on utiliser '#card-container'
	const cardContainer = container.parentNode ? container : document.getElementById('card-container');
	cardContainer.innerHTML = `
		<h2>Les marauds récupèrent prestement vos effets pour que vous puissiez guerroyer, Messire.</h2>
		<img width="112" height="112" alt"Chat qui danse" src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_9d758856a6544239a47fdf3bcd8f4313/animated/light/4.0"></img>
		<div id="mainLoad" class="progress"><div style="width: 0%"></div></div>`;

	try {
		// Récupération de la barre de progression
		const prog = cardContainer.querySelector('#mainLoad>div');
		prog.style.width = "1%";

		// Récupération du contenu users_cards.json, sans utiliser le cache
		const response = await fetch('https://raw.githubusercontent.com/Nikocards/NikocardZ/bdd/public/users_cards.json', {
			cache: 'no-cache'
		});
		prog.style.width = "4%";
		const responseData = await response.json();
		prog.style.width = "7%";

		// On retire la fausse collection "undefined"
		delete responseData.undefined;

		console.log('User Cards API Response:', response.status, responseData);
		const totalUsers = Object.keys(responseData).length;
		let count = 0;

		try {
			// Liste des utilisateurs ajoutés à la liste
			let newUsers = [];
			for(user in responseData) {
				// MàJ de la barre de progression
				prog.style.width = `${10 + 90*count/totalUsers}%`;
				count ++;

				if(user == "undefined") continue;
				// On s'assure que les données du joueur soient valides (il y a bien les deux listes et elles font la même taille)
				if(!responseData[user].carte || !responseData[user].nb || responseData[user].carte.length != responseData[user].nb.length) {
					console.warn(`Utilisateur ignoré: ${user} (Données invalides)`);
					console.log(responseData[user]);
					continue;
				}
				// Si c'est un nouveau pseudo
				if(!collectionsData[user]) {
					collectionsData[user] = {pseudo: user}
					newUsers.push(user);
					// Dès qu'on a 35 pseudos à traiter, on récupère leur données (c'est la limite fixée par l'api de twitch)
					if(newUsers.length > 34) {
						await fetchTwitchDataMultiple(newUsers);
						//~ fetchTwitchDataMultiple(newUsers);
						newUsers = []
					}
				}
				// Calcul de la liste des cartes
				collectionsData[user].cards = {}
				collectionsData[user].total = 0
				collectionsData[user].uniques = 0
				for(i in responseData[user].carte) {
					const card = Card2Id(responseData[user].carte[i]);
					if(card == 1000) continue;
					collectionsData[user].cards[card] = responseData[user].nb[i];
					if(card%3 && responseData[user].nb[i] > 4) {
						collectionsData[user].cards[card+1] = Math.floor(responseData[user].nb[i]/5);
						collectionsData[user].total += collectionsData[user].cards[card+1];
						collectionsData[user].uniques ++;
					}
					if(responseData[user].nb[i] > 0) {
						collectionsData[user].total += responseData[user].nb[i];
						collectionsData[user].uniques ++;
					}
				}
			}
			// On récupère les données des éventuels derniers nouveaux pseudos
			if(newUsers.length) {
				await fetchTwitchDataMultiple(newUsers);
				//~ fetchTwitchDataMultiple(newUsers);
			}
		} catch(e) {console.error(e)}
	} catch (error) {
		console.error('Error fetching user cards data:', error);
	}

	// Si la fonction est appelée par le bouton "actualiser", on affiche la collection
	if(!container.parentNode) requestAnimationFrame(displayAlbumCards);

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

function displayAlbumCards() {
	const cardContainer = document.getElementById('card-container');
	const selectDisplay = document.getElementById('style-select');
	cardContainer.innerHTML = ''; // Effacer le contenu précédent du conteneur

	const collection = collectionsData.hasOwnProperty(collector) ? collectionsData[collector] : {pseudo: collector, cards: {}};

	//~ console.log(collection);

	switch(selectDisplay.dataset.value) {
		case 'progress':
			displayStats(collection)
			break;
		case 'rank':
			displayRanks(collection)
			break;
		default:
			displayAlbum(collection)
	}

	function displayRanks(collection) {
		let scores = Object.entries(collectionsData);
		scores.sort((a, b) => (a[1].uniques == b[1].uniques ? (b[1].total - a[1].total) : (b[1].uniques - a[1].uniques)))

		let page = 1
		displayTable()

		function displayTable() {
			let htmlContent = `<div class="classement">
				<div class="title"><h1>Classement</h1></div>
				<table>
					<thead>
						<tr>
							<th>Rang</th>
							<th>Pseudo</th>
							<th>Total</th>
							<th>Uniques</th>
						</tr>
					</thead>
					<tbody>
			`;

			for(i in scores) {
				const progressPercent = (scores[i][1].uniques / 48 * 100).toFixed(2); // Calcul du pourcentage
				htmlContent += `<tr${scores[i][0] == collector ? ' class="me"' : ''} data-collection="${scores[i][0]}">
					<td>${i*1 + 1}</td>
					<td class="pseudo"><img class="avatar" src=${JSON.stringify(scores[i][1].avatar)} alt="${scores[i][1].pseudo}" onerror="this.style.visibility = 'hidden'" width="28" height="28"/> ${scores[i][1].pseudo}</td>
					<td>${scores[i][1].total} ${scores[i][1].total > 1 ? "cartes" : "carte"}</td>
					<td>${scores[i][1].uniques} / 48<div class="progress"><div style="width: ${progressPercent}%"></div></div></td>
				</tr>`;
			}

			htmlContent += `</tbody></table></div>`;
			cardContainer.innerHTML = htmlContent;

			cardContainer.querySelectorAll('tr[data-collection]').forEach(tr => {
				tr.addEventListener('click', displayStats);
			})
		}

		function displayStats(e) {
			let element = e.target;
			while(element && !element.dataset.collection) {
				element = element.parentNode;
			}
			if(element) {
				selectDisplay.dataset.value = 'progress';
				document.getElementById('collection-name').value = element.dataset.collection;
				collector = element.dataset.collection;
				requestAnimationFrame(displayAlbumCards);
			}
		}
	}

	function displayStats(collection) {
		// Statistiques initiales par rareté
		const totalCards = { Commune: 30, Rare: 15, Legendaire: 3, Normale: 16, Holographique: 16, "E-X Card": 16 }; // Total par type
		const rarityStats = { Commune: 0, Rare: 0, Legendaire: 0 };
		const variantStats = { Normale: 0, Holographique: 0, "E-X Card": 0 };
		const uniqueStats = { Commune: 0, Rare: 0, Legendaire: 0, Normale: 0, Holographique: 0, "E-X Card": 0 };

		let listContent = '<div class="cardList">';

		// Calcul des statistiques
		Object.entries(collection.cards).forEach(([cardId, quantity]) => {
			if(quantity > 0) { // Ajoute l'id pour compter les uniques
				const type = getType(cardId); // S'assurer que cardId est un nombre
				const rarity = getRarity(type);
				const variant = ["E-X Card", "Normale", "Holographique"][cardId%3];
				const imagePath = `public/cards/${getVisible(cardId*1)}`;

				rarityStats[rarity] += quantity;
				variantStats[variant] += quantity;
				listContent += `<div class="cardRender">
					<div class="card unlocked${cardId%3==0?' ex':''}${cardId%3==2?' holo':''}">
						<div><img src="${imagePath}" alt="Card ${cardId}" width="290" height="400"/></div>
					</div>
					<div class="cardInfo">
						<h3>N°${1 + Math.floor((cardId - 1) / 3)}</h3>
						<p>${rarity}</p>
						<h4>Variante</h4>
						<p>${variant}</p>
						<h4>Quantité</h4>
						<p>x ${quantity}</p>
					</div>
				</div>`;
				uniqueStats[rarity] ++;
				uniqueStats[variant] ++;
			}
		});
		listContent += '</div>';

		// Construction des éléments HTML pour l'affichage des statistiques
		let htmlContent = '<h2 class="stats">';
		if(collection.avatar) {
			htmlContent += `<img class="avatar" src=${JSON.stringify(collection.avatar.replace(/-28x28\./,'-50x50.'))} alt="${collection.pseudo}" onerror="this.style.visibility = 'hidden'" width="50" height="50"/>`;
		}
		htmlContent += `Collection de ${collection.pseudo}</h2><div class="stats"><table>`;
		htmlContent += `<tr><th>Rareté</th><th>Collectées</th><th>Uniques</th></tr>`;

		// Ajout des statistiques de rareté avec des barres de progression personnalisées
		Object.keys(rarityStats).forEach(rarity => {
			const total = totalCards[rarity];
			const count = rarityStats[rarity];
			const uniques = uniqueStats[rarity];
			const progressPercent = (uniques / total * 100).toFixed(2); // Calcul du pourcentage

			htmlContent += `<tr>
				<td>${rarity}</td>
				<td>${count}</td>
				<td><p>${uniques}/${total}</p><div class="progress"><div style="width: ${progressPercent}%"></div></div></td>
			</tr>`;
		});

		htmlContent += `</table><table><tr><th>Variante	</th><th>Collectées</th><th>Uniques</th></tr>`;

		// Ajout des statistiques de rareté avec des barres de progression personnalisées
		Object.keys(variantStats).forEach(variation => {
			const total = totalCards[variation];
			const count = variantStats[variation];
			const uniques = uniqueStats[variation];
			const progressPercent = (uniques / total * 100).toFixed(2); // Calcul du pourcentage

			htmlContent += `<tr>
				<td>${variation}</td>
				<td>${count}</td>
				<td><p>${uniques}/${total}</p><div class="progress"><div style="width: ${progressPercent}%"></div></div></td>
			</tr>`;
		});

		htmlContent += '</table></div>';
		htmlContent += listContent;

		// Ajout du contenu HTML au container de cartes
		cardContainer.innerHTML = htmlContent;
		cardContainer.querySelectorAll('.card').forEach(cardElement => {
			cardElement.addEventListener('click', toogleFullscreen);
		})
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
					cardElement.classList.add('ex');
				}
				if(collection.cards[cardNumber]) {
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
				if(collection.cards[cardNumber]) {
					const cardCount = document.createElement('p');

					cardCount.classList.add('card-count');
					cardCount.innerText = "x " + collection.cards[cardNumber];
					cardImgContainer.appendChild(cardCount);
				}
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

		if(displayTwoPages) {
			// Afficher la première page par défaut
			const firstPage = document.getElementById('page-1');
			if (firstPage) {
				firstPage.classList.add('next-visible');
			}
		}

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
	}

	function getVisible(id) {
		return `${Math.floor((id+2)/3)}${id%3==0?"s":(id%3==1?"":"h")}.png`
	}

	function getType(id) {
		if(id < 31) return 1+(id-1)%3;
		if(id < 46) return 4+(id-1)%3;
		return 7+(id-1)%3;
	}

	function getLocked(id) {
		return `cache${getType(id)}.png`
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

	function getRarity(typeId) {
		if ([1, 2, 3].includes(typeId)) {
			return 'Commune';
		} else if ([4, 5, 6].includes(typeId)) {
			return 'Rare';
		} else {
			return 'Legendaire';
		}
	}
}

function initInput() {
	const input = document.getElementById('collection-name');
	let inputStart = document.getElementById('start-name');
	const dropDown = document.getElementById('dropDown');
	let dropDownStart = document.getElementById('start-dropDown');
	const refresh = document.getElementById('refresh-page');
	const selectDisplay = document.getElementById('style-select');

	input.addEventListener('keyup', handleKeyup);
	inputStart.addEventListener('keyup', handleKeyup);

	dropDown.addEventListener('click', handleClick);
	dropDownStart.addEventListener('click', handleClick);

	function handleKeyup(e) {
		const start = e.target.value.toLowerCase();
		const drop = dropDownStart || dropDown;
		if(start.length < 1) {
			// Trop court
			drop.classList.remove("visible")
			return
		}
		const suggestions = Object.keys(collectionsData).filter((id) => id.startsWith(start)).map((id) => {return {id: id, pseudo: collectionsData[id].pseudo, avatar: collectionsData[id].avatar || ""};});
		console.log(suggestions)
		switch(suggestions.length) {
			case 0:
				drop.classList.add("visible");
				drop.innerHTML = "<i>Collection inconnue...</i>";
				break;
			case 1:
				if(suggestions[0].id == e.target.value) {
					drop.classList.remove("visible");
				} else {
					setDropDownContent(suggestions)
				}
				if(collector != suggestions[0].id) {
					// Il faut actualiser l'album
					collector = suggestions[0].id;
					if(inputStart) {
						input.value = suggestions[0].pseudo;
						document.querySelector('header').style.display = null;
						inputStart = null;
						dropDownStart = null;
					}
					displayAlbumCards()
				}
				break;
			default:
				if(collectionsData.hasOwnProperty(start) && collector != start) {
					// Plusieurs choix mais un pseudo valide a été saisi
					collector = start;
					if(inputStart) {
						input.value = collectionsData[start].pseudo;
						document.querySelector('header').style.display = null;
						inputStart = null;
						dropDownStart = null;
					}
					displayAlbumCards()
				}
				setDropDownContent(suggestions)
		}
	}

	input.addEventListener('focusout', (e) => {
		if(collector.startsWith(input.value.toLowerCase())) {
			input.value = collectionsData[collector].pseudo;
		}
		setTimeout(() => dropDown.classList.remove("visible"), 250)
	})

	function handleClick(e) {
		if(e.target.dataset.collector || e.target.parentNode.dataset.collector) {
			// Clic sur l'une des suggestions
			input.value = e.target.innerText || e.target.parentNode.innerText;
			if(collector != (e.target.dataset.collector || e.target.parentNode.dataset.collector)) {
				collector = (e.target.dataset.collector || e.target.parentNode.dataset.collector);
				if(inputStart) {
					input.value = collectionsData[collector].pseudo;
					document.querySelector('header').style.display = null;
					inputStart = null;
					dropDownStart = null;
				}
				displayAlbumCards();
			}
		}
	}

	selectDisplay.querySelectorAll('button').forEach(button => {
		button.addEventListener('click', e => {
			if(e.target.parentNode.dataset.value != e.target.dataset.value) {
				e.target.parentNode.dataset.value = e.target.dataset.value;
				displayAlbumCards();
			}
		});
	})

	refresh.addEventListener('click', fetchUserCards);

	function setDropDownContent(s) {
		const drop = dropDownStart || dropDown;
		drop.innerHTML = "";
		for(suggestion of s) {
			const p = document.createElement("p");
			p.innerHTML = `<img class="avatar" src=${JSON.stringify(suggestion.avatar)} alt="${suggestion.pseudo}" onerror="this.style.visibility = 'hidden'" width="28" height="28"/> ${suggestion.pseudo}`;
			p.dataset.collector = suggestion.id;
			drop.appendChild(p);
		}
		drop.classList.add("visible");
	}

	inputStart.focus();
}

document.addEventListener('DOMContentLoaded', async function () {
	let startContent = document.getElementById('start-content')
	await fetchUserCards(startContent); // Appel de la fonction pour récupérer les données au chargement de la page
	startContent.innerHTML = `<p>
		Veuillez apposer ici votre glorieux titre de <b>Twitch</b> ici, Messire.
	</p><p>
		A moins que vous ne soyez un gueux ?! Que nenni !
	</p>
	<input type="text" id="start-name" placeholder="Votre pseudo Twitch">
	<div id="start-dropDown"></div>`;
	initInput();
});

