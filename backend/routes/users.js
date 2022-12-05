/*

    /api/users/...
  
*/
const express = require('express')
const router = express.Router()
// models
const User = require('../models/User')

router.get('/', async (req, res) => {
    try{
        const users = await User.getAll(true);
        res.status(200).json({users});
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

// router.delete('/', async (req, res) => {
//     try{
//         await User.delAll();
//         res.status(200).json({message:"Deleted All Users"});
//     }catch(err){
//         res.status(500).json({message:err.message});
//     }
// })


router.get('/:username', async (req, res) =>{
    try{
        let user = await User.get(req.params.username);
        res.json(user)
    } catch(err){
        res.status(500).json({message:err.message});
        
    }
})

router.get('/:username/online', async (req, res) =>{
    try{
        let user = await User.get(req.params.username);
        // var io = req.app.get('socketio');
        // io.emit("online", user);
        res.json(user.online)
    } catch(err){
        res.status(500).json({message:err.message});

    }
})

router.patch('/:username/online', async (req, res) =>{
    try{
        let user = await User.updateOnline(req.params.username);
        res.json(user)
    } catch(err){
        res.status(500).json({message:err.message});
    }
})

router.patch('/:username/offline', async (req, res) =>{
    try{
        let user = await User.updateOffline(req.params.username);
        res.json(user)
    } catch(err){
        res.status(500).json({message:err.message});
    }
})

module.exports = router