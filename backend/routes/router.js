const express = require('express')
const router = express.Router()
const CWD = process.env.INIT_CWD

/*
    URLs
*/
// home get example
router.get('/', (req, res) => {
    res.sendFile(CWD + '/frontend/views/index.html')
})

/* 
    APIs
*/
router.use('/api/users', require('./users'))
router.use('/api/tutorials', require('./tutorials'))

module.exports = router