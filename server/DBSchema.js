const mongoose = require('mongoose');

const schema = mongoose.Schema;

        const user = new schema({
            username : {
                type: String,
                required: true

            },
            password : {
                type: String,
                required: true

            },
            firstName : {
                type : String,
                required: true
            },
            lastName : {
                type : String,
                required: true
            },
            email : {
                type : String,
                required: true
            },
            address : {
                type : String,
                required: true
            }
        })

        const train = new schema({
            trainId : {
                type : Number,
                required: true
            },
            source : {
                type : String,
                required: true
            },
            destination : {
                type : String,
                required: true
            },
            time : {
                type : String,
                required: true
            },
            date : {
                type : String,
                required: true
            },
            capacity : {
                type : Number,
                required : true
            },
            price : {
                type : Number,
                required : true
            }

        })

        const creditCard = new schema ({
            name : {
                type : String,
                required: true
            },
            cardNumber : {
                type : Number,
                required: true
            },
            cvc : {
                type : Number,
                required: true
            },
            total: {
                type : Number,
                required: true
            },
            email : {
                type : String,
                required: true
            }
        })

        const mobilePay = new schema ({
            username : {
                type : String,
                required: true
            },
            phoneNumber : {
                type : Number,
                required: true
            },
            pin : {
                type : Number,
                required: true
            },
            total: {
                type : Number,
                required: true
            },
            email : {
                type : String,
                required: true
            }
        })

        const transaction = new schema ({
            transId : {
                type : String,
                required : true

            },
            username : {
                type : String,
                required : true
            },
            tickets : {
                type : Number,
                required : true
            },
            discount : {
                type : Number,
                required : true
            },
            total : {
                type : Number,
                required : true
            },
            Date : {
                type : Date,
                required : true

            }

        })

    mongoose.model('user',user);
    mongoose.model('train',train);
    mongoose.model('creditCard',creditCard);
    mongoose.model('mobilePay',mobilePay);
    mongoose.model('transaction', transaction);

    mongoose.connect('mongodb://atheeq:atheeq@mernshopping-shard-00-00-fbkn6.mongodb.net:27017,mernshopping-shard-00-01-fbkn6.mongodb.net:27017,mernshopping-shard-00-02-fbkn6.mongodb.net:27017/test?ssl=true&replicaSet=MernShopping-shard-0&authSource=admin&retryWrites=true',{ useNewUrlParser: true })
        .then(
    ()=> console.log("DB Connected"),
    error => console.log(error)
    )


module.exports = mongoose;