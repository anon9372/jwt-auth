const router = require('express').Router()
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const { validationResult, check } = require('express-validator')
const users = require('../models/users')


// SIGN UP
// /auth/loin
router.post("/signup", [
    check("email", "Please enter a valid email")
        .isEmail(),
    check("password", "Please enter a valid password")
        .isLength({ min: 5 }),


], async (req, res) => {
    const { email, password } = req.body

    // Validating the inputs
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    try {
        let existingUser = await users.findOne({ email: email })

        if (existingUser) {
            return res.status(422).json({
                errors: [
                    {
                        message: "This user already exists!"
                    }]
            })
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10)

            const addUser = new users({
                email, password: hashedPassword
            })

            await addUser.save()
            res.status(201).json(addUser)
            console.log('addUser', addUser)

            const token = await JWT.sign({ email }, 'dsjfldskfjoiejurtoruojiofjsdf', { expiresIn: 10000 })
            console.log('token', token)
            res.json({
                token
            })
        }
    }
    catch (err) {
        console.log(err)
    }
})



// LOGIN


module.exports = router