const express = require('express');
const router = express.Router();
const Item = require('../models/Items');

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

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
