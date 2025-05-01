<script setup>
import { ref } from 'vue';
import { useItemStore } from '@/stores/itemStore';
import { QDialog, QCard, QCardSection, QCardActions, QBtn, QItem, QItemSection, QList } from 'quasar';

const itemStore = useItemStore();
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const increaseQuantity = (item) => {
  itemStore.updateOrderQuantity(item._id, item.quantity + 1);
};

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    itemStore.updateOrderQuantity(item._id, item.quantity - 1);
  }
};

const removeItem = (itemId) => {
  itemStore.removeFromOrderList(itemId);
};

const placeOrder = async () => {
  try {
    await itemStore.placeOrder();
    alert('Order placed successfully');
    closeModal();
  } catch (error) {
    console.error('Error placing order:', error);
    alert('Error placing order');
  }
};
const deleteAll = () => {
  itemStore.removeAllFromOrderList();
  closeModal();
};
</script>

<template>
  <div>
    <q-btn label="View Order List" @click="openModal" />
    <q-dialog v-model="isModalOpen" class="wide-modal">
      <q-card>
        <q-card-section>
          <h3>Your Order List</h3>

          <div v-if="itemStore.orderList.length">
            <q-list bordered separator>
              <q-item v-for="item in itemStore.orderList" :key="item._id" class="q-gutter-sm">
                <q-item-section>
                  <div class="text-subtitle1">{{ item.name }}</div>
                </q-item-section>

                <q-item-section class="text-center" style="min-width: 100px;">
                  ${{ item.price.toFixed(2) }}
                </q-item-section>

                <q-item-section side style="min-width: 160px;">
                  <div class="row items-center justify-center">
                    <q-btn dense flat round icon="remove" @click="decreaseQuantity(item)" />
                    <span class="q-mx-sm">{{ item.quantity }}</span>
                    <q-btn dense flat round icon="add" @click="increaseQuantity(item)" />
                  </div>
                </q-item-section>

                <q-item-section side style="min-width: 50px;">
                  <q-btn dense flat round icon="delete" color="red" @click="removeItem(item._id)" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div v-else class="text-center text-grey q-mt-md">Your order list is empty.</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="negative" @click="closeModal" />
          <q-btn flat outline label="Delete All" color="negative" @click="deleteAll" />
          <q-btn flat label="Place Order" color="positive" :disable="!itemStore.orderList.length" @click="placeOrder" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>


<style scoped>
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}

</style>