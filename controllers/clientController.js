const Client = require('../models/client');
const csvToJson = require('csvtojson');
const path = require('path');


// Define controller methods for client
exports.getAll = async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
};

exports.getById = async (req, res) => {
  const client = await Client.findById(req.params.id);
  res.json(client);
};

exports.create = async (req, res) => {
  const client = new Client(req.body);
  await client.save();
  res.json(client);
};

exports.update = async (req, res) => {
  await Client.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Client updated' });
};

exports.delete = async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ message: 'Client deleted' });
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


    for(let val of json){
    console.log(val)
      await Client.create(val)
      .then(doc => {
          console.log(doc)
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