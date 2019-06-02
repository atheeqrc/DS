const express=require('express');
const router=express.Router();

const mongoose = require('../DBSchema');
const trainSchema = mongoose.model('train');


// localhost/train POST
    router.post ('/', (req,res) => {
        const newTrain = trainSchema ( {
                trainId : req.body.trainId,
                source : req.body.source,
                destination : req.body.destination,
                time :  req.body.time,
                date: req.body.date,
                capacity : req.body.capacity,
                price : req.body.price
        })
        newTrain.save().then( train => {
            res.status(200).send({Message : "Train record is added"});
            console.log(train);
        }).catch( err => {
            res.status(400).send({Message : `Error occured : ${err}`})
        })
    } )

// localhost/train  GET

    router.get ('/', (req,res) => {
        trainSchema.find().then( trains => {
            res.status(200).send(trains);
            console.log (trains)
        }).catch( err => {
            res.status(400).send({Message : `Error occured : ${err}`})
        })
    })

    router.get ('/:trainId/:noTicket/:nic', (req,res) => {
        trainSchema.find( {trainId: req.params.trainId}).exec().then( (train) => {

            console.log(train[0].price)
            let discount = ' 0';
            let status = 'Not a government Employee'

            let newTotal = train[0].price * req.params.noTicket;
            let newCapacity = train[0].capacity - req.params.noTicket;
            trainSchema.update ({trainId : req.params.trainId}, {$set : {capacity : newCapacity }}).catch(err => console.log(`Error is ${err}`) )


            if (req.params.nic % 2 == 0) {
                discount = newTotal * 0.1
                status = 'You are a government Employee'
                newTotal = newTotal * 0.9 // 10 percent discount
            }
            res.status(200).send({total : newTotal,discount: discount,status: status, tickets: req.params.noTicket })
        }).catch( err => {
            console.log(err)
        })
    })


module.exports = router;