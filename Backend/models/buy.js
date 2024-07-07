const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    userID: { 
        type: String, 
        required: true 
    },
    products: [{ type: String}],
    totalPrice: { type: Number, required: true },
    status:{
        type: String,
        default: 'Pending'
    },
    purchasedAt: { type: Date, default: Date.now },

});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
