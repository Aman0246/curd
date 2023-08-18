const { default: mongoose } = require("mongoose");


const userSchem = new mongoose.Schema({
    name:{type:String},
    bio:{type:String},
    dpUrl:{type:String},
})


const usermodel = new mongoose.model('usermodel',userSchem)

module.exports={usermodel}