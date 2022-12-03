/*

    /api/users/...
  
*/
const express = require('express')
const router = express.Router()
// models
const User = require('../models/User')

router.get('/', async (req, res) => {
    try{
        // let tokenValid = await isTokenValid(req.headers.authorization);
        // //console.log(req.headers.authorization);
        // if (!tokenValid) throw "Invalid Token Exception";
        const users = await User.getAll(true);
        res.status(200).json({users});
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

router.delete('/', async (req, res) => {
    try{
        await User.delAll();
        res.status(200).json({message:"Deleted All Users"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
})


router.get('/:username', async (req, res) =>{
    try{
        let user = await User.get(req.params.username);
        res.json(user)
    } catch(err){
        res.status(500).json({message:err.message});
        
    }
})

router.patch('/:username', async (req, res) =>{
    try{
        let user = await User.update(req.params.username, req.body);
        res.json(user)
    } catch(err){
        res.status(500).json({message:err.message});
    }
})

module.exports = router