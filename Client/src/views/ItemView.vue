<script setup>
import { ref, onMounted } from 'vue';
import { useItemStore } from '@/stores/itemStore';
import { QTable, QBtn } from 'quasar';
import BulkUploadForm from "@/components/BulkUploadForm.vue";

const itemStore = useItemStore();

onMounted(async () => {
  await itemStore.fetchItems();
});

const columns = [
  { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true },
  { name: 'price', align: 'center', label: 'Price', field: 'price', sortable: true },
  { name: 'description', align: 'left', label: 'Description', field: 'description', sortable: true },
  { name: 'actions', align: 'left', label: 'Actions', field: 'actions' }
];
</script>

<template>
  <v-row class="h-screen">
    <v-col cols="12">
      <h1 class="py-20">Items Available</h1>
      <div class="ingredient-container" style="padding: 20px 0;">
        <q-table
            :rows="itemStore.items"
            :columns="columns"
            row-key="name"
            binary-state-sort>
          <template v-slot:body-cell-actions="props">
            <q-btn flat round icon="edit" @click="itemStore.editItem(props.row)" />
            <q-btn flat round icon="delete" color="red" @click="itemStore.deleteItem(props.row._id)" />
          </template>
        </q-table>
      </div>
      <h2>Add New Item</h2>
      <form @submit.prevent="itemStore.addItem">
        <input v-model="itemStore.newItem.name" placeholder="Name" required />
        <input v-model="itemStore.newItem.price" type="number" placeholder="Price" required />
        <input v-model="itemStore.newItem.description" placeholder="Description" />
        <button type="submit">Add Item</button>
      </form>
      <BulkUploadForm @upload-success="itemStore.fetchItems" />
    </v-col>
  </v-row>
</template>