const express = require('express')
const router = express.Router()
const CWD = process.env.INIT_CWD

/*
    URLs
*/
// home get example
router.get("/", (req, res) => {
  res.render(CWD + '/frontend/views/index')
 //   res.sendFile(CWD + "/frontend/views/index.html");
  });
  router.get("/manageNeeds", (req, res) => {
    res.render(CWD + '/frontend/views/manageNeeds')
  //  res.sendFile(CWD + "/frontend/views/manageNeeds.html");
  });
  router.get('/events', (req, res) => {
    //res.sendFile(CWD + '/frontend/views/rsvpEvent.html')
    res.render(CWD + '/frontend/views/rsvpEvent')
})

router.get('/wishes', (req, res) => {
  res.render(CWD + '/frontend/views/wishboard')
   // res.sendFile(CWD + '/frontend/views/wishboard.html')
})
router.get('/makeWishes', (req, res) => {
  res.render(CWD + '/frontend/views/makeWishes')
 //   res.sendFile(CWD + '/frontend/views/makeWishes.html')
})

/*
    APIs
*/
router.use("/api/users", require("./users"));
router.use("/", require("./tutorials"));
router.use('/api/wishes', require('./wishes'))
router.use('/api/makeWishes', require('./wishes'))
router.use("/api/manageNeeds", require("./manageNeeds"));
router.use('/api/events', require('./events'))

module.exports = router;

