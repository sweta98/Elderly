const express = require('express')
const router = express.Router()
const CWD = process.env.INIT_CWD

/*
    URLs
*/
// home get example
router.get('/', (req, res) => {
   // res.sendFile(CWD + '/frontend/views/index.html')
    res.render(CWD + '/frontend/views/index')
})

router.get('/createEvent', (req, res) => {
  //  res.sendFile(CWD + '/frontend/views/createEvent.html')
    res.render(CWD + '/frontend/views/createEvent')
})

router.get('/events', (req, res) => {
   // res.sendFile(CWD + '/frontend/views/rsvpEvent.html')
    res.render(CWD + '/frontend/views/rsvpEvent')
});

router.get("/manageNeeds", (req, res) => {
  //  res.sendFile(CWD + "/frontend/views/manageNeeds.html");
    res.render(CWD + '/frontend/views/manageNeeds')
});

router.get('/createEvent', (req, res) => {
   // res.sendFile(CWD + '/frontend/views/createEvent.html')
    res.render(CWD + '/frontend/views/createEvent')
})


/* 
    APIs
*/
router.use('/api/users', require('./users'))
router.use("/api/manageNeeds", require("./manageNeeds"));
router.use('/api/events', require('./events'))

module.exports = router;

