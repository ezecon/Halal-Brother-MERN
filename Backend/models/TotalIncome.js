const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    userID:{
        type: String,
        require: true,
    },
    income:{
        type: Number,
        require: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('income', incomeSchema);