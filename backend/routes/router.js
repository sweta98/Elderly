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

router.get('/events', (req, res) => {
    res.sendFile(CWD + '/frontend/views/rsvpEvent.html')
})

router.get('/wishes', (req, res) => {
    res.sendFile(CWD + '/frontend/views/wishboard.html')
})

router.get("/manageWishes", (req, res) => {
    res.sendFile(CWD + "/frontend/views/manageWishes.html");
});

router.get('/makeWishes', (req, res) => {
    res.sendFile(CWD + '/frontend/views/makeWishes.html')
})

/*
    APIs
*/
router.use("/api/users", require("./users"));
router.use('/api/tutorials', require('./tutorials'));
router.use("/api/manageWishes", require("./manageWishes"));
router.use('/api/events', require('./events'))

module.exports = router;

