/*	NikoCardZ - Page web pour voir nos cartes collectionnées
**
**	Avril 2024
**
**
**
*/

const clientId = 'kimne78kx3ncx6brgo4mv6wki5h1ko'; // s'te plait me kack pô :(
let allCards = [
	{id:  1, num:  1, bdd:    1, img:   "1", hide: "cache1.webp", rarity:    "Commune", variant:       "Normale", name: "Follow"},
	{id:  2, num:  1, bdd: null, img:  "1h", hide: "cache2.webp", rarity:    "Commune", variant: "Holographique", name: "Follow"},
	{id:  3, num:  1, bdd:   18, img:  "1s", hide: "cache3.webp", rarity:    "Commune", variant:      "E-X Card", name: "Follow"},
	{id:  4, num:  2, bdd:    2, img:   "2", hide: "cache1.webp", rarity:    "Commune", variant:       "Normale", name: "Caca"},
	{id:  5, num:  2, bdd: null, img:  "2h", hide: "cache2.webp", rarity:    "Commune", variant: "Holographique", name: "Caca"},
	{id:  6, num:  2, bdd:   19, img:  "2s", hide: "cache3.webp", rarity:    "Commune", variant:      "E-X Card", name: "Caca"},
	{id:  7, num:  3, bdd:    3, img:   "3", hide: "cache1.webp", rarity:    "Commune", variant:       "Normale", name: "Raid 1"},
	{id:  8, num:  3, bdd: null, img:  "3h", hide: "cache2.webp", rarity:    "Commune", variant: "Holographique", name: "Raid 1"},
	{id:  9, num:  3, bdd:   20, img:  "3s", hide: "cache3.webp", rarity:    "Commune", variant:      "E-X Card", name: "Raid 1"},
	{id: 10, num:  4, bdd:    4, img:   "4", hide: "cache1.webp", rarity:    "Commune", variant:       "Normale", name: "Raid 2"},
	{id: 11, num:  4, bdd: null, img:  "4h", hide: "cache2.webp", rarity:    "Commune", variant: "Holographique", name: "Raid 2"},
	{id: 12, num:  4, bdd:   21, img:  "4s", hide: "cache3.webp", rarity:    "Commune", variant:      "E-X Card", name: "Raid 2"},
	{id: 13, num:  5, bdd:    5, img:   "5", hide: "cache1.webp", rarity:    "Commune", variant:       "Normale", name: "Artiste"},
	{id: 14, num:  5, bdd: null, img:  "5h", hide: "cache2.webp", rarity:    "Commune", variant: "Holographique", name: "Artiste"},
	{id: 15, num:  5, bdd:   22, img:  "5s", hide: "cache3.webp", rarity:    "Commune", variant:      "E-X Card", name: "Artiste"},
	{id: 16, num:  6, bdd:    6, img:   "6", hide: "cache1.webp", rarity:    "Commune", variant:       "Normale", name: "Lecture"},
	{id: 17, num:  6, bdd: null, img:  "6h", hide: "cache2.webp", rarity:    "Commune", variant: "Holographique", name: "Lecture"},
	{id: 18, num:  6, bdd:   23, img:  "6s", hide: "cache3.webp", rarity:    "Commune", variant:      "E-X Card", name: "Lecture"},
	{id: 19, num:  7, bdd:    7, img:   "7", hide: "cache1.webp", rarity:    "Commune", variant:       "Normale", name: "Tournois"},
	{id: 20, num:  7, bdd: null, img:  "7h", hide: "cache2.webp", rarity:    "Commune", variant: "Holographique", name: "Tournois"},
	{id: 21, num:  7, bdd:   24, img:  "7s", hide: "cache3.webp", rarity:    "Commune", variant:      "E-X Card", name: "Tournois"},
	{id: 22, num:  8, bdd:    8, img:   "8", hide: "cache1.webp", rarity:    "Commune", variant:       "Normale", name: "Lurk"},
	{id: 23, num:  8, bdd: null, img:  "8h", hide: "cache2.webp", rarity:    "Commune", variant: "Holographique", name: "Lurk"},
	{id: 24, num:  8, bdd:   25, img:  "8s", hide: "cache3.webp", rarity:    "Commune", variant:      "E-X Card", name: "Lurk"},
	{id: 25, num:  9, bdd:    9, img:   "9", hide: "cache1.webp", rarity:    "Commune", variant:       "Normale", name: "Ouin Ouin"},
	{id: 26, num:  9, bdd: null, img:  "9h", hide: "cache2.webp", rarity:    "Commune", variant: "Holographique", name: "Ouin Ouin"},
	{id: 27, num:  9, bdd:   26, img:  "9s", hide: "cache3.webp", rarity:    "Commune", variant:      "E-X Card", name: "Ouin Ouin"},
	{id: 28, num: 10, bdd:   10, img:  "10", hide: "cache1.webp", rarity:    "Commune", variant:       "Normale", name: "Popcorn"},
	{id: 29, num: 10, bdd: null, img: "10h", hide: "cache2.webp", rarity:    "Commune", variant: "Holographique", name: "Popcorn"},
	{id: 30, num: 10, bdd:   27, img: "10s", hide: "cache3.webp", rarity:    "Commune", variant:      "E-X Card", name: "Popcorn"},
	{id: 31, num: 11, bdd:   11, img:  "11", hide: "cache4.webp", rarity:       "Rare", variant:       "Normale", name: "Princess Lexi"},
	{id: 32, num: 11, bdd: null, img: "11h", hide: "cache5.webp", rarity:       "Rare", variant: "Holographique", name: "Princess Lexi"},
	{id: 33, num: 11, bdd:   28, img: "11s", hide: "cache6.webp", rarity:       "Rare", variant:      "E-X Card", name: "Princess Lexi"},
	{id: 34, num: 12, bdd:   12, img:  "12", hide: "cache4.webp", rarity:       "Rare", variant:       "Normale", name: "Ban"},
	{id: 35, num: 12, bdd: null, img: "12h", hide: "cache5.webp", rarity:       "Rare", variant: "Holographique", name: "Ban"},
	{id: 36, num: 12, bdd:   29, img: "12s", hide: "cache6.webp", rarity:       "Rare", variant:      "E-X Card", name: "Ban"},
	{id: 37, num: 13, bdd:   13, img:  "13", hide: "cache4.webp", rarity:       "Rare", variant:       "Normale", name: "Poulet"},
	{id: 38, num: 13, bdd: null, img: "13h", hide: "cache5.webp", rarity:       "Rare", variant: "Holographique", name: "Poulet"},
	{id: 39, num: 13, bdd:   30, img: "13s", hide: "cache6.webp", rarity:       "Rare", variant:      "E-X Card", name: "Poulet"},
	{id: 40, num: 14, bdd:   14, img:  "14", hide: "cache4.webp", rarity:       "Rare", variant:       "Normale", name: "JDR"},
	{id: 41, num: 14, bdd: null, img: "14h", hide: "cache5.webp", rarity:       "Rare", variant: "Holographique", name: "JDR"},
	{id: 42, num: 14, bdd:   31, img: "14s", hide: "cache6.webp", rarity:       "Rare", variant:      "E-X Card", name: "JDR"},
	{id: 43, num: 15, bdd:   15, img:  "15", hide: "cache4.webp", rarity:       "Rare", variant:       "Normale", name: "Sponsor"},
	{id: 44, num: 15, bdd: null, img: "15h", hide: "cache5.webp", rarity:       "Rare", variant: "Holographique", name: "Sponsor"},
	{id: 45, num: 15, bdd:   32, img: "15s", hide: "cache6.webp", rarity:       "Rare", variant:      "E-X Card", name: "Sponsor"},
	{id: 46, num: 16, bdd:   16, img:  "16", hide: "cache7.webp", rarity: "Legendaire", variant:       "Normale", name: "Baston"},
	{id: 47, num: 16, bdd: null, img: "16h", hide: "cache8.webp", rarity: "Legendaire", variant: "Holographique", name: "Baston"},
	{id: 48, num: 16, bdd:   33, img: "16s", hide: "cache9.webp", rarity: "Legendaire", variant:      "E-X Card", name: "Baston"},
	{id: 49, num: 17, bdd:   17, img:  "17", hide: "cache7.webp", rarity: "Legendaire", variant:       "Normale", name: "Imposteur"},
	{id: 50, num: 17, bdd: null, img: "17h", hide: "cache8.webp", rarity: "Legendaire", variant: "Holographique", name: "Imposteur"},
	{id: 51, num: 17, bdd:   34, img: "17s", hide: "cache9.webp", rarity: "Legendaire", variant:      "E-X Card", name: "Imposteur"},
	{id: 52, num: 18, bdd:   35, img:  "18", hide: "cache4.webp", rarity:       "Rare", variant:       "Normale", name: "La Cour du Roi"},
	{id: 53, num: 18, bdd: null, img: "18h", hide: "cache5.webp", rarity:       "Rare", variant: "Holographique", name: "La Cour du Roi"},
	{id: 54, num: 18, bdd:   36, img: "18s", hide: "cache6.webp", rarity:       "Rare", variant:      "E-X Card", name: "La Cour du Roi"},
]
let collectionsData = {}
let collector = ""
const totalCards = allCards.length; // Nombre total de cartes dans la collection

