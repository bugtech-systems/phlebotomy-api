const DispatchHistory = require('../models/dispatch_history');

exports.getAll = async (req, res) => {
  const dispatchHistories = await DispatchHistory.find();
  res.json(dispatchHistories);
};

exports.getById = async (req, res) => {
  const dispatchHistory = await DispatchHistory.findById(req.params.id);
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