const express = require('express')
const router = express.Router()
const CWD = process.env.INIT_CWD
const Event = require('../models/Event')
/*
    URLs
*/
// home get example
router.get("/", (req, res) => {
  res.render(CWD + '/frontend/views/index')
 //   res.sendFile(CWD + "/frontend/views/index.html");
  });
  router.get("/manageWishes", (req, res) => {
    res.render(CWD + '/frontend/views/manageWishes')
  //  res.sendFile(CWD + "/frontend/views/manageNeeds.html");
  });
  router.get('/events', async(req, res) => {
    const events = await Event.getAll();

    res.render(CWD + "/frontend/views/rsvpEvent", { events });
    //res.sendFile(CWD + '/frontend/views/rsvpEvent.html')
    // res.render(CWD + '/frontend/views/rsvpEvent')
})

router.get('/wishes', (req, res) => {
  res.render(CWD + '/frontend/views/wishboard')
   // res.sendFile(CWD + '/frontend/views/wishboard.html')
})

router.get('/makeWishes', (req, res) => {
  res.render(CWD + '/frontend/views/makeWishes')
 //   res.sendFile(CWD + '/frontend/views/makeWishes.html')
})

router.get('/createEvent', (req, res) => {
  res.render(CWD + '/frontend/views/createEvent')
})


router.get('/login', (req, res) => {
  res.render(CWD + '/frontend/views/login')
})

/*
    APIs
*/
router.use("/api/users", require("./users"));
router.use("/", require("./tutorials"));
router.use('/api/wishes', require('./wishes'))
router.use('/api/makeWishes', require('./wishes'))
router.use("/api/manageWishes", require("./wishes"));
router.use('/api/events', require('./events'))
router.use('/api/auth', require('./auth')) // Used for creating new users

module.exports = router;

