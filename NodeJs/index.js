// importing modules
const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const {mongoose}=require('./connectMongodb.js');
var transactionController=require('./controllers/transactionController.js');
var app=express();
app.use(bodyparser.json());
app.use(cors({origin:'http://localhost:4200'}));
app.listen(3000,()=>console.log('Server started at port : 3000'));
app.use('/transactions',transactionController);