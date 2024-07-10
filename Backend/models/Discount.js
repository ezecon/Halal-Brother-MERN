const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    image:{
        type: String,
        require: true
    },
});

module.exports = mongoose.model('discount', discountSchema);