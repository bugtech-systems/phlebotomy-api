const Panel = require('../models/panel');

exports.getAll = async (req, res) => {
  const panels = await Panel.find();
  res.json(panels);
};

exports.getById = async (req, res) => {
  const panel = await Panel.findById(req.params.id);
  res.json(panel);
};

exports.create = async (req, res) => {
  const panel = new Panel(req.body);
  await panel.save();
  res.json(panel);
};

exports.update = async (req, res) => {
  await Panel.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Panel updated' });
};

exports.delete = async (req, res) => {
  await Panel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Panel deleted' });
};