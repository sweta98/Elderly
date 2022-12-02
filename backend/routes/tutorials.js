/*

    /api/tutorials/...
  
*/
const express = require('express')
const router = express.Router()
const {handleError} = require('../controllers/errorHandler')
// models
const Tutorial = require('../models/Tutorial')



router.get('/', async (req, res) => {
    try{
        const tutorials = await Tutorial.getAll();
        res.status(200).json({tutorials});
    }catch(err){
        handleError(err, res, 500);
    }
    
})

router.get('/app/:appName', async (req, res) => {
    try{
        const appName = req.params.appName;
        const tutorial = await Tutorial.get(appName);
        res.status(200).json({tutorial});
    }catch(err){
        handleError(err, res, 500);
    }
    
})

router.post('/', async (req, res) => {
    try{
        const tutorial = new Tutorial(req.body);
        await tutorial.save();
        res.status(200).json({message:`New tutorial for ${tutorial.app} was created.`});
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/enabled', async (req, res) => {
    try{
        const tutorials = await Tutorial.getAllEnabled();
        res.status(200).json({tutorials});
    }catch(err){
        handleError(err, res, 500);
    }
    
})

router.patch('/enabled/:appName', async (req, res) =>{
    try{
        const tutorial = await Tutorial.enable(req.params.appName);
        res.json(tutorial);
    } catch(err){
        handleError(err, res, 500);
    }
})

router.patch('/disabled/:appName', async (req, res) =>{
    try{
        const tutorial = await Tutorial.disable(req.params.appName);
        res.json(tutorial);
    } catch(err){
        handleError(err, res, 500);
    }
})

module.exports = router