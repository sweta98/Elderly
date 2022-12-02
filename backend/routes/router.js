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

router.get('/wishes', (req, res) => {
    res.sendFile(CWD + '/frontend/views/wishboard.html')
})

/* 
    APIs
*/
router.use('/api/users', require('./users'))
router.use('/api/wishes', require('./wishes'))

module.exports = router