import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchNotes, deleteNote, createNote, updateNote } from "../api/notes";
import { searchNotes } from "../api/search";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import NoteEditor from "../components/NoteEditor";
import TemplateModal from "../components/TemplateModal";

const Dashboard = () => {
  const { token, logout } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [searchParams, setSearchParams] = useState({
    query: "",
    type: "keyword",
  });

  const loadNotes = async () => {
    try {
      const data = searchParams.query
        ? await searchNotes(searchParams.query, searchParams.type, token)
        : await fetchNotes(token);

      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        logout();
      } else {
        alert("Search failed, please try again.");
      }
    }
  };

  useEffect(() => {
    if (!token) return;
    loadNotes();
  }, [token, searchParams]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this note?")) {
      await deleteNote(id, token);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    }
  };

  const handleSave = async (note) => {
    try {
      if (selectedNote && selectedNote._id) {
        const updated = await updateNote(selectedNote._id, note, token);
        setNotes((prev) =>
          prev.map((n) => (n._id === updated._id ? updated : n))
        );
      } else {
        const newNote = await createNote(note, token);
        setNotes((prev) => [...prev, newNote]);
      }
      setSelectedNote(null);
    } catch (err) {
      console.error("Error saving note:", err.response?.data || err.message);
      alert("Failed to save note.");
    }
  };

  const handleUpdate = (updatedNote) => {
    setNotes((prev) =>
      prev.map((n) => (n._id === updatedNote._id ? updatedNote : n))
    );
  };

  return (
    <div style={{ maxWidth: 1000, margin: "auto", padding: 20 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h1>EverNotes</h1>
        <button onClick={logout} style={{ padding: "8px 16px" }}>
          Logout
        </button>
      </header>

      <SearchBar onSearch={(query, type) => setSearchParams({ query, type })} />

      <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
        <button onClick={() => setSelectedNote({})}>➕ New Note</button>
        <button onClick={() => setShowTemplateModal(true)}>📄 Templates</button>
      </div>

      {selectedNote && (
        <NoteEditor
          existingNote={selectedNote}
          onSave={handleSave}
          onCancel={() => setSelectedNote(null)}
        />
      )}

      <NoteList
        notes={notes}
        onSelect={setSelectedNote}
        onDelete={handleDelete}
        token={token} 
        onUpdate={handleUpdate}
      />

      <TemplateModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onInsert={(content) => {
          setSelectedNote({ title: "New from Template", content });
        }}
      />
    </div>
  );
};

export default Dashboard;
