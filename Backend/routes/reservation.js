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


//find by user id
router.get('/byuser/:userID', async (req, res) => {
  try {
    const item = await reservation.find({ userID: req.params.userID });
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


router.get('/', async (req, res) => {
  try {
    const item = await reservation.find();
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


router.put('/:id', async (req, res) => {
  try {
      const user = await reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


module.exports = router;
