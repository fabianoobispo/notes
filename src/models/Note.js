const mongoose = require ('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    titulo: { type: String, required: true},
    descricao: { type: String, required: true},
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema)