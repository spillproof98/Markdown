import axios from 'axios';

const API_URL =
  process.env.REACT_APP_API_URL_SEARCH || 'http://localhost:5000/api/search';

export const searchNotes = (query, type = 'keyword', token) =>
  axios
    .get(API_URL, {
      params: { q: query, type },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
