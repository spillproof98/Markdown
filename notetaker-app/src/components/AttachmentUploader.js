import React, { useState } from "react";
import axios from "axios";

const AttachmentUploader = ({ noteId, onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile || !noteId) {
      setError("Please select a note first.");
      return;
    }

    setFile(selectedFile);
    setError("");
    setUploading(true);

    try {
      // Step 1: Upload file
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await axios.post(
        "http://localhost:5000/api/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const fileUrl = res.data.url;

      const updateRes = await axios.put(
        `http://localhost:5000/api/notes/${noteId}`,
        { $push: { attachments: fileUrl } },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (onUpload) onUpload(updateRes.data.attachments);

    } catch (err) {
      console.error("Attachment upload failed:", err.response?.data || err.message);
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginTop: 10 }}>
      <input
        type="file"
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
        onChange={handleFileChange}
      />
      {uploading && <p>Uploading...</p>}
      {file && !uploading && file.type.startsWith("image/") && (
        <img
          src={URL.createObjectURL(file)}
          alt="preview"
          style={{ marginTop: 10, maxWidth: 200, borderRadius: 4 }}
        />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AttachmentUploader;
