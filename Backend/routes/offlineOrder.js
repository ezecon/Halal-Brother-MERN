const express = require('express');
const router = express.Router();
const offlineOrder  = require('../models/offlineOrder');

// Add item to cart
router.post('/', async (req, res) => {
  try {
      const { adminID, products, productsID, totalPrice} = req.body;
      const item = new offlineOrder({
        adminID, products, productsID, totalPrice
      });

      const newItem = await item.save();

      res.status(200).json({ item: newItem });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


//find all
router.get('/', async (req, res) => {
  try {
    const item = await offlineOrder.find();
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
