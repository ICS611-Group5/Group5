<script setup>
import { ref, defineExpose } from 'vue';
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar';

const isModalOpen = ref(false);
const itemDetails = ref(null);

const openModal = (item) => {
  itemDetails.value = { ...item };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  itemDetails.value = null;
};

defineExpose({ openModal });
</script>

<template>
  <q-dialog v-model="isModalOpen">
    <q-card>
      <q-card-section>
        <h3>Item Details</h3>
        <p><strong>Name:</strong> {{ itemDetails.name }}</p>
        <p><strong>Price:</strong> {{ itemDetails.price }}</p>
        <p><strong>Description:</strong> {{ itemDetails.description }}</p>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Close" color="negative" @click="closeModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
</style>