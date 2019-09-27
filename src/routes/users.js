const express = require('express');
const router = express.Router();

router.get('/users/singin', (req, res) => {
    res.send('entrar no app');
});

router.get('/users/singup', (req, res) => {
    res.send('formulario de autenticacao');
});


module.exports = router;