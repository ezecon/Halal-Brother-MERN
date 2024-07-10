const express = require('express');
const router = express.Router();
const Discount = require('../models/Discount');

// Add a discount
router.post('/', async (req, res) => {
  const { image } = req.body;

  try {
    const newDiscount = new Discount({ image });
    await newDiscount.save();
    res.status(201).json(newDiscount);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all discounts
router.get('/', async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.status(200).json(discounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a discount
router.delete('/:itemId', async (req, res) => {
  const { itemId } = req.params;

  try {
    const deletedItem = await Discount.findOneAndDelete({ _id: itemId });

    if (!deletedItem) {
      return res.status(404).json({ message: 'Discount not found' });
    }

    res.status(200).json({ message: 'Discount deleted successfully', deletedItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
