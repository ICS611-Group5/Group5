<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { QTable, QBtn } from 'quasar';

const items = ref([]);
const newItem = ref({ name: '', price: 0, description: '' });

onMounted(async () => {
  await fetchItems();
});

const fetchItems = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/items');
    items.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const addItem = async () => {
  try {
    const response = await axios.post('http://localhost:5001/api/items', newItem.value);
    items.value.push(response.data);
    newItem.value = { name: '', price: 0, description: '' };
  } catch (error) {
    console.error('Error adding item:', error);
  }
};

const editItem = async (item) => {
  // Implement the logic to edit the item
  console.log('Edit item:', item);
};

const deleteItem = async (id) => {
  try {
    await axios.delete(`http://localhost:5001/api/items/${id}`);
    items.value = items.value.filter(item => item._id !== id);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

const columns = [
  { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true },
  { name: 'price', align: 'center', label: 'Price', field: 'price', sortable: true },
  { name: 'description', align: 'left', label: 'Description', field: 'description', sortable: true },
  { name: 'actions', align: 'center', label: 'Actions', field: 'actions' }
];
</script>

<template>
  <v-row>
    <v-col cols="12">
      <h1 class="py-20">Items</h1>
      <div class="ingredient-container" style="padding: 20px 0;">
        <q-table
            title="Items Available"
            :rows="items"
            :columns="columns"
            row-key="name"
        >
          <template v-slot:body-cell-actions="props">
            <q-btn flat round icon="edit" @click="editItem(props.row)" />
            <q-btn flat round icon="delete" color="red" @click="deleteItem(props.row._id)" />
          </template>
        </q-table>
      </div>
      <h2>Add New Item</h2>
      <form @submit.prevent="addItem">
        <input v-model="newItem.name" placeholder="Name" required />
        <input v-model="newItem.price" type="number" placeholder="Price" required />
        <input v-model="newItem.description" placeholder="Description" />
        <button type="submit">Add Item</button>
      </form>
    </v-col>
  </v-row>
</template>