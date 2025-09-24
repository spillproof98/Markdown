import React from 'react';

const templates = [
  {
    id: 1,
    title: 'Project Plan',
    content: `<h2>Project Plan</h2>
    <p><strong>Goals:</strong></p>
    <ul><li>Define objectives</li><li>Set milestones</li></ul>
    <p><strong>Timeline:</strong> </p>
    <p><strong>Tasks:</strong></p>`,
  },
  {
    id: 2,
    title: 'Meeting Notes',
    content: `<h2>Meeting Notes</h2>
    <p><strong>Participants:</strong></p>
    <p><strong>Agenda:</strong></p>
    <ul><li>Topic 1</li><li>Topic 2</li></ul>
    <p><strong>Decisions:</strong></p>`,
  },
  {
    id: 3,
    title: 'Daily Journal',
    content: `<h2>Daily Journal</h2>
    <p><strong>Date:</strong></p>
    <p><strong>Highlights:</strong></p>
    <p><strong>Challenges:</strong></p>
    <p><strong>Gratitude:</strong></p>`,
  },
];

const TemplateModal = ({ isOpen, onClose, onInsert }) => {
  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3 style={{ marginTop: 0 }}>📄 Choose a Template</h3>
        <div style={{ margin: '15px 0' }}>
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onInsert(template.content);
                onClose();
              }}
              style={templateCard}
            >
              <h4 style={{ margin: '0 0 5px 0' }}>{template.title}</h4>
              <p style={{ margin: 0, color: '#555', fontSize: 14 }}>
                {template.content.replace(/<[^>]+>/g, '').slice(0, 60)}...
              </p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'right' }}>
          <button onClick={onClose} style={closeButton}>
            Close
          </button>
        </div>
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
  maxWidth: 420,
  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
};

const templateCard = {
  cursor: 'pointer',
  border: '1px solid #ddd',
  borderRadius: 6,
  padding: 12,
  marginBottom: 10,
  background: '#f9f9f9',
  transition: 'background 0.2s',
};

const closeButton = {
  padding: '8px 16px',
  backgroundColor: '#3182ce',
  color: 'white',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
};

export default TemplateModal;
