import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import AttachmentUploader from "./AttachmentUploader";

const NoteEditor = ({ existingNote = {}, onSave, onCancel }) => {
  const [title, setTitle] = useState(existingNote.title || "");
  const [reminder, setReminder] = useState(existingNote.reminder || "");
  const [attachments, setAttachments] = useState(
    existingNote.attachments || []
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({ nested: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: existingNote.content || "<p>Start writing...</p>",
  });

  useEffect(() => {
    if (editor && existingNote.content) {
      editor.commands.setContent(existingNote.content);
    }
  }, [existingNote, editor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = editor.getHTML();
    onSave({ title, content, reminder, attachments });
  };

  const handleAttachmentUpload = (url) => {
    setAttachments((prev) => [...prev, url]);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 800, margin: "auto" }}>
      {/* Title */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{
          width: "100%",
          padding: 12,
          fontSize: 18,
          marginBottom: 15,
          borderRadius: 5,
          border: "1px solid #ddd",
        }}
      />

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 5,
          padding: 10,
          marginBottom: 15,
          minHeight: 200,
        }}
      >
        <EditorContent editor={editor} />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label>
          <strong>Reminder:</strong>
        </label>
        <input
          type="datetime-local"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          style={{
            marginLeft: 10,
            padding: 8,
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label>
          <strong>Attachments:</strong>
        </label>
        <AttachmentUploader onUpload={handleAttachmentUpload} />
        {attachments.length > 0 && (
          <ul>
            {attachments.map((file, idx) => (
              <li key={idx}>
                <a href={file} target="_blank" rel="noreferrer">
                  {file}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="submit"
        style={{
          marginRight: 10,
          padding: "10px 20px",
          backgroundColor: "#3182ce",
          color: "#fff",
          border: "none",
          borderRadius: 4,
        }}
      >
        Save
      </button>
      <button
        type="button"
        onClick={onCancel}
        style={{
          padding: "10px 20px",
          backgroundColor: "#aaa",
          color: "#fff",
          border: "none",
          borderRadius: 4,
        }}
      >
        Cancel
      </button>
    </form>
  );
};

export default NoteEditor;
