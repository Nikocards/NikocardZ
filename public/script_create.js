const CLIENT_ID = 'kimne78kx3ncx6brgo4mv6wki5h1ko'; // s'te plait me kack pô :(
const WEBHOOK_DISCORD = "https://discord.com/api/webhooks/1239224649485914212/V1RSuCfZ6eVeEPvIftkkZlrCI2MUFR7i6vZVZPObhVRFyBZWqoUOBeBC8FuRsj0Izvk7"
const DEFAULT_AVATAR = "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_a2b08e2a08db40ff886c76a7220a59d1/default/light/4.0"
const BASE_IMAGE_URL = "public/cards/model.png"; // URL vers l'image du template

let cardName = "";

document.addEventListener("DOMContentLoaded", function() {

	const generateButton = document.getElementById("generateButton");
	const shareButton = document.getElementById("shareButton");
	const sendButton = document.getElementById("sendButton");
	const mainElement = document.querySelector("main");
	const pseudoInput = document.getElementById("pseudo");
	const avatarImg = document.getElementById('avatar'); // Récupérer l'élément de l'avatar
	const backButton = document.getElementById('goBack');
	const messageInput = document.getElementById('message');
	const bgColorInput = document.getElementById('bgColor');

	generateButton.addEventListener("click", generateCard);
	shareButton.addEventListener("click", () => {
		mainElement.classList = "share";
	});
	backButton.addEventListener("click", () => {
		mainElement.classList = "form";
	});
	sendButton.addEventListener("click", sendMessage);
	pseudoInput.addEventListener("focusout", checkAvatar);

	async function checkAvatar() {
		const pseudo = pseudoInput.value.trim(); // Récupérer la valeur du pseudo

		// Vérifier si le pseudo respecte le modèle /^[a-zA-Z0-9_]{4,25}$/
		if (/^[a-zA-Z0-9_]{4,25}$/.test(pseudo)) {
			// Si le pseudo est valide, construire l'URL de l'avatar correspondant
			avatarImg.src = (await fetchAvatar(pseudo)) || DEFAULT_AVATAR;
		} else {
			avatarImg.src = DEFAULT_AVATAR;
		}
	}

	async function fetchAvatar(username) {
		const query = JSON.stringify({
			query: `
				query GetUser($login: String!) {
					user(login: $login) {
						profileImageURL(width: 300)
					}
				}`,
			variables: { login: username }
		});

		try {
			const response = await fetch('https://gql.twitch.tv/gql', {
				method: 'POST',
				headers: {
					"Accept-Language": "en-US",
					Accept: "*/*",
					Authorization: void 0,
					'Content-Type': 'application/json',
					'Client-Id': CLIENT_ID
				},
				body: query
			});

			const responseData = await response.json();

			console.log('Twitch API Response:', response.status, responseData);

			if (response.status === 200 && responseData.data && responseData.data.user) {
				return responseData.data.user.profileImageURL;
			}
		} catch (error) {
			console.error('Error fetching avatar for user', username, ':', error);
			return DEFAULT_AVATAR;
		}
	}

	function sendMessage() {
		if(!pseudoInput.value.match(/.{1,40}/)) {
			pseudoInput.setCustomValidity("Veuillez saisir un pseudo valide");
			pseudoInput.reportValidity();
			return;
		}
		const confirmMessage = confirm("Es-tu sûr(e) que l'image te convient ?");

		if (!confirmMessage) {
			return;
		}
//~ '<:PopcornJoy:1012062551179264081> '
		let jsonData = {
			avatar_url: avatarImg.src,
			username: 'NikoCardZ 🂡',
			embeds: [{
				title: `${pseudoInput.value} a créé une nouvelle carte !`,
				description: messageInput.value,
				color: parseInt(bgColorInput.value.replace('#', ''), 16) || 15158332,
				author: {
					name: pseudoInput.value,
					icon_url: avatarImg.src
				},
				image: {
					url: `attachment://${(cardName || 'carte')}.png`
				}
			}]
		}

		// Créer un objet FormData pour envoyer le contenu du formulaire
		const formData = new FormData();
		formData.append("payload_json", JSON.stringify(jsonData));

		// Récupérer l'image en tant que fichier depuis l'élément img
		const imageDataURL = document.querySelector("#cardPreview img").src;
		const imageBlob = dataURLtoBlob(imageDataURL);
		formData.append("file", imageBlob, (cardName || 'carte') + ".png");

		// Envoyer le formulaire au webhook Discord
		fetch(WEBHOOK_DISCORD, {
			method: "POST",
			body: formData
		})
			.then(response => {
				if (response.ok) {
					mainElement.classList = "form";
					requestAnimationFrame(() => {
						alert("Message envoyé avec succès !");
					});
				} else {
					alert("Une erreur est survenue lors de l'envoi du message.");
				}
			})
			.catch(error => {
				console.error("Erreur lors de l'envoi du message :", error);
				alert("Une erreur est survenue lors de l'envoi du message.");
			});
	}

	// Convertir une URL de données en un objet Blob
	function dataURLtoBlob(dataURL) {
		const arr = dataURL.split(",");
		const mime = arr[0].match(/:(.*?);/)[1];
		const byteString = atob(arr[1]);
		let n = byteString.length;
		const u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = byteString.charCodeAt(n);
		}
		return new Blob([u8arr], { type: mime });
	}

	function loadImage(url) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = () => reject(new Error(`Failed to load image at ${url}`));
			img.src = url;
		});
	}

	function loadFont(fontFamily) {
		const font = new FontFaceObserver(fontFamily);
		return font.load();
	}

	function generateCard() {
		mainElement.classList = "process";

		const prog = document.querySelector('#mainLoad>div');
		prog.style.width = "1%";

		requestAnimationFrame(() => {
			const targetX = 12;  // Position X où l'image doit être dessinée
			const targetY = 259; // Position Y où l'image doit être dessinée
			const targetWidth = 1471; // Largeur du cadre
			const targetHeight = 1228; // Hauteur du cadre

			const name = document.getElementById('name').value;
			cardName = name.replace(/[^a-zA-Z0-9_]+/g, "-").replace(/--+/g, "-").replace(/(^-|-$)/g, "");
			let userImg;
			try {
				userImg = URL.createObjectURL(document.getElementById('image').files[0]);
			} catch(e) {
				document.getElementById('image').setCustomValidity("Veuillez choisir une image");
				document.getElementById('image').reportValidity();
				mainElement.classList = "form";
				return
			}
			const effect = document.getElementById('effet').value.match(/[^\n]+/g);
			const lore = document.getElementById('lore').value.match(/[^\n]+/g);
			const force = document.getElementById('force').value;
			const vie = document.getElementById('vie').value;
			const fitOption = document.querySelector('input[name="fit"]:checked').value;
			const effetDessin = document.getElementById('effetDessin').checked;

			prog.style.width = "2%";

			if(!/^.{1,25}$/.test(name)) {
				document.getElementById('name').reportValidity();
				mainElement.classList = "form";
				return;
			}
			if(!["0","1","2","3","4"].includes(force)) {
				document.getElementById('force').reportValidity();
				mainElement.classList = "form";
				return
			}
			if(!["0","1","2","3","4"].includes(vie)) {
				document.getElementById('vie').reportValidity();
				mainElement.classList = "form";
				return
			}
			if(!effect) {
				document.getElementById('effet').reportValidity();
				mainElement.classList = "form";
				return;
			}
			if(!lore) {
				document.getElementById('lore').reportValidity();
				mainElement.classList = "form";
				return;
			}

			const resources = [
				loadImage('public/create/fond.png'),
				loadImage('public/create/masque.png'),
				loadImage(`public/create/F${force}.png`),
				loadImage(`public/create/V${vie}.png`),
				loadImage(userImg)
			];

			prog.style.width = "3%";

			Promise.all(resources).then(values => {
				prog.style.width = "10%";
				const [background, masque1, masque2, masque3, userImage] = values;

				// Tous vos chargements sont terminés, continuez à utiliser les ressources ici
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');
				canvas.width = 1495;
				canvas.height = 2062;

				requestAnimationFrame(step1);

				function step1() {
					// Fond
					ctx.drawImage(background, 0, 0);

					// Nom de la carte
					const name = document.getElementById('name').value
					ctx.fillStyle = '#fff5ed';
					ctx.fillRect(80, 90, 40 * name.length, 70);

					ctx.font = '96px "Caveat Brush"';
					ctx.textAlign = 'left';
					ctx.fillStyle = '#dfc5b7';
					ctx.fillText(name, 86, 166); // Ombre
					ctx.fillStyle = '#000000';
					ctx.fillText(name, 80, 160); // Text

					prog.style.width = effetDessin ? "15%" : "25%";
					requestAnimationFrame(step2);
				}

				function step2() {
					// Image de l'utilisateur
					let sx, sy, sWidth, sHeight; // Source clipping parameters
					let dx, dy, dWidth, dHeight; // variables pour dimensionner et positionner l'image

					// Couleur de fond pour l'image
					ctx.fillStyle = bgColorInput.value.toString(16);
					console.log( bgColorInput.value)
					ctx.fillRect(targetX, targetY, targetWidth, targetHeight);

					switch (fitOption) {
						case 'stretch':
							// Étirer l'image pour remplir le cadre
							dx = targetX;
							dy = targetY;
							dWidth = targetWidth;
							dHeight = targetHeight;
							ctx.drawImage(userImage, dx, dy, dWidth, dHeight);
							break;
						case 'adapt':
							// Adapter (recadrer pour correspondre puis étirer)
							let srcRatio = userImage.width / userImage.height;
							let targetRatio = targetWidth / targetHeight;
							if (srcRatio > targetRatio) {
								// L'image est trop large. Recadrer horizontalement
								sHeight = userImage.height;
								sWidth = userImage.height * targetRatio;
								sx = (userImage.width - sWidth) / 2;
								sy = 0;
							} else {
								// L'image est trop haute. Recadrer verticalement
								sWidth = userImage.width;
								sHeight = userImage.width / targetRatio;
								sx = 0;
								sy = (userImage.height - sHeight) / 2;
							}
							dx = targetX;
							dy = targetY;
							dWidth = targetWidth;
							dHeight = targetHeight;
							ctx.drawImage(userImage, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
							break;
						case 'center':
							// Adapter l'image pour qu'elle tienne dans le cadre sans déformation
							const ratio = Math.min(targetWidth / userImage.width, targetHeight / userImage.height);
							dWidth = userImage.width * ratio;
							dHeight = userImage.height * ratio;
							dx = targetX + (targetWidth - dWidth) / 2;
							dy = targetY + (targetHeight - dHeight) / 2;
							ctx.drawImage(userImage, dx, dy, dWidth, dHeight);
							break;
					}

					prog.style.width = effetDessin ? "20%" : "40%";
					requestAnimationFrame(step3);
				}

				function step3() {
					// Appliquer l'effet de réduction des couleurs directement sur cette zone du canvas
					if(effetDessin) {
						reduceColors(ctx, targetX, targetY, targetWidth, targetHeight, 60); // Utiliser par exemple 32 couleurs
					} else {
						prog.style.width = "70%";
						requestAnimationFrame(step4);
					}
				}

				function step4() {
					// Effet
					ctx.font = 'bold 72px Playball';
					ctx.textAlign = 'center';
					for(let i = 0; i < effect.length && i < 3; i++) {
						ctx.fillStyle = '#ffbe7c';
						ctx.fillText(effect[i], 752, (effect.length < 3 ? 1604 : 1572) + 80*i, i == 0 ? 1400 : 800, 100); // Ombre
						ctx.fillStyle = '#000000';
						ctx.fillText(effect[i], 748, (effect.length < 3 ? 1600 : 1568) + 80*i, i == 0 ? 1400 : 800, 100); // Texte
					}
					// Lore
					ctx.font = '64px Playball';
					ctx.textAlign = 'center';
					for(let i = 0; i < lore.length && i < 2; i++) {
						ctx.fillStyle = '#ffbe7c';
						ctx.fillText(lore[i], 762, (lore.length < 3 ? 1854 : 1824) + 72*i, 700, 100); // Ombre
						ctx.fillStyle = '#000000';
						ctx.fillText(lore[i], 758, (lore.length < 3 ? 1850 : 1820) + 72*i, 700, 100); // Texte
					}

					prog.style.width = effetDessin ? "90%" : "80%";
					requestAnimationFrame(step5);
				}
				function step5() {
					ctx.drawImage(masque1, 0, 0);
					ctx.drawImage(masque2, 0, 1662);
					ctx.drawImage(masque3, 1095, 1662);

					prog.style.width = effetDessin ? "95%" : "90%";
					requestAnimationFrame(step6);
				}
				function step6() {
					const cardImageURL = canvas.toDataURL('image/png');
					document.getElementById('cardPreview').innerHTML = `<img src="${cardImageURL}" />`;  // Afficher l'image générée
					mainElement.classList = "form newcard";
				}

				function reduceColors(ctx, x, y, width, height, numColors) {
					let imageData = ctx.getImageData(x, y, width, height);
					let data = imageData.data;

					prog.style.width = "22%";
					requestAnimationFrame(() => {
						// Step 1: Calculate color frequency
						let colorFreq = {};
						for (let i = 0; i < data.length; i += 4) {
							if(data[i + 3] == 255) {
								let color = `${data[i] >> 4},${data[i + 1] >> 4},${data[i + 2] >> 4}`;
								if(!colorFreq[color]) {
									const group = "" + (data[i] >> 6).toString(16) + (data[i + 1] >> 6).toString(16) + (data[i + 2] >> 6).toString(16);
									colorFreq[color] = {freq: 0, group};
								}
								colorFreq[color].freq += 1;
							}
						}

						prog.style.width = "24%";
						requestAnimationFrame(() => {
							// Step 2: Group colors into clusters
							let colors = Object.keys(colorFreq);

							if (colors.length <= numColors) {
								// Si la liste est trop petite, nous avons déjà le bon nombre de couleurs et nous pouvons quitter
								requestAnimationFrame(step4);
								return;
							}
							let freqs = Object.values(colorFreq).sort((a, b) => b.freq - a.freq); // Trier les entrées par fréquence

							let thresholdFreq = freqs[numColors - 1].freq; // Déterminer le seuil à partir de la numColors-ème entrée dans la liste
							console.log(thresholdFreq)

							prog.style.width = "26%";
							requestAnimationFrame(() => {
								// Regrouper les couleurs en utilisant le seuil
								let clusters = [];
								for (let color of colors) {
									const {freq, group} = colorFreq[color];
									if (freq > thresholdFreq) {
										// Si la fréquence de la couleur est supérieure ou égale au seuil, ajouter cette couleur au cluster actuel
										if(!clusters[group]) clusters[group] = [];
										clusters[group].push(color);
									}
								}
								console.log(clusters)

								// Step 3 & 4: Assign each pixel to the nearest cluster
								let i = 0;
								processPixel();

								function processPixel() {
									while(i < data.length) {
										if(data[i + 3] == 255) {
											let color = `${data[i] >> 4},${data[i + 1] >> 4},${data[i + 2] >> 4}`;
											const group = "" + (data[i] >> 6).toString(16) + (data[i + 1] >> 6).toString(16) + (data[i + 2] >> 6).toString(16);
											let nearestCluster = findNearestCluster(color, clusters[group]);

											data[i] = nearestCluster[0] | nearestCluster[0] << 4;    // Red
											data[i + 1] = nearestCluster[1] | nearestCluster[1] << 4; // Green
											data[i + 2] = nearestCluster[2] | nearestCluster[2] << 4; // Blue
										} else {
											data[i] = 0;
											data[i + 1] = 0;
											data[i + 2] = 0;
											data[i + 3] = 0;
										}

										i += 4;
										if(i%(1 << 16) == 0) break;
									}
									if(i < data.length) {
										prog.style.width = "" + Math.round(300 + 600 * i / data.length)/10 + "%";
										requestAnimationFrame(processPixel);
									} else {
										ctx.putImageData(imageData, x, y);
										requestAnimationFrame(step4);
									}
								}
							})
						})
					})

					function findNearestCluster(color, clusters) {
						let rgb = color.split(',').map(Number);
						if(clusters == undefined || clusters.length == 0) {
							rgb[0] = (rgb[0] & 12) | (rgb[0] >> 2);
							rgb[1] = (rgb[1] & 12) | (rgb[1] >> 2);
							rgb[2] = (rgb[2] & 12) | (rgb[2] >> 2);
							return rgb;
						}
						if(clusters.includes(color)) return rgb;

						let minDistance = Infinity;
						let nearestCluster = null;

						for (let cluster of clusters) {
							let clusterColor = cluster.split(',').map(Number);
							let distance = colorDistance(rgb, clusterColor);

							if (distance < minDistance) {
								minDistance = distance;
								nearestCluster = clusterColor;
							}
		 					if(minDistance < 4) break;
						}
						return nearestCluster;
					}

					function colorDistance(color1, color2) {
						let r1 = color1[0];
						let g1 = color1[1];
						let b1 = color1[2];

						let r2 = color2[0];
						let g2 = color2[1];
						let b2 = color2[2];

						let dr = r1 - r2;
						let dg = g1 - g2;
						let db = b1 - b2;

						let d = r1 + g1 + b1 - r2 - g2 - b2;

						return (dr * dr + dg * dg + db * db + d * d);
					}
				}
			}).catch(error => {
				console.error('Failed to load one or more resources:', error);
				mainElement.classList = "form";
			});
		});
	}
});
