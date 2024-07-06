const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Add item to cart
router.post('/', async (req, res) => {
    const { itemID, userID, image, name, price } = req.body;

    try {
        const newCartItem = new Cart({ itemID, userID, image, name, price });
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

// Delete one item from cart
router.delete('/:itemId', async (req, res) => {
    const { itemId } = req.params;

    try {
        const deletedItem = await Cart.findOneAndDelete({ _id: itemId });

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        res.status(200).json({ message: 'Item deleted successfully', deletedItem });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
// Delete one item from cart by userID
router.delete('/delete/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedItem = await Cart.deleteMany({ userID: userId });

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        res.status(200).json({ message: 'Item deleted successfully', deletedItem });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
