const Items = require('../models/items');
const csvToJson = require('csvtojson');
const path = require('path');


exports.getAll = async (req, res) => {
  const items = await Items.find();
  res.json(items);
};

exports.getById = async (req, res) => {
  const item = await Items.findById(req.params.id);
  res.json(item);
};

exports.create = async (req, res) => {
  const item = new Items(req.body);
  await item.save();
  res.json(item);
};

exports.update = async (req, res) => {
  await Items.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Items updated' });
};

exports.delete = async (req, res) => {
  await Items.findByIdAndDelete(req.params.id);
  res.json({ message: 'Items deleted' });
};


exports.upload = async (req, res) => {
  if (req.file == undefined) {
    return res.status(400).send("Please upload a CSV file!");
  }
  const dir = path.join(process.env.UPLOAD_PATH, 'uploads') || '/uploads';
  let csvData = [];
  let csvPath = path.join(dir, req.file.filename);
    
    console.log(csvPath)
    
  const json = await csvToJson().fromFile(csvPath);

  console.log(json)

    for(let val of json){
    console.log(val)
      await Items.create(val)
      .then(doc => {
          // console.log(doc)
        csvData.push(doc);
      })
      .catch(err => {
      
        console.log(err)
      })
    }
  
    res.status(200).json({
      m: "CSV Data",
      d: csvData
    })
    

};