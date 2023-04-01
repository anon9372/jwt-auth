const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 5
    }

},
    { timestamps: true })

module.exports = mongoose.model("users", usersSchema)