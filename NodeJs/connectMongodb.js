const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/db',(err)=>{
    if(!err)
    {
        console.log('MongoDb connection suceeded.');
    }
    else
    {
        console.log('Error in Database connection: '+JSON.stringify(err,undefined,2));
    }
});

module.exports=mongoose;