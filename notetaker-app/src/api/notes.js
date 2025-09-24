import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL_NOTES || 'http://localhost:5000/api/notes';


export const fetchNotes = (token) =>
  axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);

export const createNote = (noteData, token) =>
  axios.post(API_URL, noteData, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);

export const updateNote = (noteId, noteData, token) =>
  axios.put(`${API_URL}/${noteId}`, noteData, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);

export const deleteNote = (noteId, token) =>
  axios.delete(`${API_URL}/${noteId}`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
