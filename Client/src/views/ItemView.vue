<script setup>
import { ref, onMounted } from 'vue';
import { useItemStore } from '@/stores/itemStore';
import { QBtn, QTable } from 'quasar';
import BulkUploadForm from "@/components/BulkUploadForm.vue";
import EditItemModal from "@/components/EditItemModal.vue";
import AddItemModal from "@/components/AddItemModal.vue";
import DataTable from "@/components/DataTable.vue";
import ItemDetailsModal from "@/components/ItemDetailsModal.vue";
import OrderForm from "@/components/OrderForm.vue";

const itemStore = useItemStore();
const editModalRef = ref(null);
const addModalRef = ref(null);
const bulkUploadModalRef = ref(null);
const itemDetailsModalRef = ref(null);

onMounted(async () => {
  await itemStore.fetchItems();
});

const columns = [
  { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true, style: 'width: 30vw;' },
  { name: 'price', align: 'center', label: 'Price', field: 'price', sortable: true, style: 'width: 25vw;' },
  { name: 'quantity', label: 'Available', align: 'center', field: 'quantity', sortable: true, style: 'width: 25vw;' },
  { name: 'description', align: 'left', label: 'Description', field: 'description', sortable: true, style: 'width: 30vw;' },
  { name: 'actions', align: 'left', label: 'Actions', field: 'actions', style: 'width: 20vw;' },
  { name: 'orderedQty', label: 'In\\ Order', align: 'center', field: (row) =>
    {const orderedItem = itemStore.orderList.find(o => o._id === row._id);
      return orderedItem ? orderedItem.quantity : 0;
    }, sortable: true},
];

const openEditModal = (item) => {
  editModalRef.value.openModal(item);
};

const openAddModal = () => {
  addModalRef.value.openModal();
};

const deleteAllItems = async () => {
  await itemStore.deleteAllItems();
};

const openBulkUploadModal = () => {
  bulkUploadModalRef.value.openModal();
};

const fetchMostExpensiveItem = async () => {
  await itemStore.fetchMostExpensiveItem();
  itemDetailsModalRef.value.openModal(itemStore.mostExpensiveItem);
};

const fetchCheapestItem = async () => {
  await itemStore.fetchCheapestItem();
  itemDetailsModalRef.value.openModal(itemStore.cheapestItem);
};
</script>

<template>
  <div class="h-screen">
    <div>
      <h1 class="py-20">Items Available</h1>

      <div class="ingredient-container" style="padding: 20px 0;">
        <q-table
            :rows="itemStore.items"
            :columns="columns"
            :rows-per-page-options="[10, 25, 50, 100]"
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
        <br>
        <form @submit.prevent="itemStore.addItem">
          <q-input dense outline v-model="itemStore.newItem.name" placeholder="Name" required />
          <q-input dense outline v-model="itemStore.newItem.price" type="number" placeholder="Price" required />
          <q-input dense outline v-model="itemStore.newItem.description" placeholder="Description" />
          <q-input dense outline v-model="itemStore.newItem.quantity" placeholder="Quantity" />
          <q-btn type="submit">Add Item</q-btn>
        </form>
        <br>
        <BulkUploadForm @upload-success="itemStore.fetchItems" />
      </template>
      <template v-else>
        <OrderForm />
      </template>
    </div>
  </div>
</template>