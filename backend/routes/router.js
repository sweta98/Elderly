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
    res.render(CWD + '/frontend/views/rsvpEvent')
})

/* 
    APIs
*/
router.use('/api/users', require('./users'))
router.use("/api/manageNeeds", require("./manageNeeds"));
router.use('/api/events', require('./events'))

module.exports = router;

