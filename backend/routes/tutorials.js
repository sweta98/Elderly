/*

    /api/tutorials/...
  
*/
const express = require('express')
const router = express.Router()
const {handleError} = require('../controllers/errorHandler')
const CWD = process.env.INIT_CWD;
// models
const Tutorial = require('../models/Tutorial')

/* Static Pages */

router.get("/tutorials", (req, res) => { // for resident
    const tutorials = [
        {
            app: "Facebook",
            videoId: "xu8rh9Ref4Y",
            enabled: true
        },
        {
            app: "Netflix",
            videoId: "o5RxOCCHNGM",
            enabled: true
        },
        {
            app: "TikTok",
            videoId: "PyaZxrN_gM8",
            enabled: true
        },
    ]
    res.render(CWD + "/frontend/views/tutorial.ejs", { tutorials });
});

router.get("/manageTutorials", (req, res) => { // for staff
    res.sendFile(CWD + "/frontend/views/manageNeeds.html");
});

router.get("/tutorials/:appName", (req, res) => { // for resident
    const tutorials = [
        {
            app: req.params.appName,
            videoId: "xu8rh9Ref4Y",
            enabled: true
        },
    ]
    res.render(CWD + "/frontend/views/tutorial.ejs", { tutorials });
});
/* APIs */

router.get('/api/tutorials/', async (req, res) => {
    try{
        const tutorials = await Tutorial.getAll();
        res.status(200).json({tutorials});
    }catch(err){
        handleError(err, res, 500);
    }
    
})

router.get('/api/tutorials/app/:appName', async (req, res) => {
    try{
        const appName = req.params.appName;
        const tutorial = await Tutorial.get(appName);
        res.status(200).json({tutorial});
    }catch(err){
        handleError(err, res, 500);
    }
    
})

router.post('/api/tutorials/', async (req, res) => {
    try{
        const tutorial = new Tutorial(req.body);
        await tutorial.save();
        res.status(200).json({message:`New tutorial for ${tutorial.app} was created.`});
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/api/tutorials/enabled', async (req, res) => {
    try{
        const tutorials = await Tutorial.getAllEnabled();
        res.status(200).json({tutorials});
    }catch(err){
        handleError(err, res, 500);
    }
    
})

router.patch('/api/tutorials/enabled/:appName', async (req, res) =>{
    try{
        const tutorial = await Tutorial.enable(req.params.appName);
        res.json(tutorial);
    } catch(err){
        handleError(err, res, 500);
    }
})

router.patch('/api/tutorials/disabled/:appName', async (req, res) =>{
    try{
        const tutorial = await Tutorial.disable(req.params.appName);
        res.json(tutorial);
    } catch(err){
        handleError(err, res, 500);
    }
})

module.exports = router