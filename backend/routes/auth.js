/* 

    /api/auth/...

*/
const express = require('express'),
    router = express.Router(),
    User = require('../models/User')
// const {v4: uuidv4} = require("uuid");
// const Token = require('../models/Token');

router.post('/signUp', async (req, res) =>{
    try{
        var newUser = new User(req.body)
        newUser = await newUser.save()
        res.status(201).json(newUser)
    } catch(err){
        handleError(err, res, 500);
    }
})

// router.post('/validate', async (req, res) =>{
//     try{
//         var user = await User.validate(req.body.username, req.body.password);
//         // Add token to session object. store the token in the DB
//         // const tokenString = uuidv4();
//         // req.session.token = newToken;
//         // Store token in DB with expiry time.
//         const presentTime = new Date().getTime();
//         // Add 1 hour to the presentTime and set as expiry time
//         const expiryDate = presentTime + 3600000;
//         const tokenObject = {
//             token: tokenString,
//             userid: user.username,
//             expiryDate: expiryDate,
//         }
//         var newToken = new Token(tokenObject);
//         newToken = await newToken.save();
//         const userWithToken = {
//             ...user,
//             ...tokenObject
//         }
//         res.status(200).json(userWithToken);
//     }catch(err){
//         handleError(err, res, 500);
//     }
// })

router.post('/signIn', async (req, res) =>{
    try{
        // Replace Current User, set his/her online to false
        if (req.session.username){
            await User.signOut(req.session.username);
        }
        var user = await User.signIn(req.body.username);
        req.session.username=req.body.username;
        res.status(200).json(user);
    }catch(err){
        console.error(err);
        handleError(err, res, 500);
    }
})

router.post('/signOut', async (req, res) =>{
    try{
        // TODO: Get token and invalidate it
        var user = await User.signOut(req.body.username);
        req.session.destroy();
        res.status(200).json(user);
    }catch(err){
        handleError(err, res, 500);
    }
})

router.get('/', (req, res) =>{
    return res.json(req.session)
})

module.exports = router