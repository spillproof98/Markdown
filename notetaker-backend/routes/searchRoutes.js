const express = require('express');
const auth = require('../middleware/authMiddleware');
const Note = require('../models/Note');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  const { q, type } = req.query;

  try {
    let filter = { user: req.user.id };

    if (q) {
      if (type === 'title') {
        filter.title = { $regex: q, $options: 'i' };
      } else if (type === 'content') {
        filter.content = { $regex: q, $options: 'i' };
      } else {
        filter.$or = [
          { title: { $regex: q, $options: 'i' } },
          { content: { $regex: q, $options: 'i' } },
        ];
      }
    }

    const notes = await Note.find(filter);
    res.json(notes);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
