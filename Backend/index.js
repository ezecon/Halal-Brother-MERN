const express = require('express');
const bodyParser = require('body-parser');
const cors= require('cors');
const mongoose = require('mongoose');

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

//mongodb
mongoose.connect('mongodb+srv://mdeconozzama:econ@cluster0.rtk880z.mongodb.net/data?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
)

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('connceted to db');
})


//user
const users = require('./routes/user.js')
app.use('/api/users',users);



//start server

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("server running");
})