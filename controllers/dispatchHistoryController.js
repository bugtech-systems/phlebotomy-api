const DispatchHistory = require('../models/dispatch_history');
const csvToJson = require('csvtojson');
const path = require('path');


exports.getAll = async (req, res) => {
  const dispatchHistories = await DispatchHistory.find().populate([{path: 'phlebotomist', populate: {path: 'team'}}, {path: 'requisition', populate: [{path: 'site', populate: { path: 'client' }}, {path: 'patient'}]}]);
  res.json(dispatchHistories);
};

exports.getById = async (req, res) => {
  const dispatchHistory = await DispatchHistory.findById(req.params.id).populate([{path: 'phlebotomist', populate: {path: 'team'}}, {path: 'requisition', populate: [{path: 'site', populate: { path: 'client' }}, {path: 'patient'}]}]);
  res.json(dispatchHistory);
};

exports.create = async (req, res) => {
  const dispatchHistory = new DispatchHistory(req.body);
  await dispatchHistory.save();
  res.json(dispatchHistory);
};

exports.update = async (req, res) => {
  await DispatchHistory.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Dispatch history updated' });
};

exports.delete = async (req, res) => {
  await DispatchHistory.findByIdAndDelete(req.params.id);
  res.json({ message: 'Dispatch history deleted' });
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
      await DispatchHistory.create(val)
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