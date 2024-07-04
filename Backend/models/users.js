const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    number:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    },
    role:{
        type: String,
        default: "user",
    },
    address:{
        type: String,
        default: '',
    },
    image:{
        type: String,
        default:""
    },
});

module.exports = mongoose.model('user', userSchema);