const router = require('express').Router()
const User = require('../model/user')

router.post('/signup', async (req,res)=> {
    const user = await User.create(req.body)
    if(user){
        res.status(201).send({status:"success",message:"User registered!"})
    } else {
        res.status(400).send({status:"failed",message:"Request failed, Please try again!"})
    }
})


router.post('/login', async (req,res)=> {
    const user = await User.findOne(req.body).select("-password")
    if(user){
        res.status(200).send({status:"success",message:"login successfull!",user})
    } else {
        res.status(400).send({status:"failed",message:"login failed!"})
    }
})

module.exports = router