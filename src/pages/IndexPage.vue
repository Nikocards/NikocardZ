<template>
  <q-page class="row items-center justify-evenly"> </q-page>
  <h1>HOHO</h1>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';

defineOptions({
  name: 'IndexPage',
});

const meta = ref<Meta>({
  totalCount: 12,
});
</script>
