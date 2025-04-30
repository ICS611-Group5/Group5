const express = require('express');
const router = express.Router();
const Item = require('./models/Item');
const csv = require('csv-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { startSession } = require("mongoose");

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Get all items
router.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new item
router.post('/items', async (req, res) => {
    try {
        const { name, price, description, quantity } = req.body;
        const newItem = new Item({ name, price, description, quantity });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get a single item by ID
router.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an item
router.put('/items/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an item
router.delete('/items/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete all items
router.delete('/items', async (req, res) => {
    try {
        await Item.deleteMany({});
        res.json({ message: 'All items deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Bulk upload items
router.post('/bulk-upload', upload.single('file'), async (req, res) => {
    try {
        const results = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => {
                data.quantity = parseInt(data.quantity, 10) || 0;
                results.push(data);
            })
            .on('end', async () => {
                await Item.insertMany(results);
                res.status(200).send('Bulk upload successful');
            });
    } catch (error) {
        console.error('Error during bulk upload:', error);
        res.status(500).send(error);
    }
});

// Fill order of items
router.post('/place-order', async (req, res) => {
    const session = await startSession();
    session.startTransaction();

    try {
        const { items } = req.body;

        for (const orderItem of items) {
            const item = await Item.findById(orderItem._id).session(session);
            if (item.quantity < orderItem.quantity) {
                throw new Error(`Insufficient quantity for item: ${item.name}`);
            }
            item.quantity -= orderItem.quantity;
            await item.save({ session });
        }

        await session.commitTransaction();
        await session.endSession();
        res.status(200).json({ message: 'Order placed successfully' });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;