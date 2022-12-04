/* 

    /api/auth/...

*/
const express = require('express'),
    router = express.Router(),
    User = require('../models/User')

router.post('/signUp', async (req, res) =>{
    try{
        var newUser = new User(req.body)
        newUser = await newUser.save()
        res.status(201).json(newUser)
    } catch(err){
        handleError(err, res, 500);
    }
})

module.exports = router