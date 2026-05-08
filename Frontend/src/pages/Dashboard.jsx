import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaTrash,
  FaThumbtack,
  FaSearch,
  FaUndo,
  FaRegStickyNote,
  FaTrashAlt,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

import API from "../api/axios";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [query, setQuery] = useState("");
  const [view, setView] = useState("active");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const fetchNotes = async () => {
    try {
      const endpoint = view === "active" ? "/notes" : "/notes/deleted";
      const res = await API.get(endpoint);
      setNotes(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [view]);

  const createNote = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return toast.warn("Fields cannot be empty");
    }

    try {
      const res = await API.post("/notes", { title, content });
      toast.success(res.data.message || "Note created");
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (error) {
      toast.error(error.response?.data?.message || "Create failed");
    }
  };

  const startEdit = (note) => {
    setEditId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditContent("");
  };

  const updateNote = async (id) => {
    if (!editTitle.trim() || !editContent.trim()) {
      return toast.warn("Fields cannot be empty");
    }

    try {
      const res = await API.put(`/notes/${id}`, {
        title: editTitle,
        content: editContent,
      });

      toast.success(res.data.message || "Note updated");
      cancelEdit();
      fetchNotes();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await API.delete(`/notes/${id}`);
      toast.success(res.data.message || "Moved to trash");
      fetchNotes();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const restoreNote = async (id) => {
    try {
      const res = await API.put(`/notes/restore/${id}`);
      toast.success(res.data.message || "Note restored");
      fetchNotes();
    } catch (error) {
      toast.error(error.response?.data?.message || "Restore failed");
    }
  };

  const permanentDeleteNote = async (id) => {
    try {
      const res = await API.delete(`/notes/permanent/${id}`);
      toast.success(res.data.message || "Note permanently deleted");
      fetchNotes();
    } catch (error) {
      toast.error(error.response?.data?.message || "Permanent delete failed");
    }
  };

  const pinNote = async (id) => {
    try {
      const res = await API.put(`/notes/pin/${id}`);
      toast.success(res.data.message || "Pin updated");
      fetchNotes();
    } catch (error) {
      toast.error(error.response?.data?.message || "Pin failed");
    }
  };

  const searchNotes = async () => {
    if (!query.trim()) return fetchNotes();

    try {
      const res = await API.get(
        `/notes/search?query=${encodeURIComponent(query)}`
      );
      setNotes(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Search failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {view === "active" ? "Notes Dashboard" : "Trash Bin"}
        </h1>

        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setView("active")}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 transition ${
              view === "active" ? "bg-blue-600" : "text-slate-400"
            }`}
          >
            <FaRegStickyNote /> Active
          </button>

          <button
            onClick={() => setView("trash")}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 transition ${
              view === "trash" ? "bg-red-600" : "text-slate-400"
            }`}
          >
            <FaTrashAlt /> Trash
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {view === "active" && (
          <div className="mb-10">
            <div className="flex gap-2 max-w-xl mx-auto mb-6">
              <input
                className="flex-1 bg-slate-900 border border-slate-800 p-3 rounded-xl outline-none focus:border-blue-500"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <button
                onClick={searchNotes}
                className="bg-blue-600 p-3 rounded-xl"
              >
                <FaSearch />
              </button>
            </div>

            <form
              onSubmit={createNote}
              className="bg-slate-900 p-6 rounded-2xl border border-slate-800 max-w-xl mx-auto"
            >
              <input
                className="w-full bg-slate-800 p-3 rounded-lg mb-3 outline-none"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                className="w-full bg-slate-800 p-3 rounded-lg mb-3 h-24 outline-none"
                placeholder="Content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <button className="w-full bg-blue-600 py-3 rounded-lg font-bold">
                Add Note
              </button>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note._id}
                className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between"
              >
                {editId === note._id ? (
                  <>
                    <input
                      className="w-full bg-slate-800 p-3 rounded-lg mb-3 outline-none"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />

                    <textarea
                      className="w-full bg-slate-800 p-3 rounded-lg mb-3 h-24 outline-none"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />

                    <div className="flex gap-3">
                      <button
                        onClick={() => updateNote(note._id)}
                        className="text-green-500 hover:bg-green-500/10 p-2 rounded-lg flex items-center gap-2"
                      >
                        <FaSave /> Save
                      </button>

                      <button
                        onClick={cancelEdit}
                        className="text-slate-400 hover:bg-slate-800 p-2 rounded-lg flex items-center gap-2"
                      >
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{note.title}</h3>

                        {view === "active" && (
                          <button
                            onClick={() => pinNote(note._id)}
                            className={
                              note.isPinned
                                ? "text-yellow-400"
                                : "text-slate-600"
                            }
                          >
                            <FaThumbtack />
                          </button>
                        )}
                      </div>

                      <p className="text-slate-400 text-sm mb-4">
                        {note.content}
                      </p>
                    </div>

                    <div>
                      {view === "active" ? (
                        <div className="flex gap-3 flex-wrap">
                          <button
                            onClick={() => startEdit(note)}
                            className="text-cyan-500 hover:bg-cyan-500/10 p-2 rounded-lg flex items-center gap-2 transition"
                          >
                            <FaEdit /> Edit
                          </button>

                          <button
                            onClick={() => deleteNote(note._id)}
                            className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg flex items-center gap-2 transition"
                          >
                            <FaTrash /> Trash
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-3 flex-wrap">
                          <button
                            onClick={() => restoreNote(note._id)}
                            className="text-green-500 hover:bg-green-500/10 p-2 rounded-lg flex items-center gap-2 transition"
                          >
                            <FaUndo /> Restore
                          </button>

                          <button
                            onClick={() => permanentDeleteNote(note._id)}
                            className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg flex items-center gap-2 transition"
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-slate-500 py-10">
              No notes found here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}