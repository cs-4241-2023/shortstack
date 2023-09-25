// Schema for storing global variables

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const globalSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Schema.Types.Mixed,
        required: false
    }
});

const Global = mongoose.model('Global', globalSchema);
module.exports = Global;