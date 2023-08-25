const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkListSchema = new Schema({
    id: {
        type: Number,
    },
    title: String,
    isDone: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const CheckList = mongoose.model('CheckList', checkListSchema);

module.exports = CheckList;