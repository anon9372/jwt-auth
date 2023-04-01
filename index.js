const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/auth')
const app = express()
app.use(express.json())


app.use("/auth", auth)

const uri = "mongodb+srv://dev-av:qwerty123@cluster0.szwxyby.mongodb.net/?retryWrites=true&w=majority"
mongoose.set("strictQuery", false);
mongoose.connect(uri)
    .then(() => {
        console.log('Conncted to the DB')
    })
    .catch((err) => {
        console.log(err)
    })



app.listen((5700), () => console.log('Listening on port 5700...'))