const mongoose=require('mongoose');

var Transaction=mongoose.model('Transaction',{
    // tid:{type:Number},
    name:{type:String},
    date:{type:Date},
    amount:{type:Number},
    paymentMethod:{type:String}

});

module.exports={
    Transaction
};
