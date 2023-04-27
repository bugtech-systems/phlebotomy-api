const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AddressShema = new Schema({
      street: "String",
      city: "String",
      country: "String",
      postalCode: "String",
});


const itemsSchema = new Schema({
   isComplete: Boolean,
   summary: String,
   owner_id: String,
   address: AddressShema
    // samples: [{ type: Schema.Types.ObjectId, ref: 'Sample' }],
    // dispatch_histories: [{ type: Schema.Types.ObjectId, ref: 'DispatchHistory' }]
});



  
  

module.exports = mongoose.model('items', itemsSchema);
