<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>NikoCardz</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <!-- Barre de recherche -->
      <q-input
        filled
        v-model="searchTerm"
        placeholder="Rechercher une collection..."
      />
    </q-page-container>

    <q-page-container style="padding-top: 10px">
      <q-page class="q-gutter-x-md">
        <q-col v-for="carte in DisplayCards" :key="carte.id">
          <img
            :src="`/NikocardZ/cards/${carte.name}.png`"
            class="full-size-image"
            @click="toggleFullScreen($event)"
          />
          <q-tooltip
            class="custom-tooltip"
            anchor="top middle"
            self="center middle"
          >
            {{ carte.nb }}
          </q-tooltip>
        </q-col>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
.q-page-container custom-page {
  min-height: 0px;
}

.full-size-image {
  width: 14%; /* Les images rempliront la largeur de la colonne */
  height: auto; /* Pour garder les proportions de l'image */
  max-height: 80vh; /* Empêche l'image de dépasser la hauteur de l'écran */
}

.clickable-image {
  cursor: pointer;
  width: 100%; /* Adjust this to fit your layout */
}

.custom-tooltip {
  font-size: 1.7em; /* Augmenter la taille du texte */
  padding: 18px; /* Augmenter le padding pour un plus grand tooltip */
}
</style>
<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

const collections = ref([
  {
    nom: 'personne',
    cartes: [1],
    nb: [1],
  },
]);

interface CardData {
  carte: number[];
  nb: number[];
}

interface UserCards {
  [username: string]: CardData;
}

// Fonction pour charger les données JSON -----------------------------------------------------------
async function loadData() {
  try {
    const response = await fetch('/Python/dist/users_cards.json');
    if (!response.ok) throw new Error('Failed to fetch data');
    const jsonData: UserCards = await response.json();
    transformData(jsonData);
  } catch (error) {
    console.error('Error fetching JSON data:', error);
  }
}
function transformData(data: UserCards) {
  const transformed = Object.entries(data).map(([username, { carte, nb }]) => ({
    nom: username,
    cartes: carte,
    nb: nb,
  }));
  collections.value = transformed;
}
onMounted(loadData);
// Fonction pour charger les données JSON -----------------------------------------------------------

const searchTerm = ref('');
// Computed property pour filtrer les collections
const collectionsFiltrees = computed(() => {
  if (!searchTerm.value) {
    return [];
  }
  return collections.value.filter(
    (collection) =>
      collection.nom.toLowerCase() === searchTerm.value.toLowerCase()
  );
});

function getCards(id: number) {
  //const nameTemp = '/NikocardZ/cards/cardzinconnu';
  //const nameTemp = '/cards/cardzinconnu';
  if (id >= 16) return 7; // legendaire
  if (id >= 11) return 4; // rare
  return 1;
}

const DisplayCards = ref([
  {
    id: Number([]),
    name: String([]),
    nb: Number([]),
  },
]);

watch(
  collectionsFiltrees,
  (nouvellesCollections) => {
    DisplayCards.value = [];
    if (nouvellesCollections.length > 0) {
      const collectionTrouvee = nouvellesCollections[0];
      let j = 0;
      for (let i = 1; i <= 16; i++) {
        let idCarteInconnu = getCards(i);
        let idCarteInconnuHolo = Number(idCarteInconnu) + 1;
        let idCarteInconnuShiny = Number(idCarteInconnu) + 2;

        if (collectionTrouvee.cartes.includes(i)) {
          // Carte commune
          DisplayCards.value.push({
            id: i,
            name: String(i),
            nb: collectionTrouvee.nb[j],
          });

          // Carte Holographique
          if (collectionTrouvee.nb[j] >= 5) {
            // oui
            DisplayCards.value.push({
              id: i,
              name: String(i) + 'h',
              nb: Math.floor(collectionTrouvee.nb[j] / 5),
            });
          } else {
            // non
            DisplayCards.value.push({
              id: i,
              name: 'cache' + idCarteInconnuHolo,
              nb: collectionTrouvee.nb[j],
            });
          }

          j++;
          // Pas de carte Commune
        } else {
          DisplayCards.value.push({
            id: i,
            name: 'cache' + idCarteInconnu,
            nb: 0,
          });
          DisplayCards.value.push({
            id: i,
            name: 'cache' + idCarteInconnuHolo,
            nb: 0,
          });
        }

        // Carte Shiny
        if (collectionTrouvee.cartes.includes(i + 16)) {
          // oui
          DisplayCards.value.push({
            id: i,
            name: String(i) + 's',
            nb: Math.floor(collectionTrouvee.nb[j] / 5),
          });
        } else {
          // non
          DisplayCards.value.push({
            id: i,
            name: 'cache' + idCarteInconnuShiny,
            nb: 0,
          });
        }
      }
    } else {
      setDefaultDisplayCards();
    }
  },
  { immediate: true }
);

setDefaultDisplayCards();
function setDefaultDisplayCards() {
  DisplayCards.value = [];
  for (let i = 1; i < 17; i++) {
    let idCarteInconnu = getCards(i);
    let idCarteInconnuHolo = Number(idCarteInconnu) + 1;
    let idCarteInconnuShiny = Number(idCarteInconnu) + 2;

    DisplayCards.value.push({
      id: i,
      name: 'cache' + idCarteInconnu,
      nb: 0,
    });
    DisplayCards.value.push({
      id: i,
      name: 'cache' + idCarteInconnuHolo,
      nb: 0,
    });
    DisplayCards.value.push({
      id: i,
      name: 'cache' + idCarteInconnuShiny,
      nb: 0,
    });
  }
}

async function toggleFullScreen(event: MouseEvent) {
  const imgElement = event.target as HTMLImageElement; // Cast to HTMLImageElement
  if (!document.fullscreenElement) {
    try {
      imgElement.style.background = 'white'; // Ajoute un fond blanc (ou tout autre style)
      await imgElement.requestFullscreen();
    } catch (error) {
      console.error('Error attempting to enable full-screen mode:', error);
    }
  } else {
    if (document.exitFullscreen) {
      await document.exitFullscreen();
    }
  }
}

defineOptions({
  name: 'MainLayout',
});
</script>
