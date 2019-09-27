const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/notes-bd-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(db => console.log('DB Esta Conectado!'))
.catch(err => console.log('erro no banco de dados'));
