const express = require('express');
const router = express.Router();
const incomes  = require('../models/TotalIncome');

// Add item to cart
router.post('/', async (req, res) => {
  try {
      const { userID, income} = req.body;
      const item = new incomes({
        userID, income
      });

      const newItem = await item.save();

      res.status(200).json({ item: newItem });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});




router.get('/', async (req, res) => {
    const { from, to } = req.query;
    try {
      const data = await incomes.find({
        date: {
          $gte: new Date(from),
          $lte: new Date(to)
        }
      }).lean();
  
      const formattedData = data.map(item => ({
        ...item,
        date: new Date(item.date).toISOString()
      }));
  
      res.json(formattedData);
    } catch (err) {
      res.status(500).send(err.message);
    }
});



module.exports = router;
