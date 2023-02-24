const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  uuid : {
    type: String,
    required: true,
    unique: true
  },
  name : {
    type: String,
    required: true,
  },
  email : {
    type: String,
    required: true,
    unique: true
  },
  password : {
    type: String,
    required: true,
  },
  forgotPasswordToken : String,
  forgotPasswordExpiry :  Date
})

const User = new mongoose.model("User", userSchema)

module.exports = User