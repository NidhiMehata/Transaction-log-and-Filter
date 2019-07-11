const express=require('express');

var router=express.Router();

var {Transaction}=require('../models/transaction');

var ObjectId = require('mongoose').Types.ObjectId;

router.get('/',(req,res)=>{
    Transaction.find((err,docs)=>{
        if(!err){res.send(docs);}
        else{console.log('Error in retrieving Transactions: '+JSON.stringify(err,undefined,2));}
    });
});


router.get('/getMonthly/:month',(req,res)=>{
    let month = parseInt(req.params.month);
    Transaction.find({ $expr : { $eq : [{ $month : "$date" },month]}}, (err,docs)=>{
        if(!err){res.send(docs);}
        else{console.log('Error in retrieving Transactions: '+JSON.stringify(err,undefined,2));}
    });
});

router.get('/getFiltered/:filter',(req,res)=>{
    let ch = parseInt(req.params.filter);
    var start = new Date();
    start.setHours(0,0,0,0);
    var end = new Date();
    end.setHours(23,59,59,999);

    if(ch == 2){
        Transaction.find({ date :{ $lt : end , $gte : start}}, (err,docs)=>{
            if(!err){res.send(docs);}
            else{console.log('Error in retrieving Transactions: '+JSON.stringify(err,undefined,2));res.send(err)}
        });
    }else if(ch == 3){
        var d = new Date();
        var day = d.getDay(),diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        var startWeek = new Date(d.setDate(diff));
        startWeek.setHours(0,0,0,0);
        Transaction.find({ date :{ $lt : end , $gte : startWeek}}, (err,docs)=>{
            if(!err){res.send(docs);}
            else{console.log('Error in retrieving Transactions: '+JSON.stringify(err,undefined,2));}
        });
    }else if(ch == 4){
        Transaction.find({ $expr : { $eq : [{ $month : "$date" },start.getMonth()+1]}}, (err,docs)=>{
            if(!err){res.send(docs);}
            else{console.log('Error in retrieving Transactions: '+JSON.stringify(err,undefined,2));}
        });
    }
    else{
    Transaction.find((err,docs)=>{
        if(!err){res.send(docs);}
        else{console.log('Error in retrieving Transactions: '+JSON.stringify(err,undefined,2));}
    });
    }
});

router.get('/plotgraph',(req,res)=>{
    Transaction.aggregate([{ $group : { _id : { $month : "$date" },count : { $sum : 1 }}}], (err,docs)=>{
        if(!err){res.send(docs);}
        else{console.log('Error in retrieving Transactions: '+JSON.stringify(err,undefined,2));}
    });
});


