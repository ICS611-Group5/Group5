const express = require('express');
const router = express.Router();
const Item = require('./models/Item');
const csv = require('csv-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

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

// Retrieve items by price range
router.get('/items/price/:min/:max', async (req, res) => {
    try {
        const items = await Item.find({ price: { $gte: req.params.min, $lte: req.params.max } });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Search items by keyword
router.get('/items/search/:keyword', async (req, res) => {
    try {
        const items = await Item.find({ $text: { $search: req.params.keyword } });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Count items
router.get('/items/count', async (req, res) => {
    try {
        const count = await Item.countDocuments();
        res.json(count);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get most expensive item
router.get('/items/most-expensive', async (req, res) => {
    try {
        const item = await Item.findOne().sort({ price: -1 });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get cheapest item
router.get('/items/cheapest', async (req, res) => {
    try {
        const item = await Item.findOne().sort({ price: 1 });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new item
router.post('/items', async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const newItem = new Item({ name, price, description });
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

// Get most recently added items
router.get('/items/recent', async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 }).limit(5);
        res.json(items);
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
                results.push(data);
            })
            .on('end', async () => {
                await Item.insertMany(results);
                res.status(200).send('Bulk upload successful');
            });
    } catch (error) {
        console.error('Error during bulk upload:', error); // Log error
        res.status(500).send(error);
    }
});

module.exports = router;


/*
sample output:
[
    { "name": "Wireless Headphones", "description": "Noise-canceling headphones", "price": 150 },
    { "name": "Tablet", "description": "10-inch display tablet", "price": 299 }
]
*/