const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Ensure the correct path and model name

// Create an item
router.post('/', async (req, res) => {
    try {
        const { name, description, price, type, version, image } = req.body;
        const item = new Item({
            name, description, price, type, version, image
        });

        const newItem = await item.save();

        res.status(201).json({ item: newItem });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get item by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findById(id);
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
