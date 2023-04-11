const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dispatchHistorySchema = new Schema({
            date: Date,
            phlebotomist: { type: Schema.Types.ObjectId, ref: 'Phlebotomist' },
            requisition: { type: Schema.Types.ObjectId, ref: 'Requisition' },
            attempt_made: Boolean,
  }, {
    timestamps: true
});

const DispatchHistory = mongoose.model('DispatchHistory', dispatchHistorySchema);

module.exports = DispatchHistory;