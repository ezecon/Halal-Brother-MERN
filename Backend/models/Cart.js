const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    itemID:{
        type: String,
        require: true,
    },
    userID:{
        type: String,
        require: true,
    },
    status:{
        type: String,
        default:'IN'
    }
});

module.exports = mongoose.model('cart', cartSchema);