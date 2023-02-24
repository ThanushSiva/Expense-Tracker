const mongoose = require("mongoose")

const connect = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGODBURL)
    console.log("DB Connected")
  }
  catch(error) {
    console.log(error)
  }
}

module.exports = connect