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

router.get("/tutorials", async (req, res) => { // for resident
    const tutorials = await Tutorial.getAll();
    res.render(CWD + "/frontend/views/tutorialList.ejs", { tutorials });
});

router.get("/manageTutorials", async (req, res) => { // for staff
    const tutorials = await Tutorial.getAll();

    res.render(CWD + "/frontend/views/manageTutorial.ejs", { tutorials });
});

router.get("/tutorials/:appName", async (req, res) => { // for resident
    const appName = req.params.appName;
    const tutorial = await Tutorial.get(appName);

    res.render(CWD + "/frontend/views/watchTutorial.ejs", { tutorial });
});

router.get("/manageTutorials/:appName", async (req, res) => { // for staff
    const appName = req.params.appName;
    const tutorial = await Tutorial.get(appName);

    res.render(CWD + "/frontend/views/watchTutorialStaff.ejs", { tutorial });
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