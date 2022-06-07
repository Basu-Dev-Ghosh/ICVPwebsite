const jwt = require("jsonwebtoken");
const Student = require("../models/students");


const auth = async (req, res, next) => {
  try {
    const token=req.cookies.jwt;
    if(token==="Admin"){
      next();
    }else{
    if(token){
      const verifyUser=jwt.verify(token,process.env.SECRET_KEY);
      const user = await Student.findOne({_id:verifyUser._id});
      req.token=token;
      req.user=user;
      next();
    }else{
      next();
    }}
  } catch (e) {
    console.log("hey");
    res.send("Please log in");
  }
};

module.exports=auth;
