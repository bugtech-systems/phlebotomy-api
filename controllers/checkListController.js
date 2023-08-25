const CheckList = require('../models/check_list');
const path = require('path');


// Define controller methods for client
exports.getAll = async (req, res) => {
  const checkList = await CheckList.find();
  res.json(checkList);
};

exports.getById = async (req, res) => {
  const checkList = await CheckList.findById(req.params.id);
  res.json(checkList);
};

exports.create = async (req, res) => {
  const checkList = new CheckList(req.body);
  await checkList.save();
  res.json(checkList);
};

exports.update = async (req, res) => {
  await CheckList.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Check List updated' });
};

exports.delete = async (req, res) => {
  await CheckList.findByIdAndDelete(req.params.id);
  res.json({ message: 'Check List deleted' });
};
