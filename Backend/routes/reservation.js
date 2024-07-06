const express = require('express');
const router = express.Router();
const reservation  = require('../models/reservation');

// Add item to cart
router.post('/', async (req, res) => {
  try {
      const { userID, time, seat, date, reason, query} = req.body;
      const item = new reservation({
        userID, time, seat, date, reason, query
      });

      const newItem = await item.save();

      res.status(200).json({ item: newItem });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


module.exports = router;
