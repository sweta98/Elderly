const express = require('express')
const router = express.Router()
const CWD = process.env.INIT_CWD

/*
    URLs
*/
// home get example
router.get("/", (req, res) => {
    res.sendFile(CWD + "/frontend/views/index.html");
  });
  router.get("/manageNeeds", (req, res) => {
    res.sendFile(CWD + "/frontend/views/manageNeeds.html");
  });
  router.get('/events', (req, res) => {
    res.sendFile(CWD + '/frontend/views/rsvpEvent.html')
})

router.get('/wishes', (req, res) => {
    res.sendFile(CWD + '/frontend/views/wishboard.html')
})
router.get('/makeWishes', (req, res) => {
    res.sendFile(CWD + '/frontend/views/makeWishes.html')
})

/* 
    APIs
*/
router.use('/api/users', require('./users'))
router.use('/api/wishes', require('./wishes'))
router.use('/api/makeWishes', require('./wishes'))
router.use("/api/manageNeeds", require("./manageNeeds"));
router.use('/api/events', require('./events'))

module.exports = router;

