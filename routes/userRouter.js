const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../mongo/models/userSchema')

const router = new express.Router()

const userAuth = require('../middlewares/userAuth')

router.post('/signup', async(req, res)=>{
    let existanceMail
    let existancePhone
    if(req.body.email){
        existanceMail = await User.findOne({email:req.body.email})
    }
    if(req.body.phone){
        existancePhone = await User.findOne({phone:req.body.phone})
    }

    if(existanceMail || existancePhone){
        return res.send("Email or Phone already exists")
    }

    try {
        const user = new User(req.body)
        await user.generateAuthToken()
        bcrypt.hash(user.password, 8, async function(err, hash) {
            user.password = hash
            await user.save()
            res.send({ user })
        });
    } catch (e) {
        console.log(e)
        if(e.code = 11000){
            return res.status(400).send("User already registered")
        }
        res.status(500).send(e)
    }
})


router.post('/login', async (req, res) => {
    const email = req.body.email
    const phone = req.body.phone
    
    const user = req.body.email ? await User.findOne({ email }) : await User.findOne({ phone })
    console.log(user)
    if (!user) {
        res.status(404).send("Wrong credentials")
    }
    else {
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        console.log("check",isMatch)
        if (isMatch) {
            await user.generateAuthToken()
            await user.save()
            console.log(user)
            res.send({ user })
        }
        else {
            res.status(404).send("Wrong credentials")
        }
    }
})

router.get('/test', userAuth, async(req, res)=>{
    res.send(`hiii ${req.user.name}`)
})

module.exports = router