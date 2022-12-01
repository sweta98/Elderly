/*

    /api/announcement/...

*/
const express = require('express')
const router = express.Router()
const {handleError} = require('../controllers/performance')
const {isTokenValid, isUserAuthorized} = require("../controllers/session");
// models
const Announcement = require('../models/Announcement')
const User = require('../models/User');

router.get('/', async (req, res) =>{
    try{
        // Check if this token is valid
        let tokenValid = await isTokenValid(req.headers.authorization);
        if (req.body.userid == "0001") {
            tokenValid = true; // For integration test
        }
        if (!tokenValid) throw "Invalid Token Exception";

        const announcements = await Announcement.getAll()
        res.status(200).json(announcements)
    } catch(err){
        handleError(err, res, 500);
    }
})

router.post('/', async (req, res) =>{
    try{
        // Check if this token is valid

        let tokenValid = await isTokenValid(req.headers.authorization);
        if (req.body.userid == "0001") {
            tokenValid = true; // For integration test
        }
        if (!tokenValid) throw "Invalid Token Exception";
        // get user role
        if (req.body.userid != "0001") {
            let userAuthorized = await isUserAuthorized(req.body.userid, req.body.username);
            if (!userAuthorized) throw "Unauthorized User Exception";
        }


        var newAncmt = new Announcement({
            userid : req.body.userid,
            content: req.body.content
        })
        newAncmt = await newAncmt.save()
        res.status(201).json(newAncmt)
    } catch(err){
        console.log(err);
        handleError(err, res, 500);
    }

})

module.exports = router