const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
    required: true,
    min: 4
  },
  department: {
    type: String
  },
  sem: {
    type: String
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});
// Generating jwt token
studentSchema.methods.generateAuthToken = async function () {
  try {
      console.log("Hi");
    const token =jwt.sign(
      { _id: this._id},
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log("Error");
  }
};
// Hashing The password
studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});
const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;
