const { Router } = require('express');

const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: 'zxcv'
    })
})

router.post('/', (req, res) => {
    const logEntry = new LogEntry(req.body);
    console.log(req.body);
});

module.exports = router;