const Note = require('../models/Note');

exports.searchNotes = async (req, res) => {
  try {
    const { q, type } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }
    const filter = { user: req.user.id };

    if (type === "title") {
      filter.title = { $regex: q, $options: "i" };
    } else if (type === "content") {
      filter.content = { $regex: q, $options: "i" };
    } else {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ];
    }

    const notes = await Note.find(filter);
    res.json(notes);
  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
