/*

    /api/users/...
  
*/
const express = require('express')
const router = express.Router()
const {handleError} = require('../controllers/errorHandler')
// models
const User = require('../models/User')



router.get('/', async (req, res) => {
    try{
        const users = await User.getAll(true);
        res.status(200).json({users});
    }catch(err){
        handleError(err, res, 500);
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
        handleError(err, res, 500);
        
    }
})

router.patch('/:username', async (req, res) =>{
    try{
        let user = await User.update(req.params.username, req.body);
        res.json(user)
    } catch(err){
        handleError(err, res, 500);
    }
})

module.exports = router