const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    userId:{
        type: String,
        require: true,
    },
    date:{
        type: String,
        require: true,
    },
    seat:{
        type: Number,
        require: true,
    },
    time:{
        type: String,
        require: true,
    },
    reason:{
        type: String,
        require: true,
    },
    query:{
        type: String,
        default:""
    },
});

module.exports = mongoose.model('reservation', reservationSchema);