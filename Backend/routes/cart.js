const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Create an item
router.post('/', async (req, res) => {
    try {
        const { userID, itemID } = req.body;
        const item = new Cart({
            userID, itemID
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
        const items = await Cart.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
