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


module.exports = router;
