import React from 'react';
import NoteEditor from '../components/NoteEditor';

const NoteDetail = ({ note = {}, onSave, onCancel }) => {
  const handleSave = (updatedNote) => {
    if (onSave) {
      onSave({ ...note, ...updatedNote });
    }
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: 'auto',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ marginBottom: 20 }}>
        {note._id ? "Edit Note" : "New Note"}
      </h2>

      <NoteEditor
        existingNote={note}
        onSave={handleSave}
        onCancel={onCancel}
      />
    </div>
  );
};

export default NoteDetail;
