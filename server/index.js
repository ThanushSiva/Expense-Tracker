require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const router = require("./routes/router")
const connect = require("./config/dbConfig")
const app = express()

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

connect()

app.use("/", router)

app.listen(process.env.PORT, () => {
  console.log(`Listening in port ${process.env.PORT}`)
})