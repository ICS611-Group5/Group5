<script setup>
import { ref } from 'vue';
import { useItemStore } from '@/stores/itemStore';
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar';
import {useSettingsStore} from "@/stores/settings.js";

const itemStore = useItemStore();
const settingsStore = useSettingsStore();
const file = ref(null);
const isModalOpen = ref(false);

const handleFileUpload = (event) => {
  const selectedFile = event.target?.files[0];
  if (selectedFile) {
    file.value = selectedFile;
  } else {
    console.error('No file selected');
  }
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const uploadFile = async () => {
  if (!file.value) {
    alert('Please select a file to upload');
    return;
  }

  try {
    await itemStore.bulkUpload(file.value);
    alert('File uploaded successfully');
    closeModal();
  } catch (error) {
    console.error('Error uploading file:', error);
    alert('Error uploading file');
  }
};

const deleteAll = async () => {
  try {
    await itemStore.deleteAllItems();
    alert('Items deleted successfully');
    await itemStore.fetchItems();
  } catch (error) {
    console.error('Error deleting items:', error);
    alert('Error deleting items');
  }
};
</script>

<template>
  <div>
    <h2>Bulk Upload Items</h2>
    <br>
    <q-btn @click="openModal" label="Upload" />
    <q-btn v-if="settingsStore.darkMode" text-color="red-14" color="grey-10" @click="deleteAll" label="Delete All" />
    <q-btn v-else text-color="negative" color="grey-13" @click="deleteAll" label="Delete All" />
    <q-dialog v-model="isModalOpen">
      <q-card>
        <q-card-section>
          <h3>Select a file to upload</h3>
          <label for="file-upload" class="custom-file-upload">
            Choose File
          </label>
          <input id="file-upload" type="file" @change="handleFileUpload" autofocus style="display: none;" />
          <span v-if="file">{{ file.name }}</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="negative" @click="closeModal" />
          <q-btn flat label="Upload" color="positive" @click="uploadFile" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>
.custom-file-upload {
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
}
.delete-btn {
  background-color: #4a4a4a; /* Dark grey */
  color: white; /* Text color */
}
</style>