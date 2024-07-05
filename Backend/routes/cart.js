const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Add item to cart
router.post('/', async (req, res) => {
    const { itemID, userID } = req.body;

    try {
        const newCartItem = new Cart({ itemID, userID });
        await newCartItem.save();
        res.status(201).json(newCartItem);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get cart items for a user
router.get('/:userID', async (req, res) => {
    const { userID } = req.params;

    try {
        const cartItems = await Cart.find({ userID });
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
