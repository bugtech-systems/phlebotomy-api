const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkListSchema = new Schema({
    description: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const CheckList = mongoose.model('checklists', checkListSchema);

module.exports = CheckList;