const Sample = require('../models/sample');

exports.getAll = async (req, res) => {
  const panels = await Sample.find();
  res.json(panels);
};

exports.getById = async (req, res) => {
  const panel = await Sample.findById(req.params.id);
  res.json(panel);
};

exports.create = async (req, res) => {
  const panel = new Sample(req.body);
  await panel.save();
  res.json(panel);
};

exports.update = async (req, res) => {
  await Sample.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Sample updated' });
};

exports.delete = async (req, res) => {
  await Sample.findByIdAndDelete(req.params.id);
  res.json({ message: 'Sample deleted' });
};