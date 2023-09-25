const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    }
});

const Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;