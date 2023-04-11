const Patient = require('../models/patient');

exports.getAll = async (req, res) => {
  const panels = await Patient.find();
  res.json(panels);
};

exports.getById = async (req, res) => {
  const panel = await Patient.findById(req.params.id);
  res.json(panel);
};

exports.create = async (req, res) => {
  const panel = new Patient(req.body);
  await panel.save();
  res.json(panel);
};

exports.update = async (req, res) => {
  await Patient.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Patient updated' });
};

exports.delete = async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: 'Patient deleted' });
};