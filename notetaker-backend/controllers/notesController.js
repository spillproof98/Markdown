const Note = require("../models/Note");

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      updatedAt: -1,
    });
    res.json(notes);
  } catch (err) {
    console.error("Error in getNotes:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { title, content, reminder, attachments } = req.body;

    const note = new Note({
      user: req.user.id,
      title,
      content,
      reminder: reminder || null,
      attachments: attachments || [],
    });

    await note.save();
    res.json(note);
  } catch (err) {
    console.error("Error in createNote:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, content, reminder, attachments } = req.body;
    const note = await Note.findById(req.params.id);

    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (reminder !== undefined) note.reminder = reminder;

    if (attachments && attachments.length > 0) {
      note.attachments = [...note.attachments, ...attachments];
    }

    note.updatedAt = Date.now();

    await note.save();
    res.json(note);
  } catch (err) {
    console.error("Error in updateNote:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Note not found" });
    }

    await note.deleteOne();
    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error("Error in deleteNote:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
