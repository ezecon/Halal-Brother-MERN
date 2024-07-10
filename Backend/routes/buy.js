const express = require('express');
const router = express.Router();
const Purchase  = require('../models/buy.js');

// Add item to cart
router.post('/', async (req, res) => {
  try {
      const { userID, products, totalPrice} = req.body;
      const item = new Purchase({
        userID, products, totalPrice
      });

      const newItem = await item.save();

      res.status(200).json({ item: newItem });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


//find by user
router.get('/', async (req, res) => {
  try {
    const item = await Purchase.find();
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Find by user ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Purchase.findById(req.params.id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});




//find by user id
router.put('/:id', async (req, res) => {
  try {

    const item = await Purchase.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
