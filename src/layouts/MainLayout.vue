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

    <q-page-container style="padding-top: 0px">
      <q-page class="q-pa-md">
        <q-row class="q-col-gutter-md">
          <q-col cols="12" sm="6" v-for="carte in cartes" :key="carte.id">
            <img
              v-if="carte.possedee"
              :src="`/NikocardZ/cards/carte${carte.id}.png`"
              class="full-size-image"
            />
            <img
              v-else
              src="/NikocardZ/cards/cardzinconnu.png"
              class="full-size-image"
            />
            <q-tooltip
              class="custom-tooltip"
              anchor="top middle"
              self="center middle"
            >
              {{ carte.nb }}
            </q-tooltip>
          </q-col>
        </q-row>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
.q-page-container custom-page {
  min-height: 0px;
}

.full-size-image {
  width: 25%; /* Les images rempliront la largeur de la colonne */
  height: auto; /* Pour garder les proportions de l'image */
  max-height: 80vh; /* Empêche l'image de dépasser la hauteur de l'écran */
}

.custom-tooltip {
  font-size: 1.9em; /* Augmenter la taille du texte */
  padding: 25px; /* Augmenter le padding pour un plus grand tooltip */
}
</style>
<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const collections = ref([
  { userId: 'user1', nom: 'A', cartes: [1, 13, 13, 12] },
  { userId: 'user1', nom: 'Alice2', cartes: [13] },
  { userId: 'user2', nom: 'Bob', cartes: [2, 3, 7, 12, 15] },
]);

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

// Définir les cartes de base
const cartes = ref(
  Array.from({ length: 45 }, (_, i) => ({
    id: i + 1,
    possedee: false,
    nb: 0,
  }))
);

watch(
  collectionsFiltrees,
  (nouvellesCollections) => {
    // Réinitialiser les états de toutes les cartes
    cartes.value.forEach((carte) => {
      carte.possedee = false;
      carte.nb = 0; // Réinitialiser le nombre de cartes possédées
    });

    // Si une collection est trouvée, mettre à jour les cartes possédées et leur quantité
    if (nouvellesCollections.length > 0) {
      const collectionTrouvee = nouvellesCollections[0];

      collectionTrouvee.cartes.forEach((idCarte) => {
        // Trouver et mettre à jour la carte correspondante
        const carte = cartes.value.find((carte) => carte.id === idCarte);
        if (carte) {
          carte.possedee = true;
          // Supposons que chaque ID de carte dans la collection représente une carte possédée
          carte.nb += 1;
        }
      });
    }
  },
  { immediate: true }
);

defineOptions({
  name: 'MainLayout',
});
</script>
