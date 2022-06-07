const mongoose = require("mongoose");

const noticesSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    subject:{
        type:String,
    }
})
const Notices=new mongoose.model("Notice",noticesSchema);

module.exports = Notices;