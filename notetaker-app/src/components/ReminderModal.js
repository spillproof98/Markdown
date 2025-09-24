import React, { useState } from 'react';

const ReminderModal = ({ isOpen, onClose, onSet }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !time) {
      setError('Please select both date and time');
      return;
    }

    const reminderDate = new Date(`${date}T${time}`);
    if (reminderDate < new Date()) {
      setError('Reminder must be in the future');
      return;
    }

    onSet(reminderDate);
    setDate('');
    setTime('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Add Reminder</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            style={inputStyle}
          />
          {error && <p style={{ color: 'red', marginBottom: 10 }}>{error}</p>}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={cancelButtonStyle}
            >
              Cancel
            </button>
            <button type="submit" style={addButtonStyle}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  background: 'white',
  padding: 20,
  borderRadius: 8,
  width: '90%',
  maxWidth: 400,
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
};

const inputStyle = {
  marginBottom: 12,
  width: '100%',
  padding: 8,
  border: '1px solid #ddd',
  borderRadius: 4,
};

const cancelButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#aaa',
  color: 'white',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  marginRight: 8,
};

const addButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#3182ce',
  color: 'white',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
};

export default ReminderModal;
