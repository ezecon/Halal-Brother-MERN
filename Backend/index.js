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

const auth = require('./Auth/auth.js');
app.use('/api/login', auth);

const verify = require('./Auth/verifytoken.js');
app.use('/api/verifyToken', verify);

const items = require('./routes/item.js')
app.use('/api/items',items);

const cart = require('./routes/cart.js')
app.use('/api/carts', cart);

const purchase = require('./routes/buy.js')
app.use('/api/buy-products',purchase);

const reservation = require('./routes/reservation.js')
app.use('/api/reservation',reservation);


const offlineOrder = require('./routes/offlineOrder.js')
app.use('/api/offline-order',offlineOrder);


const income = require('./routes/TotalIncome.js')
app.use('/api/incomes',income);



//start server

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("server running");
})