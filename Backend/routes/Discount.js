const express = require('express');
const router = express.Router();
const Discount = require('../models/Discount');

// Add item to cart
router.post('/', async (req, res) => {
    const {  image,} = req.body;

    try {
        const newCartItem = new Discount({  image, });
        await newCartItem.save();
        res.status(201).json(newCartItem);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.delete('/:itemId', async (req, res) => {
    const { itemId } = req.params;

    try {
        const deletedItem = await Cart.findOneAndDelete({ _id: itemId });

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found in database' });
        }

        res.status(200).json({ message: 'discount deleted successfully', deletedItem });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});