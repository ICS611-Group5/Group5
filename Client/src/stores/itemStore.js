import { defineStore } from 'pinia';
import axios from 'axios';

export const useItemStore = defineStore('itemStore', {
    state: () => ({
        items: [],
        newItem: { name: '', price: 0, description: '' },
        mostExpensiveItem: null,
        cheapestItem: null,
    }),
    actions: {
        async fetchItems() {
            try {
                const response = await axios.get('http://localhost:5001/api/items');
                this.items = response.data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async addItem() {
            try {
                const response = await axios.post('http://localhost:5001/api/items', this.newItem);
                this.items.push(response.data);
                this.newItem = { name: '', price: 0, description: '' };
            } catch (error) {
                console.error('Error adding item:', error);
            }
        },
        async editItem(item) {
            try {
                const response = await axios.put(`http://localhost:5001/api/items/${item._id}`, item);
                const index = this.items.findIndex(i => i._id === item._id);
                if (index !== -1) {
                    this.items[index] = response.data;
                }
            } catch (error) {
                console.error('Error editing item:', error);
            }
        },
        async deleteItem(id) {
            try {
                await axios.delete(`http://localhost:5001/api/items/${id}`);
                this.items = this.items.filter(item => item._id !== id);
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        },
        async deleteAllItems() {
            try {
                const response =await axios.delete('http://localhost:5001/api/items');
                this.items = [];
            } catch (error) {
                console.error('Error deleting all items:', error);
            }
        },
        async bulkUpload(file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('http://localhost:5001/api/bulk-upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                await this.fetchItems();
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        },
        async fetchMostExpensiveItem() {
            try {
                const response = await axios.get('http://localhost:5001/api/items/most-expensive');
                this.mostExpensiveItem = response.data;
            } catch (error) {
                console.error('Error fetching most expensive item:', error);
            }
        },
        async fetchCheapestItem() {
            try {
                const response = await axios.get('http://localhost:5001/api/items/cheapest');
                this.cheapestItem = response.data;
            } catch (error) {
                console.error('Error fetching cheapest item:', error);
            }
        },
    },
});