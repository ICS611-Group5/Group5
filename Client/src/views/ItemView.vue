<script setup>
import { ref, onMounted } from 'vue';
import { useItemStore } from '@/stores/itemStore';
import { QBtn } from 'quasar';
import BulkUploadForm from "@/components/BulkUploadForm.vue";
import EditItemModal from "@/components/EditItemModal.vue";
import AddItemModal from "@/components/AddItemModal.vue";
import DataTable from "@/components/DataTable.vue";
import ItemDetailsModal from "@/components/ItemDetailsModal.vue";

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
  { name: 'description', align: 'left', label: 'Description', field: 'description', sortable: true, style: 'width: 30vw;' },
  { name: 'actions', align: 'left', label: 'Actions', field: 'actions', style: 'width: 20vw;' }
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
  <div class="container">
    <div class="header">
      <h1>Items Available</h1>
    </div>
    <div class="table-container">
      <DataTable
          :show-search="true"
          class="table"
          :rows="itemStore.items"
          :columns="columns"
          row-key="name"
      >
        <template v-slot:body-cell-actions="props">
          <q-btn flat round icon="edit" @click="openEditModal(props.row)" />
          <q-btn flat round icon="delete" color="red" @click="itemStore.deleteItem(props.row._id)" />
        </template>
      </DataTable>
    </div>
    <div class="button-container">
      <q-btn label="Add New Item" @click="openAddModal" />
      <BulkUploadForm ref="bulkUploadModalRef" @upload-success="itemStore.fetchItems" />
      <q-btn label="Delete All Items" color="red" @click="deleteAllItems" />
      <q-btn label="Most Expensive Item" @click="fetchMostExpensiveItem" />
      <q-btn label="Cheapest Item" @click="fetchCheapestItem" />
    </div>
    <ItemDetailsModal ref="itemDetailsModalRef" />
    <EditItemModal ref="editModalRef" />
    <AddItemModal ref="addModalRef" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10px;
}

.header {
  padding-bottom: 5px;
}

.table-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.button-container {
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 10px;
  left: 10px;
  right: 10px;
  padding: 10px;
  border-top: 1px solid #ccc;
}

.table {
  width: 100%;
}

.item-info {
  margin-top: 20px;
}
</style>