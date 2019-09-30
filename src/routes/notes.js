const express = require('express');
const router = express.Router();

const Note = require('../models/Note');

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', async (req, res) => {
    const { titulo, descricao } = req.body;
    const errors = [];
    if (!titulo) {
        errors.push({text: 'Porfavor insira um titulo'});
    }
    if (!descricao) {
        errors.push({text: 'Porfavor insira a nota!'})
    }
    if ( errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            titulo,
            descricao
        });
    } else {
        const newNote = new Note({titulo, descricao});
        await newNote.save();
        req.flash('success_msg', 'Nota adicionada com suscesso..');
        res.redirect('/notes');

    }
  
});

router.get('/notes', async (req, res) => {
    
    const notes = await Note.find().sort({date: 'desc'});
    res.render('notes/all-notes', { notes });
    
});
//buscar notas para mostrar
router.get('/notes/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note' , {note});
});

//editar
router.put('/notes/edit-note/:id', async (req, res) => {
    const { titulo, descricao } = req.body;
    await Note.findByIdAndUpdate({_id: req.params.id} , { titulo, descricao });
    req.flash('success_msg', 'Nota atualizada com suscesso ')
    res.redirect('/notes');

});

router.delete('/notes/delete/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Deletado com força! ')
    res.redirect('/notes');
});

module.exports = router;