router.get('/getAmount/:filter/:op/:Amount/:Month',(req,res)=>{
    let op = parseInt(req.params.op);
    let amount = parseInt(req.params.Amount);
    let filter = parseInt(req.params.filter);
    let month = parseInt(req.params.Month);
    var start = new Date();
    start.setHours(0,0,0,0);
    var end = new Date();
    end.setHours(23,59,59,999);
    if(filter == 2){
        if(op == 1){
            Transaction.find({ date :{ $lt : end , $gte : start},amount :{ $gt : amount}}, (err,docs)=>{
                if(!err){res.send(docs);}
                else{console.log('Error in retrieving Transactions: '+JSON.stringify(err,undefined,2));}
            });
        }else if(op == 2){
            Transaction.find({date :{ $lt : end , $gte : start}, amount :{ $lt : amount}}, (err,docs)=>{
                if(!err){res.send(docs);}
                else{console.log('Error in retrieving Transactions: '+JSON.stringify(err,undefined,2));}
            });
        }else{
            Transaction.find({date :{ $lt : end , $gte : start}, amount :{ $eq : amount}}, (err,docs)=>{
                if(!err){res.send(docs);}
                else{console.log('Error in retrieving Transactions: '+JSON.stringify(err,undefined,2));}
            });
        }
    }else if(filter == 3){
        var d = new Date();
        var day = d.getDay(),diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        var startWeek = new Date(d.setDate(diff));
        startWeek.setHours(0,0,0,0);
        if(op == 1){
            Transaction.find({ date :{ $lt : end , $gte : startWeek},amount :{ $gt : amount}}, (err,docs)=>{
                if(!err){res.send(docs);}
                else{console.log('Error in retrieving Transactions: '+JSON.stringify(err,undefined,2));}
            });
        }else if(op == 2){
            Transaction.find({date :{ $lt : end , $gte : startWeek}, amount :{ $lt : amount}}, (err,docs)=>{
                if(!err){res.send(docs);}
                else{console.log('Error in retrieving Transactions: '+JSON.stringify(err,undefined,2));}
            });
        }else{
            Transaction.find({date :{ $lt : end , $gte : startWeek}, amount :{ $eq : amount}}, (err,docs)=>{
                if(!err){res.send(docs);}
                else{console.log('Error in retrieving Transactions: '+JSON.stringify(err,undefined,2));}
            });
        }
    }else if(filter == 4){
        if(op == 1){
            Transaction.find({ $expr : { $eq : [{ $month : "$date" },month]},amount :{ $gt : amount}}, (err,docs)=>{
                if(!err){res.send(docs);}
                else{console.log('Error in retrieving Transactions: '+JSON.stringify(err,undefined,2));}
            });
        }else if(op == 2){
            Transaction.find({$expr : { $eq : [{ $month : "$date" },month]}, amount :{ $lt : amount}}, (err,docs)=>{
                if(!err){res.send(docs);}
                else{console.log('Error in retrieving Transactions: '+JSON.stringify(err,undefined,2));}
            });
        }else{
            Transaction.find({$expr : { $eq : [{ $month : "$date" },month]}, amount :{ $eq : amount}}, (err,docs)=>{
                if(!err){res.send(docs);}
                else{console.log('Error in retrieving Transactions: '+JSON.stringify(err,undefined,2));}
            });
        }

    }else{
        if(op == 1){
            Transaction.find({ amount :{ $gt : amount}}, (err,docs)=>{
                if(!err){res.send(docs);}
                else{console.log('Error in retrieving Transactions: '+JSON.stringify(err,undefined,2));}
            });
        }else if(op == 2){
            Transaction.find({ amount :{ $lt : amount}}, (err,docs)=>{
                if(!err){res.send(docs);}
                else{console.log('Error in retrieving Transactions: '+JSON.stringify(err,undefined,2));}
            });
        }else{
            Transaction.find({ amount :{ $eq : amount}}, (err,docs)=>{
                if(!err){res.send(docs);}
                else{console.log('Error in retrieving Transactions: '+JSON.stringify(err,undefined,2));}
            });
        }
    }

});


router.get('/:id',(req,res)=>{
if(!ObjectId.isValid(req.params.id))
{
    return res.status(400).send('No record with given id: ',$(req.params.id));
}


Transaction.findById(req.params.id,(err,doc)=>{
    if(!err){
        res.send(doc);

    }
    else{
        console.log("Error in retrieving Transaction:"+JSON.stringify(err,undefined,2));
    }

});
});


router.post('/',(req,res)=>{
    var tran=new Transaction({
        // tid:req.body.id,
        name:req.body.name,
        date:req.body.date,
        amount:req.body.amount,
        paymentMethod:req.body.paymentMethod

    });

    tran.save((err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else
        {
            console.log('Error in Transaction save:'+JSON.stringify(err,undefined,2));
        }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var tran = {
        // tid:releaseEvents.body.id,
        name:req.body.name,
        date:req.body.date,
        amount:req.body.amount,
        paymentMethod:req.body.paymentMethod

    };
    Transaction.findByIdAndUpdate(req.params.id, { $set: tran }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Transaction Update :' + JSON.stringify(err, undefined, 2)); }
    });
});




router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});


module.exports=router;
