const Team = require('../models/team');

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

