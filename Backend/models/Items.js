const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true,
    },
    price:{
        type: Number,
        require: true,
    },
    type:{
        type: String,
        require: true,
    },
    version:{
        type: String,
        require: true,
    },
    image:{
        type: String,
        default:""
    },
});

module.exports = mongoose.model('item', itemSchema);