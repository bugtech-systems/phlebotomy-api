const PhlebotomySchedule = require('../models/phlebotomySchedule');

// Define controller methods for phlebotomy schedule
exports.getAll = async (req, res) => {
  const phlebotomySchedules = await PhlebotomySchedule.find();
  res.json(phlebotomySchedules);
};

exports.getById = async (req, res) => {
  const phlebotomySchedule = await PhlebotomySchedule.findById(req.params.id);
  res.json(phlebotomySchedule);
};

exports.create = async (req, res) => {
  const phlebotomySchedule = new PhlebotomySchedule(req.body);
  await phlebotomySchedule.save();
  res.json(phlebotomySchedule);
};

exports.update = async (req, res) => {
  await PhlebotomySchedule.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Phlebotomy schedule updated' });
};

exports.delete = async (req, res) => {
  await PhlebotomySchedule.findByIdAndDelete(req.params.id);
  res.json({ message: 'Phlebotomy schedule deleted' });
};