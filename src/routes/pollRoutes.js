const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

router.get('/example', (req, res) => {
    res.send('This is an example route.');
});

module.exports = router;