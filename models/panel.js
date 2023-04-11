const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const panelSchema = new Schema({
              name: String,
              requisition: [{ type: Schema.Types.ObjectId, ref: 'Requisition' }]
  }, {
    timestamps: true
});

  const Panel = mongoose.model('Panel', panelSchema);

module.exports = Panel;