const mongoose = require('mongoose');

const offlineOrderSchema = new mongoose.Schema({
    adminID: { 
        type: String, 
        required: true 
    },
    products: [{ type: String}],
    productsID: [{ type: String}],
    totalPrice: { type: Number, required: true },
    purchasedAt: { type: Date, default: Date.now },

});

const offlineOrder = mongoose.model('offlineOrder', offlineOrderSchema);

module.exports = offlineOrder;
     