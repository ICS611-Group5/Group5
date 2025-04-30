<script setup>
import { ref, onMounted } from 'vue';
import { useItemStore } from '@/stores/itemStore';
import { QTable, QBtn } from 'quasar';
import BulkUploadForm from "@/components/BulkUploadForm.vue";
import OrderForm from "@/components/OrderForm.vue";

const itemStore = useItemStore();

onMounted(async () => {
  await itemStore.fetchItems();
});

const columns = [
  { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true },
  { name: 'available', required: true, label: 'Available', align: 'left', field: row => row.quantity, format: val => `${val}`, sortable: true },
  { name: 'price', align: 'center', label: 'Price', field: 'price', sortable: true, format: val => `$ ${val}` },
  { name: 'description', align: 'left', label: 'Description', field: 'description', sortable: true },
  { name: 'actions', align: 'left', label: 'Actions', field: 'actions' },
  { name: 'orderedQty', label: 'In\\ Order', align: 'center', field: (row) =>
    {const orderedItem = itemStore.orderList.find(o => o._id === row._id);
      return orderedItem ? orderedItem.quantity : 0;
      }, sortable: true},
];
</script>

<template>
  <div class="h-screen">
    <div>
      <h1 class="py-20">Items Available</h1>
      <button @click="itemStore.toggleSuperUser">
        {{ itemStore.isSuperUser ? 'Switch to Non-SuperUser' : 'Switch to SuperUser' }}
      </button>
      <div class="ingredient-container" style="padding: 20px 0;">
        <q-table
            :rows="itemStore.items"
            :columns="columns"
            row-key="name"
            binary-state-sort>
          <template v-if="itemStore.isSuperUser" v-slot:body-cell-actions="props">
            <q-btn flat round icon="edit" @click="itemStore.editItem(props.row)" />
            <q-btn flat round icon="delete" color="red" @click="itemStore.deleteItem(props.row._id)" />
          </template>
          <template v-else v-slot:body-cell-actions="props">
            <q-btn flat round icon="add" @click="itemStore.addToOrderList(props.row)" />
          </template>
        </q-table>
      </div>
      <template v-if="itemStore.isSuperUser">
        <h2>Add New Item</h2>
        <form @submit.prevent="itemStore.addItem">
          <input v-model="itemStore.newItem.name" placeholder="Name" required />
          <input v-model="itemStore.newItem.price" type="number" placeholder="Price" required />
          <input v-model="itemStore.newItem.description" placeholder="Description" />
          <input v-model="itemStore.newItem.quantity" placeholder="Quantity" />
          <button type="submit">Add Item</button>
        </form>
        <BulkUploadForm @upload-success="itemStore.fetchItems" />
      </template>
      <template v-else>
        <OrderForm />
      </template>
    </div>
  </div>
</template>