const express = require('express')
const router = express.Router()
const CWD = process.env.INIT_CWD
const Event = require('../models/Event')
const Tutorial = require('../models/Tutorial')
const {handleError} = require("../controllers/errorHandler");
const User = require('../models/User')
/*
    URLs
*/
// home get example

router.get('/', async (req, res) => {
  // res.render(CWD + '/frontend/views/login')
  try{
    const residentAccounts = await User.getAllResident();
    const staffAccounts = await User.getAllStaff();
    res.render(CWD + '/frontend/views/login', { residentAccounts: residentAccounts, staffAccounts: staffAccounts})
  }catch(err){
    handleError(err, res, 500);
  }
})

router.get("/home", (req, res) => {
  res.render(CWD + '/frontend/views/index')
  });
  router.get("/manageWishes", (req, res) => {
    res.render(CWD + '/frontend/views/manageWishes')
  });
  router.get('/events/:username', async(req, res) => {
    const events = await Event.getAll();
    const username = req.params.username;
    console.log(username);
    res.render(CWD + "/frontend/views/rsvpEvent", { events,username });
})

router.get('/wishes', (req, res) => {
  res.render(CWD + '/frontend/views/wishboard')
})

router.get('/makeWishes', (req, res) => {
  res.render(CWD + '/frontend/views/makeWishes')
})

router.get('/createEvent', (req, res) => {
  res.render(CWD + '/frontend/views/createEvent')
})

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

/*
    APIs
*/
router.use("/api/users", require("./users"));
router.use("/api/tutorials", require("./tutorials"));
router.use('/api/wishes', require('./wishes'))
router.use('/api/makeWishes', require('./wishes'))
router.use("/api/manageWishes", require("./wishes"));
router.use('/api/events', require('./events'))
router.use('/api/auth', require('./auth')) // Used for creating new users

module.exports = router;

