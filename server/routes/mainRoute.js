const express=require('express');
const router=express.Router();

const userRouter = require("./userRoutes");
const trainRouter = require("./trainRoutes");
const creditCardRouter = require("./creditCardRoutes");
const mobilePayRouter = require("./mobilePayRoutes");


router.use ('/user',userRouter);
router.use ('/train',trainRouter);
router.use ('/creditCard',creditCardRouter);
router.use ('/mobilePay',mobilePayRouter);


module.exports = router;