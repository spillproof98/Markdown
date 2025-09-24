import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('keyword');

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query, type);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ marginBottom: 20, display: 'flex', gap: 10 }}>
      <input
        type="text"
        placeholder="Search notes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          flexGrow: 1,
          padding: 10,
          fontSize: 16,
          borderRadius: 4,
          border: '1px solid #ccc',
        }}
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={{
          padding: 10,
          borderRadius: 4,
          border: '1px solid #ccc',
          minWidth: 140,
        }}
      >
        <option value="keyword">Keyword Search</option>
        <option value="title">Title Only</option>
        <option value="content">Content Only</option>
        <option value="date">By Date</option>
      </select>

      <button
        onClick={handleSearch}
        style={{
          padding: '10px 20px',
          backgroundColor: '#3182ce',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
