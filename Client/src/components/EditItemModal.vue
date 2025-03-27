<script setup>
import { ref, defineExpose } from 'vue';
import { useItemStore } from '@/stores/itemStore';
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar';

const itemStore = useItemStore();
const isModalOpen = ref(false);
const editingItem = ref(null);

const openModal = (item) => {
  editingItem.value = { ...item };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  editingItem.value = null;
};

const saveItem = async () => {
  if (editingItem.value) {
    await itemStore.editItem(editingItem.value);
    closeModal();
  }
};

defineExpose({ openModal });
</script>

<template>
  <q-dialog v-model="isModalOpen">
    <q-card>
      <q-card-section>
        <h3>Edit Item</h3>
        <input v-model="editingItem.name" placeholder="Name" required />
        <input v-model="editingItem.price" type="number" placeholder="Price" required />
        <input v-model="editingItem.description" placeholder="Description" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="negative" @click="closeModal" />
        <q-btn flat label="Save" color="positive" @click="saveItem" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
</style>