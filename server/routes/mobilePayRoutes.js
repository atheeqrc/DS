const express=require('express');
const router=express.Router();
const nodemailer = require('nodemailer');
//npm install nodemailer@4.7.0
const mongoose = require('../DBSchema');
const mobilePaySchema = mongoose.model('mobilePay');
const transSchema = mongoose.model('transaction')


//localhost/mobilePay  POST
    router.post("/", (req,res) => {
        const  newMobilePay = mobilePaySchema ({
            username : req.body.username,
            phoneNumber: req.body.phoneNumber,
            pin: req.body.pin,
            total: req.body.total,
            email: req.body.email
        })

        newMobilePay.save().then( mobilePay => {
            res.status(200).send({Message : "Successfully Payement Made"});
            console.log(mobilePay)
        }).catch(error => {
            res.status(400).send({Message : `Error occured : ${error}`})
        })

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
            subject : "Payement Status - Mobile",
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

router.get('/:username', (req,res) => {
    transSchema.find ( {username : req.params.username}).exec().then((transaction)=> {

        console.log(req.url + req.params.username)
        console.log(transaction)
        res.status(200).send(transaction)
    }).catch(err => {
        res.status(400).send({Message : `Error occured : ${err}`})
    })
})


module.exports = router;