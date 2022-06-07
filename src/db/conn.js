const mongoose =require('mongoose');
mongoose.connect("mongodb://localhost:27017/icvpStudents",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection Succesfull.....");
}).catch((err)=>
{
    console.log(err);
});