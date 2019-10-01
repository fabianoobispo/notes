const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/users/singin', (req, res) => {
    res.render('users/singin');
});

router.get('/users/singup', (req, res) => {
    res.render('users/singup');
});

router.post('/users/singup', async (req, res) => {
    const { nome, email, senha, confirma_senha } = req.body;
    const errors = [];
    if ( nome.length <= 0 ) {
        errors.push({text: 'Favor insira seu nome'});
    }
    if ( senha != confirma_senha ) {
        errors.push({text: 'As senhas são diferentes'});
    }
    if ( senha.length < 4 ) {
        errors.push({text: 'Senha deve conter 4 caracteres'});
    }
    if( errors.length > 0 ) {
        res.render('users/singup', {errors, nome, email, senha, confirma_senha});
    } else {
    const emailUsuario = await User.findOne({email: email})
    if ( emailUsuario ) {
        req.flash('error_msg', 'O email ja foi cadastrado');
        res.redirect('/users/singup');
    }
    const newUser = new User({nome, email, senha});
    newUser.senha =  await newUser.encryptPassword(senha);
    await newUser.save();
    req.flash('success_msg', 'Novo usuario cadastrado');
    res.redirect('/users/singin');
    }
});




module.exports = router;