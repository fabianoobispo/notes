const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/sobre', (req, res) => {
    res.render('Sobre');
});

module.exports = router;