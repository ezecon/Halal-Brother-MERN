const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    itemID:{
        type: String,
        require: true,
    },
    image:{
        type: String,
        require: true
    },
   
    name:{
        type: String,
        require: true
    },
   
    price:{
        type: Number,
        require: true
    },
    userID:{
        type: String,
        require: true,
    },
    user:{
        type: String,
        default:'Customer',
    },
    date:{
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('cart', cartSchema);