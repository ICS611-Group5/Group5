<script setup>
import { ref } from 'vue';
import { useItemStore } from '@/stores/itemStore';
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar';

const itemStore = useItemStore();
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const addItem = async () => {
  await itemStore.addItem();
  closeModal();
};

defineExpose({ openModal });
</script>

<template>
  <q-dialog v-model="isModalOpen">
    <q-card>
      <q-card-section>
        <h3>Add New Item</h3>
        <input v-model="itemStore.newItem.name" placeholder="Name" required />
        <input v-model="itemStore.newItem.price" type="number" placeholder="Price" required />
        <input v-model="itemStore.newItem.description" placeholder="Description" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="negative" @click="closeModal" />
        <q-btn flat label="Add" color="positive" @click="addItem" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
</style>