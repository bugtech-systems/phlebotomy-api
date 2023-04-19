const Site = require('../models/site');
const csvToJson = require('csvtojson');
const path = require('path');


// Define controller methods for site
exports.getAll = async (req, res) => {
  const sites = await Site.find().populate([{path: 'client'}, { path: 'team' }]);
  res.json(sites);
};

exports.getById = async (req, res) => {
  const site = await Site.findById(req.params.id).populate([{path: 'client'}, { path: 'team' }]);;
  res.json(site);
};

exports.create = async (req, res) => {
  const site = new Site(req.body);
  await site.save();
  res.json(site);  
};

exports.update = async (req, res) => {
  await Site.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Site updated' });
};

exports.delete = async (req, res) => {
  await Site.findByIdAndDelete(req.params.id);
  res.json({ message: 'Site deleted' });
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
      await Site.create(val)
      .then(doc => {
          // console.log(doc)
        csvData.push(doc);
      })
      .catch(err => {
      
        // console.log(err)
      })
    }
  
    res.status(200).json({
      m: "CSV Data",
      d: csvData
    })
    

};