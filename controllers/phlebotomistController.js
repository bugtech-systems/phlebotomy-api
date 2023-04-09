const Phlebotomist = require('../models/phlebotomist');

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