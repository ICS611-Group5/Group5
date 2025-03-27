<script setup>
import { ref } from 'vue';
import { useItemStore } from '@/stores/itemStore';
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar';

const itemStore = useItemStore();
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
    console.log('Uploading file...');
    await itemStore.bulkUpload(file.value);
    alert('File uploaded successfully');
    closeModal();
  } catch (error) {
    console.error('Error uploading file:', error);
    alert('Error uploading file');
  }
};
</script>

<template>
  <div>
    <q-btn @click="openModal" label=" Bulk Upload" />
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
</style>