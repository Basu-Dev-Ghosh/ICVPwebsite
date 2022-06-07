const mongoose = require("mongoose");

const booksSchema=new mongoose.Schema({
    bookname:{
        type:String,
        required:true
    },
    authorname:{
        type:String,
        required:true
    },
    sub:{
        type:String,
        required:true
    }
})
const Books=new mongoose.model("Book",booksSchema);

module.exports = Books;