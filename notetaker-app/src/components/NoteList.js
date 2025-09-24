import React, { useState } from "react";
import ReminderModal from "./ReminderModal";
import AttachmentUploader from "./AttachmentUploader";
import { updateNote } from "../api/notes";

const NoteList = ({ notes, onSelect, onDelete, token, onUpdate }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [showReminderModal, setShowReminderModal] = useState(false);

  const handleReminderSet = async (date) => {
    if (!selectedNote) return;
    const updated = await updateNote(
      selectedNote._id,
      { reminder: date },
      token
    );
    onUpdate(updated);
    setShowReminderModal(false);
    setSelectedNote(null);
  };

  const handleAttachmentUpload = async (note, url) => {
    const updated = await updateNote(
      note._id,
      { attachments: [...(note.attachments || []), url] },
      token
    );
    onUpdate(updated);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
        gap: 15,
        padding: 20,
      }}
    >
      {notes.map((note) => (
        <div
          key={note._id}
          style={{
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 15,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: 10 }}>{note.title}</h3>

          <div
            style={{
              flexGrow: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxHeight: 120,
            }}
            dangerouslySetInnerHTML={{ __html: note.content }}
          />

          {note.reminder && (
            <small style={{ color: "green" }}>
              Reminder: {new Date(note.reminder).toLocaleString()}
            </small>
          )}

          {note.attachments?.length > 0 && (
            <div>
              <strong>Attachments:</strong>
              <ul>
                {note.attachments.map((a, idx) => (
                  <li key={idx}>
                    <a href={a} target="_blank" rel="noreferrer">
                      {a}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={() => onSelect(note)}
              style={{
                background: "#3182ce",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(note._id)}
              style={{
                background: "#e53e3e",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>

          <div style={{ marginTop: 10 }}>
            <button
              onClick={() => {
                setSelectedNote(note);
                setShowReminderModal(true);
              }}
            >
              ⏰ Add Reminder
            </button>
            {/* <AttachmentUploader
              onUpload={(url) => handleAttachmentUpload(note, url)}
            /> */}
          </div>
        </div>
      ))}

      <ReminderModal
        isOpen={showReminderModal}
        onClose={() => setShowReminderModal(false)}
        onSet={handleReminderSet}
      />
    </div>
  );
};

export default NoteList;
