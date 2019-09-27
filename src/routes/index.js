const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('index');
});

router.get('/sobre', (req, res) => {
    res.send('Sobre');
});

module.exports = router;