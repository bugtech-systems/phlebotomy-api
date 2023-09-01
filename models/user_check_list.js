const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkListSchema = new Schema({
    phlebotomist_email: { type: String },
    check_lists: [String],
    checklistDate: Date
}, {
    timestamps: true
});

const CheckList = mongoose.model('UserCheckList', checkListSchema);

module.exports = CheckList;