const express=require('express');
const router=express.Router();
const shortid = require('shortid');

const mongoose = require('../DBSchema');
const userSchema = mongoose.model('user');
const transSchema = mongoose.model('transaction')


// localhost/user POST
    router.post('/', (req,res) => {
        const newUser =  userSchema ({
                username : req.body.username,
                password :  req.body.password,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                address: req.body.address,
                email : req.body.email
        })
        console.log(newUser);
        newUser.save().then( (user) => {
            res.status(200).send({Message : `Successfully Added the user` })
            console.log (user)
        }).catch((err) => {
            res.status(400).send({Message : `Error occured : ${err}`})
        })
    })

// localhost/user/email GET

    router.get ('/:username', (req,res) => {
        userSchema.find ( {username : req.params.username}).exec().then((user)=> {

            console.log(req.url + req.params.username)
            res.status(200).send(user)
        }).catch(err => {
            res.status(400).send({Message : `Error occured : ${err}`})
        })
    })

// localhost/username/password
    router.get ('/:username/:password', (req,res) => {
        userSchema.find ( {username : req.params.username, password : req.params.password}).exec().then((user)=> {

            console.log(req.url)

            res.status(200).send(user)
        }).catch(err => {
            res.status(400).send({Message : `Error occured : ${err}`})
        })
    })


//localhost/transaction/

router.post('/transaction', (req,res) => {
        const  newTransaction = transSchema ({
            username : req.body.username,
            tickets : req.body.tickets,
            discount : req.body.discount,
            total : req.body.total,
            Date: Date.now(),
            transId:  shortid.generate()
        })

    newTransaction.save().then( (transaction) => {
        res.status(200).send({Message : `Successfully Transaction added` })
        console.log (transaction)
    }).catch((err) => {
        res.status(400).send({Message : `Error occured : ${err}`})
    })
})










module.exports = router;