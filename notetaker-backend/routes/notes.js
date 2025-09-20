const express = require('express');
const {
  getNotes, getNote, createNote, updateNote, deleteNote, searchNotes
} = require('../controllers/noteController');
const router = express.Router();

router.get('/', getNotes);
router.get('/search', searchNotes);
router.get('/:id', getNote);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
