const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
  const notes = await Note.find({}).sort({ updatedAt: -1 });
  res.json(notes);
};

exports.getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
};

exports.createNote = async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.status(201).json(note);
};

exports.updateNote = async (req, res) => {
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: Date.now() },
    { new: true }
  );
  res.json(note);
};

exports.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

exports.searchNotes = async (req, res) => {
  const q = req.query.query || "";
  const re = new RegExp(q, "i");
  const notes = await Note.find({ $or: [{ title: re }, { content: re }] });
  res.json(notes);
};
