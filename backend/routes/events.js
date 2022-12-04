const express = require('express')
const router = express.Router()
const {handleError} = require('../controllers/errorHandler')
// models
const Event = require('../models/Event')



router.get('/', async (req, res) => {
    try{
        const events = await Event.getAll();
        res.status(200).json({events});
    }catch(err){
        handleError(err, res, 500);
    }
})

router.patch('/:eventID', async (req, res) =>{
    try{
        let result = await Event.update(req.params.eventID, req.body);

        //TODO do we need to return the newly updated event?
        res.status(201).json(result);
    } catch(err){
        // TODO error code depending on error type
        // if err...
        // 404, 400, 500
        handleError(err, res, 500);
    }
})

router.post('/', async (req, res) => {
    try{
        var newEvent = new Event(req.body);
        newEvent = await newEvent.save();

        //TODO do we need to return the newly created event?
        res.status(201).json(newEvent);
    }catch(err){
        handleError(err, res, 400);
    }
})

module.exports = router