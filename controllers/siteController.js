const Site = require('../models/site');

// Define controller methods for site
exports.getAll = async (req, res) => {
  const sites = await Site.find();
  res.json(sites);
};

exports.getById = async (req, res) => {
  const site = await Site.findById(req.params.id);
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