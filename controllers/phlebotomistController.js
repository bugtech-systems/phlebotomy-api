const Phlebotomist = require('../models/phlebotomist');
const csvToJson = require('csvtojson');
const path = require('path');


// Define controller methods for phlebotomist
exports.getAll = async (req, res) => {
  const phlebotomists = await Phlebotomist.find();
  res.json(phlebotomists);
};

exports.getById = async (req, res) => {
  const phlebotomist = await Phlebotomist.findById(req.params.id);
  res.json(phlebotomist);
};

exports.create = async (req, res) => {
  const phlebotomist = new Phlebotomist(req.body);
  await phlebotomist.save();
  res.json(phlebotomist);
};

exports.update = async (req, res) => {
  await Phlebotomist.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Phlebotomist updated' });
};

exports.delete = async (req, res) => {
  await Phlebotomist.findByIdAndDelete(req.params.id);
  res.json({ message: 'Phlebotomist deleted' });
};


exports.upload = async (req, res) => {
  if (req.file == undefined) {
    return res.status(400).send("Please upload a CSV file!");
  }
  const dir = path.join(process.env.UPLOAD_PATH, 'uploads') || '/uploads';
  let csvData = [];
  let csvPath = path.join(dir, req.file.filename);
    

  const json = await csvToJson().fromFile(csvPath);

    for(let val of json){
    
      await Phlebotomist.create(val)
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