const express=require('express');
const router=express.Router();
const nodemailer = require('nodemailer');

const mongoose = require('../DBSchema');
const creditCardSchema = mongoose.model('creditCard');


// localhost/creditCard  POST
    router.post ('/', (req,res) => {
        const newCreditCard = creditCardSchema({
            name : req.body.name,
            cardNumber : req.body.cardNumber,
            cvc : req.body.cvc,
            total : req.body.total,
            email : req.body.email
        })

        newCreditCard.save().then( creditCard => {
            res.status(200).send({Message : "Successfully Payement Made"});
            console.log(mobilePay)

        }).catch(error => {
            res.status(400).send({Message : `Error occured : ${error}`})
        } )

        const output=` <b>Online Train Reservation</b> <p>Dear Sir/Madam, We recieved your payment of ${req.body.total} 
                        LKR. Please be on the specific railway station atleast before 30 minutes due to the prevailing security reasons</p> `;

        let transporter = nodemailer.createTransport ({

            service: 'Gmail',

            auth : {
                user : 'trainreservation1997@gmail.com',
                pass : 'trainreservation'
            },
            tls:{ rejectUnauthorized:false }
        })



        let mailOptions = {
            from : 'trainreservation1997@gmail.com',
            to: req.body.email,
            subject : "Payement Status - Credit Card",
            html : output
        }

        transporter.sendMail(mailOptions, (err, info) =>{
            if (err) {
                console.log("error")
                return console.log(err)

            }
            console.log("no error")
            console.log(`Message sent : ${info.messageId} `)
            console.log (`Preview URL ${nodemailer.getTestMessageUrl (info)}`)
        })

    })





module.exports = router;