async function fetchUserCards(container) {
	// Si un élément DOM est passé en argument, on l'utilise pour afficher le message de chargement
	// Sinon (évenement clic sur le bouton), on utilise '#card-container'
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
					//~ const card = Card2Id(responseData[user].carte[i]);
					const card = allCards.find((element) => element.bdd == responseData[user].carte[i]);;
					if(card == undefined) continue;
					collectionsData[user].cards[card.id] = responseData[user].nb[i];
					if(responseData[user].nb[i] > 0) {
						if(card.variant == "Normale" && responseData[user].nb[i] > 4) {
							collectionsData[user].cards[card.id+1] = Math.floor(responseData[user].nb[i]/5);
							collectionsData[user].total += collectionsData[user].cards[card.id+1];
							collectionsData[user].uniques ++;
						}
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

		for(i in allCards) {
			allCards[i].stat = 0
			for(u in collectionsData) {
				if(collectionsData[u].cards[allCards[i].id]) allCards[i].stat ++;
			}
		}
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

	/*function displayRanks(collection) {
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
				const progressPercent = (scores[i][1].uniques / totalCards * 100).toFixed(2); // Calcul du pourcentage
				htmlContent += `<tr${scores[i][0] == collector ? ' class="me"' : ''} data-collection="${scores[i][0]}">
					<td>${i*1 + 1}</td>
					<td class="pseudo"><img class="avatar" src=${JSON.stringify(scores[i][1].avatar)} alt="${scores[i][1].pseudo}" onerror="this.style.visibility = 'hidden'" width="28" height="28"/> ${scores[i][1].pseudo}</td>
					<td>${scores[i][1].total} ${scores[i][1].total > 1 ? "cartes" : "carte"}</td>
					<td>${scores[i][1].uniques} / ${totalCards}<div class="progress"><div style="width: ${progressPercent}%"></div></div></td>
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
	}*/
	function displayRanks(collection) {
		let scores = Object.entries(collectionsData);
		scores.sort((a, b) => (a[1].uniques == b[1].uniques ? (b[1].total - a[1].total) : (b[1].uniques - a[1].uniques)))

		let page = 1;
		let itemsPerPage = 100;
		let totalPages = Math.ceil(scores.length / itemsPerPage);

		displayTable();

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

			for(let i = (page - 1) * itemsPerPage; i < page * itemsPerPage && i < scores.length; i++) {
				const progressPercent = (scores[i][1].uniques / totalCards * 100).toFixed(2); // Calcul du pourcentage
				htmlContent += `<tr${scores[i][0] == collector ? ' class="me"' : ''} data-collection="${scores[i][0]}">
					<td>${i*1 + 1}</td>
					<td class="pseudo"><img class="avatar" src=${JSON.stringify(scores[i][1].avatar)} alt="${scores[i][1].pseudo}" onerror="this.style.visibility = 'hidden'" width="28" height="28"/> ${scores[i][1].pseudo}</td>
					<td>${scores[i][1].total} ${scores[i][1].total > 1 ? "cartes" : "carte"}</td>
					<td>${scores[i][1].uniques} / ${totalCards}<div class="progress"><div style="width: ${progressPercent}%"></div></div></td>
				</tr>`;
			}

			htmlContent += `</tbody></table>
				<div class="album-button-container">
					<button${page == 1 ? ' disabled' : ''} id="prev-page">Page précédente</button>
					<button${page == totalPages ? ' disabled' : ''} id="next-page">Page suivante</button>
				</div>
			</div>`;
			cardContainer.innerHTML = htmlContent;

			cardContainer.querySelectorAll('tr[data-collection]').forEach(tr => {
				tr.addEventListener('click', displayStats);
			})

			document.getElementById('prev-page').addEventListener('click', () => {
				if(page > 1) {
					page--;
					displayTable();
				}
			});

			document.getElementById('next-page').addEventListener('click', () => {
				if(page < totalPages) {
					page++;
					displayTable();
				}
			});
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
		const totalCards = { Commune: 30, Rare: 18, Legendaire: 6, Normale: 18, Holographique: 18, "E-X Card": 18 }; // Total par type
		const rarityStats = { Commune: 0, Rare: 0, Legendaire: 0 };
		const variantStats = { Normale: 0, Holographique: 0, "E-X Card": 0 };
		const uniqueStats = { Commune: 0, Rare: 0, Legendaire: 0, Normale: 0, Holographique: 0, "E-X Card": 0 };

		let listContent = '<div class="cardList">';

		// Calcul des statistiques
		Object.entries(collection.cards).forEach(([cardId, quantity]) => {
			if(quantity > 0) { // Ajoute l'id pour compter les uniques
				const card = allCards.find((element) => element.id == cardId);
				if(card != undefined) {
					const imagePath = `public/cards/${card.img}.webp`;

					rarityStats[card.rarity] += quantity;
					variantStats[card.variant] += quantity;
					listContent += `<div class="cardRender ${card.rarity}">
						<div>
							<div class="card unlocked${card.variant == 'E-X Card' ?' ex':''}${card.variant == 'Holographique'?' holo':''}">
								<div><img src="${imagePath}" alt="Carte ${card.name}" width="290" height="400"/></div>
							</div>
							<div class="cardInfo">
								<h3>N°${card.num}</h3>
								<p>${card.rarity}</p>
								<h4>Variante</h4>
								<p>${card.variant}</p>
								<h4>Quantité</h4>
								<p>x ${quantity}</p>
							</div>
						</div>
						<p><i>Découverte par ${card.stat} personne${card.stat > 1 ? "s" : ""}</i></p>
						<div class="progress"><div style="width: ${Math.floor(1000 * card.stat / Object.keys(collectionsData).length)/10}%;height: 6px;"></div></div>
					</div>`;
						// <div class="progress"><div style="width: ${Math.floor(1000/Math.sqrt(card.stat))/10}%;height: 6px;"></div></div>
					uniqueStats[card.rarity] ++;
					uniqueStats[card.variant] ++;
				}
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
			[7, 10, 8,11, 9,12],
			[16,17,18,19,20,21,22,23,24],
			[25,26,27,28,29,30],
			[31,32,33,34,35,36,37,38,39],
			[40,41,42,43,44,45,52,53,54],
			[46,47,48],
			[49,50,51]
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
				const card = allCards.find((element) => element.id == cardNumber);
				if(card != undefined) {
					const cardElement = document.createElement('div');
					const cardImgContainer = document.createElement('div');
					const cardImage = document.createElement('img');
					cardElement.classList.add('card');
					cardElement.id = "card-" + card.id;
					if(card.variant == "Holographique") {
						cardElement.classList.add('holo');
					} else if(card.variant == "E-X Card") {
						cardElement.classList.add('ex');
					}
					if(collection.cards[cardNumber]) {
						cardImage.src = `public/cards/${card.img}.webp`;
						cardElement.classList.add('unlocked');
						cardElement.addEventListener('click', toogleFullscreen);
					} else {
						cardImage.src = `public/cards/${card.hide}`;
						cardElement.classList.add('locked');
					}
					cardImage.alt = `Carte ${card.name}`;
					cardImage.width = 290;
					cardImage.height = 400;

					cardElement.appendChild(cardImgContainer);
					cardImgContainer.appendChild(cardImage);
					if(collection.cards[card.id]) {
						const cardCount = document.createElement('p');

						cardCount.classList.add('card-count');
						cardCount.innerText = "x " + collection.cards[cardNumber];
						cardImgContainer.appendChild(cardCount);
					}
					pageGrid.appendChild(cardElement);
				}
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
		//~ console.log(pageWidth)
		const screenWidth = document.body.clientWidth;
		const displayTwoPages = pageWidth * 2 <= screenWidth;// Fonction pour naviguer entre les pages

		let firstPage;
		if(displayTwoPages) {
			firstPage = document.getElementById('page-1');
			firstPage.classList.add('visible');
			firstPage.classList.add('next-visible');
		//~ } else {
			//~ document.getElementById('page-1').classList.remove('visible');
			//~ document.getElementById('page-2').classList.add('visible');
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

	function toogleFullscreen(e) {
		if(document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			let target = e.target;
			while(target && !target.classList.contains("unlocked")) target = target.parentNode;
			if(target) target.requestFullscreen();
			if(target.querySelector('img[alt="Carte Poulet"]')) ee();
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

function ee() {
    if(document.getElementById('btnp')) return;

    function init() {
        // Créer le container
        const container = document.createElement('div');
        container.id = 'pc';
        document.body.appendChild(container);

        // Créer le bouton jaune
        const btnp = document.createElement('button');
        btnp.id = 'btnp';
        btnp.textContent = 'Poulet !';
        container.appendChild(btnp);

        // Ajouter l'event listener sur le bouton jaune (add)
        btnp.addEventListener('click', add);
        container.addEventListener('click', big);
    }

    function add(e) {
		btnp.animate(
			[{ opacity: 0.4, pointerEvents: "none"},{ opacity: 0.4, pointerEvents: "none"}],
			{duration: 2000,easing: 'linear',}
		);
        // Créer et ajouter un poulet
        const poulet = document.createElement('svg');
		let html = `<svg class="poulet ${['saut', 'mange', 'marche'][Math.floor(Math.random() * 3)]}" style="--prim-color: hsl(${Math.floor(Math.random() * 360)} 100% ${50 + Math.floor(Math.random() * 40)}%); --sec-color: hsl(${Math.floor(Math.random() * 360)} 100% ${50 + Math.floor(Math.random() * 40)}%); width: 10vw;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 540">
<g class="patte1">
	<path fill="#c83" d="M170 368c15 44-56 63-63 11m49 27c9 15-9 19-11 10-3 12-18 5-15-7m20 2-10 57c23-7 40 0 33 7s-25 7-42 13-52 27-52 12c-12 0-9-9-7-11-10-2-6-22 56-18l11-59" />
	<path class="prim-color" d="M170 368c15 44-56 63-63 11m49 27c9 15-9 19-11 10-3 12-18 5-15-7" />
	<path class="ombre" d="M170 368c8 42-29 44-41 41 24-8 34-19 41-41m-14 38c9 15-9 19-11 10-3 12-18 5-15-7" />
	<path class="contour" d="M170 368c15 44-56 63-63 11m49 27c9 15-9 19-11 10-3 12-18 5-15-7m18 11-8 48c23-7 40 0 33 7s-25 7-42 13-46 24-51 15 12-18 38-24m-39 21c-23-3 2-26 35-24m-42 13c-10-2-6-22 56-18l9-49" />
</g><g class="corps"><g class="body">
	<path class="prim-color" d="M325 227c8-11 11-8 9 6s-15 57-33 89-76 76-151 65-110-28-123-67c-12-16-21-35-11-62-18 51-16-9 9-39-11 15-14 19-17 17s8-18 25-38 29-53 35-74 6-44 4-55-5-35 10-50 28-17 41-9 28 19 37 48 10 37 10 58 3 50 12 70c26 0 51 23 58 29 12-3 22-10 28-14 0-5 4-10 8-14s13-13 15-7c4-4 9-12 18-7s9 15 9 24c4-8 7-11 9-2s0 21-2 32" />
	<path class="ombre" d="M123 10s28 19 37 48 10 37 10 58 3 50 12 70c26 0 51 23 58 29s44 35 62 22 14-16 16-40c4-8 7-11 9-2s0 21-2 32c8-11 11-8 9 6s-15 57-33 89-61 64-140 26-79-148 34-94 94-21-7-50c-44-53-13-125-65-194m27 377c-75-11-110-28-123-67 58 43 62 48 123 67" />
	<path class="contour" d="M55 340c-43-21-49-55-39-82-18 51-16-9 9-39-11 15-14 19-17 17s8-18 25-38 29-53 35-74 6-44 4-55-5-35 10-50 28-17 41-9 28 19 37 48 10 37 10 58 3 57 18 88m-7-19c27 1 59 28 82 51m-23-21c12-3 22-10 34-18m-6 4c0-5 4-10 8-14s13-13 15-7m-10 13c8-8 17-27 27-20s11 13 9 35m1-12c4-7 7-10 9-1s1 32-7 51m6-20c7-10 10-7 8 7s-15 57-33 89-76 76-151 65-110-28-123-67m99-5c6 10-13 8-21 8 22-1 18 19-33 11" />
</g><g class="aile">
	<path class="prim-color" d="M252 242c40-1 73 20 36 15l0 0c39 8 58 20 36 19l0 0c30 12 32 18 25 19l-15 1c20 2 6 8 2 9s-29 7-48 23-43 28-72 26-80-38-97-61-26-47-10-67 34-6 61-7" />
	<path class="ombre" d="M271 255l0 0c62 6 84 31 36 16m29 34c-21-5-57 10-49 0m0 0c53-18 68-4 49 0s-29 7-48 23-43 28-72 26-80-38-97-61-26-47-10-67c-21 43 53 104 125 101s69-23 102-22m-100-50c52 12 14 11 2 11-4 11 9-2 28 10s56-1-30-21" />
	<path class="contour" d="M252 242c40-1 73 20 36 15l-17-2c62 6 75 26 53 21l-17-5c52 14 49 23 42 24s-40-1-62 10m47-9c20 2 6 8 2 9s-29 7-48 23-43 28-72 26-80-38-97-61-26-47-10-67 34-6 61-7m66 36c52 12 14 11 2 11 26-1 35 3 52 12" />
</g>`;
html += [`<g class="coiffe">
	<path class="sec-color" d="M155 46c-49-36-58-12-84-13s-28-22-14-27c-13-5-27-36 1-36s43 6 71 36c-26-37 10-42 18-12s-3 24 8 52" />
	<path class="ombre" d="M155 46c-49-36-50-7-91-14 31-3 49-22 80 3-1-33 5-30-11-58 29 22 9 38 22 68m-98-39c10 7 23 9 30 7 4 9-28 6-36-3m1-39c24-3 49 1 77 35-3 17-23-33-77-35" />
	<path class="contour" d="M155 46c-49-36-58-12-84-13s-28-22-14-27m28 8c-49-4-56-44-27-44s43 6 71 36c-26-37 10-42 18-12s-3 24 8 52" />
	<path class="contour prim-color" d="M135 38c-21-9-20-27-34-12-3-3-17 0-17 3-10-9-13-4-12 8" />
</g>`, `<g class="coiffe">
	<path class="sec-color contour" d="M73 36c-14-74 32-87 21-42 15-40 68-39 30-2 41-30 87 1 22 15 69-11 78 44 20 26 79 31 9 39-4 29-27-35-56-57-89-26" />
	<path class="ombre" d="M73 36c52-50 71 30 130 16 0 13-23 18-41 10-27-35-56-57-89-26m61-71c3 2 9 8-10 27-10-6 15-17 10-27m32 15c28 7 4 23-20 27-13-10 36-14 20-27m36 40c8 13-8 22-36 13-7-10 27 3 36-13" />
</g>`][Math.floor(Math.random() * 2)];
html += [`<g class="yeux">
	<path fill="#fff" stroke="#000" stroke-width="2" d="M128 78c-10 0-20-1-28 3l-9-6c-8-11 8-32 25-24l-3-4c10 10 11 22 7 31m-51-5c-8-5-7-21 9-24 5 4 4 17 0 23z" />
	<path fill="#000" d="M112 78l-12 3-9-6c-7-10 4-25 14-25 2 1 6 5 8 12-14 4-8 6 1 3 1 5 0 10-2 13m-16-1a1 1 0 000-6 1 1 0 000 6m8-15a1 1 0 000-7 1 1 0 000 7m-35 11c-7-6-4-21 7-22 2 1 3 5 3 9-12-2-4 3-1 3 0 3-1 6-2 9m-6-1a1 1 0 000-5 1 1 0 000 5m4-14a1 1 0 000-4 1 1 0 000 4" />
</g>`, `<g class="yeux">
	<path fill="#fff" d="M85 58c-4 1-11 2-15 1-3 7 0 13 2 15l10-1c2-3 4-10 3-15m12 1c3 1 18 0 24-3 5 8 5 14 3 20-7-1-23-1-31 1-2-8 1-16 4-18" />
	<path fill="transparent" stroke="#000" stroke-width="2" d="M66 55c6-6 14-5 18 0m1 3c-4 1-11 2-15 1-3 7 0 13 2 15l10-1c2-3 4-10 3-15m9 0c11 2 22 1 30-4m-3 2c5 8 5 14 3 20m-6 4c3-1 6-1 9 1m-6 2h4m5-6c-13-2-29-2-39 1m2-1c-2-8 1-16 4-18m-1-5c14-21 22-22 31-5" />
	<path fill="#000" d="M81 59c-2 0-7 1-11 0-3 7 0 13 2 15l7-1c2-4 3-8 2-14m17 0c5 1 13 0 17-1 4 6 3 12 2 17m0 0c-3 0-11-1-18 0-4-4-3-11-1-16m1 12c0 4 16 2 16 0s-1-2-3-1-8 1-10 0-3-1-3 1m13-6a1 1 0 000-5 1 1 0 000 5m-34 0a1 1 0 010-4 1 1 0 010 4m-6 5c0-2 6-2 6 0s-6 2-6 0" />
</g>`][Math.floor(Math.random() * 2)];
html += `<g class="wattle">
	<path class="sec-color contour" d="M74 92c20 22 1 48-14 48s-13-19-6-27zm45-1c18 8 15 15 30 29s13 50-7 50-17-28-16-39-3-25-8-35" />
	<path class="ombre" d="M74 92c11 14 9 29 4 36 1-20-3-24-8-31m49-6c18 8 15 15 30 30s10 42-3 48c5-31-5-55-27-78" />
</g>`;
html += [`<g class="bec">
	<path fill="#C58A2C" d="M104 86c11-2 12 3 16 6 1 5-3 5-9 10s-18 27-41 10l2-12c-10-1-14-1-24 2 3-37 40-34 56-16" />
	<path fill="#88510E" d="M72 100c-10-1-14-1-24 2 5-8 32-4 54-11 14-1 11 4 18 1 1 5-3 5-11 9s-24 24-39 11" />
	<path fill="#A22124" d="M102 97c-6 10-27 24-15 3" />
	<path class="contour" d="M99 86c17-3 17 3 21 6 1 5-3 5-9 10s-18 27-41 10l2-12m15 0c-2 3-5 8-3 11m-9-5c-8 14 22 2 26-8m1-8c8 0 10 1 13 4m-3-2c-18 15-52 3-64 10 3-37 40-33 55-17" />
</g>`, `<g class="bec">
	<path fill="#C58A2C" d="M66 101c-3-1-13 0-19 2 6-29 16-26 26-28s16 0 31 12c8-2 12 2 16 8" />
	<path fill="#88510E" d="M66 101c-3-1-13 0-19 2 4-6 15-5 31-7s25-2 28-9c6-2 10 2 14 8-21 7-30 30-54 6" />
	<path fill="#eee" d="M111 94c-10 7-21 7-30 7 11 0 18-6 23-10" />
	<path class="contour" d="M81 101c11 0 18-6 23-10l7 3c-14 13-43 3-64 9 6-29 16-26 26-28s16 0 31 12m-6 1c15-4 18 1 22 7-21 7-30 30-54 6m41-12c3 0 7 2 8 4" />
</g>`][Math.floor(Math.random() * 2)];
html += `</g><g class="patte2">
	<path fill="#c83" d="M208 430l-11 64c28-9 47 0 41 7s-31 9-52 17-64 33-64 14c-14 0-11-10-8-13-12-3-7-26 69-22l12-66" />
	<path class="prim-color" d="M235 368c21 57-73 82-79 13m60 37c13 17-10 22-14 12-2 12-20 6-15-8" />
	<path class="ombre" d="M235 368c9 32-7 42-19 50 13 17-10 22-14 12-2 12-20 6-15-8 54-24 37-50 48-54" />
	<path class="contour" d="M235 368c21 57-73 82-79 13m60 37c13 17-10 22-14 12-2 12-20 6-15-8m20 13-10 59c28-9 47 0 41 7s-31 9-52 17-58 29-63 18 14-23 47-29m-48 25c-30-3 8-33 43-29m-51 16c-12-3-7-26 69-22l11-61" />
</g></svg>`;
        document.getElementById('pc').appendChild(poulet);
		poulet.outerHTML = html;
        setTimeout(() => {console.log(poulet.addEventListener('click', big));}, 1000)
    }

    function big(e) {
		let pz = e.target;
		while(pz.localName != "svg") {
			if(pz == document.body) return;
			pz = pz.parentNode;
		}
		console.log(pz)

        const currentWidth = parseInt(pz.style.width);
        const newWidth = Math.floor(currentWidth * 1.3);

        // Si poulet pas trop gros
        if (newWidth < 50) {
            pz.style.width = newWidth + 'vw';
            const cotSound = new Audio('public/cot.ogg');
			cotSound.volume = 0.4;
            cotSound.play();
        } else {
            // Jouer animation boom
            pz.classList = "poulet exp";
            const exSound = new Audio('public/ex.ogg');
            exSound.play();
			exSound.volume = 0.4;
			setTimeout(() => pz.remove(), 1000)
        }
    }

    // Initialiser les éléments
    init();
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

function generateGraph() {
	const ref = Object.keys(collectionsData).length;
	// Triez la liste allCards
	allCards.sort((a, b) => {
		const rarityOrder = { "Commune": 0, "Rare": 1, "Legendaire": 2 };
		const variantOrder = { "Normale": 0, "Holographique": 1, "E-X Card": 2 };
		return rarityOrder[a.rarity] - rarityOrder[b.rarity] || a.num - b.num || variantOrder[a.variant] - variantOrder[b.variant];
	});

	// Créez un SVG
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width", "100%");
	svg.setAttribute("height", ref);

	// Définissez les couleurs des barres
	const colors = { "Normale": "red", "Holographique": "yellow", "E-X Card": "purple" };

	// Parcourez la liste triée trois fois
	let pathDataRed = "";
	let pathDataYellow = "";
	let pathDataPurple = "";
	let x = 0;
	for (let i = 0; i < allCards.length; i++) {
		const card = allCards[i];
		const y = ref - card.stat;
		const width = 10;
		const height = card.stat;

		// Ajoutez les commandes M et V au path en fonction de la couleur de la barre
		if (card.variant === "Normale") {
			pathDataRed += `M${x} ${y} V${y + height} `;
		} else if (card.variant === "Holographique") {
			pathDataYellow += `M${x} ${y} V${y + height} `;
			// Ajoutez l'étiquette sous l'axe des zéros pour les cartes holographiques
			const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
			text.setAttribute("x", x + width / 2);
			text.setAttribute("y", ref + 20);
			text.setAttribute("text-anchor", "middle");
			text.textContent = card.name;
			svg.appendChild(text);
		} else if (card.variant === "E-X Card") {
			pathDataPurple += `M${x} ${y} V${y + height} `;
		}

		x += width;
	}

	// Créez les trois paths
	const pathRed = document.createElementNS("http://www.w3.org/2000/svg", "path");
	pathRed.setAttribute("d", pathDataRed);
	pathRed.setAttribute("fill", "none");
	pathRed.setAttribute("stroke", "red");
	pathRed.setAttribute("stroke-width", "9");
	svg.appendChild(pathRed);

	const pathYellow = document.createElementNS("http://www.w3.org/2000/svg", "path");
	pathYellow.setAttribute("d", pathDataYellow);
	pathYellow.setAttribute("fill", "none");
	pathYellow.setAttribute("stroke", "yellow");
	pathYellow.setAttribute("stroke-width", "9");
	svg.appendChild(pathYellow);

	const pathPurple = document.createElementNS("http://www.w3.org/2000/svg", "path");
	pathPurple.setAttribute("d", pathDataPurple);
	pathPurple.setAttribute("fill", "none");
	pathPurple.setAttribute("stroke", "purple");
	pathPurple.setAttribute("stroke-width", "9");
	svg.appendChild(pathPurple);

	// Ajoutez le SVG à la page
	document.body.appendChild(svg);


}