const Team = require('../models/team');
const { createReadStream } = require('fs');
const csvToJson = require('csvtojson');
const path = require('path');

// Define controller methods for team
exports.getAll = async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
};

exports.getById = async (req, res) => {
  const team = await Team.findById(req.params.id);
  res.json(team);
};

exports.create = async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.json(team);
};

exports.update = async (req, res) => {
  await Team.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Team updated' });
};

exports.delete = async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.json({ message: 'Team deleted' });
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
        await Team.create(val)
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

