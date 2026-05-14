// import React hooks
import { useEffect, useState } from "react";
// import toast notifications
import { toast } from "react-toastify";
// import icons from react-icons
import {
  FaTrash, // trash icon
  FaThumbtack, // pin icon
  FaSearch, // search icon
  FaUndo, // restore icon
  FaRegStickyNote, // notes icon
  FaTrashAlt, // trash bin icon
  FaEdit, // edit icon
  FaSave, // save icon
  FaTimes, // cancel icon
} from "react-icons/fa";
// import custom axios instance
import API from "../api/axios";
// main dashboard component
export default function Dashboard() {
  // ---------------- STATES ----------------
  // store all notes
  const [notes, setNotes] = useState([]);
  // create note title input
  const [title, setTitle] = useState("");
  // create note content input
  const [content, setContent] = useState("");
  // search query input
  const [query, setQuery] = useState("");
  // current page view
  // "active" -> active notes
  // "trash" -> deleted notes
  const [view, setView] = useState("active");
  // store editing note id
  const [editId, setEditId] = useState(null);
  // editing title input
  const [editTitle, setEditTitle] = useState("");
  // editing content input
  const [editContent, setEditContent] = useState("");

  // ---------------- FETCH NOTES ----------------

  // function to get notes from backend
  const fetchNotes = async () => {
    try {
      // if active view -> fetch active notes
      // else fetch deleted notes
      const endpoint = view === "active" ? "/notes" : "/notes/deleted";
      // API request
      const res = await API.get(endpoint);
      // store notes in state
      setNotes(res.data);
    } catch (error) {
      // show error toast
      toast.error(error.response?.data?.message || "Failed to load notes");
    }
  };

  // useEffect runs automatically
  // whenever "view" changes
  useEffect(() => {
    fetchNotes();
  }, [view]);

  // ---------------- CREATE NOTE ----------------

  // create note function
  const createNote = async (e) => {
    // stop page refresh
    e.preventDefault();

    // check empty fields
    if (!title.trim() || !content.trim()) {
      // trim removes spaces
      return toast.warn("Fields cannot be empty");
    }

    try {
      // send data to backend
      const res = await API.post("/notes", {
        title,
        content,
      });

      // success message
      toast.success(res.data.message || "Note created");

      // clear input fields
      setTitle("");
      setContent("");

      // reload notes
      fetchNotes();
    } catch (error) {
      // error message
      toast.error(error.response?.data?.message || "Create failed");
    }
  };

  // ---------------- START EDIT ----------------

  // when user clicks edit button
  const startEdit = (note) => {
    // store note id
    setEditId(note._id);

    // store old title
    setEditTitle(note.title);

    // store old content
    setEditContent(note.content);
  };

  // ---------------- CANCEL EDIT ----------------

  const cancelEdit = () => {
    // remove editing mode
    setEditId(null);

    // clear edit title
    setEditTitle("");

    // clear edit content
    setEditContent("");
  };

  // ---------------- UPDATE NOTE ----------------

  const updateNote = async (id) => {
    // check empty fields
    if (!editTitle.trim() || !editContent.trim()) {
      return toast.warn("Fields cannot be empty");
    }

    try {
      // send updated data
      const res = await API.put(`/notes/${id}`, {
        // new title
        title: editTitle,

        // new content
        content: editContent,
      });

      // success message
      toast.success(res.data.message || "Note updated");

      // stop editing mode
      cancelEdit();

      // reload notes
      fetchNotes();
    } catch (error) {
      // error toast
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  // ---------------- DELETE NOTE ----------------

  // soft delete note
  const deleteNote = async (id) => {
    try {
      // delete request
      const res = await API.delete(`/notes/${id}`);

      // success message
      toast.success(res.data.message || "Moved to trash");

      // reload notes
      fetchNotes();
    } catch (error) {
      // error message
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  // ---------------- RESTORE NOTE ----------------

  const restoreNote = async (id) => {
    try {
      // restore request
      const res = await API.put(`/notes/restore/${id}`);

      // success message
      toast.success(res.data.message || "Note restored");

      // reload notes
      fetchNotes();
    } catch (error) {
      // error message
      toast.error(error.response?.data?.message || "Restore failed");
    }
  };

  // ---------------- PERMANENT DELETE ----------------

  const permanentDeleteNote = async (id) => {
    try {
      // permanently delete note
      const res = await API.delete(`/notes/permanent/${id}`);

      // success toast
      toast.success(res.data.message || "Note permanently deleted");

      // reload notes
      fetchNotes();
    } catch (error) {
      // error toast
      toast.error(error.response?.data?.message || "Permanent delete failed");
    }
  };

  // ---------------- PIN NOTE ----------------

  const pinNote = async (id) => {
    try {
      // pin/unpin request
      const res = await API.put(`/notes/pin/${id}`);

      // success message
      toast.success(res.data.message || "Pin updated");

      // reload notes
      fetchNotes();
    } catch (error) {
      // error toast
      toast.error(error.response?.data?.message || "Pin failed");
    }
  };

  // ---------------- SEARCH NOTES ----------------

  const searchNotes = async () => {
    // if search empty -> fetch all notes
    if (!query.trim()) return fetchNotes();

    try {
      // send query to backend
      const res = await API.get(
        `/notes/search?query=${encodeURIComponent(query)}`,
      );

      // store search results
      setNotes(res.data);
    } catch (error) {
      // error message
      toast.error(error.response?.data?.message || "Search failed");
    }
  };

  // ---------------- UI ----------------

  return (
    // full page container
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* top heading section */}
      <div className="flex flex-col items-center mb-10">
        {/* title */}
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {/* show different heading */}
          {view === "active" ? "Notes Dashboard" : "Trash Bin"}
        </h1>

        {/* active/trash buttons */}
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
          {/* active button */}
          <button
            onClick={() => setView("active")}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 transition ${
              view === "active" ? "bg-blue-600" : "text-slate-400"
            }`}
          >
            <FaRegStickyNote /> Active
          </button>

          {/* trash button */}
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

      {/* main container */}
      <div className="max-w-5xl mx-auto">
        {/* show create form only in active page */}
        {view === "active" && (
          <div className="mb-10">
            {/* search section */}
            <div className="flex gap-2 max-w-xl mx-auto mb-6">
              {/* search input */}
              <input
                className="flex-1 bg-slate-900 border border-slate-800 p-3 rounded-xl outline-none focus:border-blue-500"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              {/* search button */}
              <button
                onClick={searchNotes}
                className="bg-blue-600 p-3 rounded-xl"
              >
                <FaSearch />
              </button>
            </div>

            {/* create note form */}
            <form
              onSubmit={createNote}
              className="bg-slate-900 p-6 rounded-2xl border border-slate-800 max-w-xl mx-auto"
            >
              {/* title input */}
              <input
                className="w-full bg-slate-800 p-3 rounded-lg mb-3 outline-none"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {/* content textarea */}
              <textarea
                className="w-full bg-slate-800 p-3 rounded-lg mb-3 h-24 outline-none"
                placeholder="Content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              {/* add note button */}
              <button className="w-full bg-blue-600 py-3 rounded-lg font-bold">
                Add Note
              </button>
            </form>
          </div>
        )}

        {/* notes grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* if notes exist */}
          {notes.length > 0 ? (
            // loop through notes
            notes.map((note) => (
              <div
                key={note._id}
                className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between"
              >
                {/* if editing mode */}
                {editId === note._id ? (
                  <>
                    {/* edit title */}
                    <input
                      className="w-full bg-slate-800 p-3 rounded-lg mb-3 outline-none"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />

                    {/* edit content */}
                    <textarea
                      className="w-full bg-slate-800 p-3 rounded-lg mb-3 h-24 outline-none"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />

                    {/* save/cancel buttons */}
                    <div className="flex gap-3">
                      {/* save */}
                      <button
                        onClick={() => updateNote(note._id)}
                        className="text-green-500 hover:bg-green-500/10 p-2 rounded-lg flex items-center gap-2"
                      >
                        <FaSave /> Save
                      </button>

                      {/* cancel */}
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
                    {/* note details */}
                    <div>
                      {/* title and pin */}
                      <div className="flex justify-between items-start mb-2">
                        {/* note title */}
                        <h3 className="text-xl font-semibold">{note.title}</h3>

                        {/* pin button */}
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

                      {/* note content */}
                      <p className="text-slate-400 text-sm mb-4">
                        {note.content}
                      </p>
                    </div>

                    {/* action buttons */}
                    <div>
                      {/* active note buttons */}
                      {view === "active" ? (
                        <div className="flex gap-3 flex-wrap">
                          {/* edit */}
                          <button
                            onClick={() => startEdit(note)}
                            className="text-cyan-500 hover:bg-cyan-500/10 p-2 rounded-lg flex items-center gap-2 transition"
                          >
                            <FaEdit /> Edit
                          </button>

                          {/* trash */}
                          <button
                            onClick={() => deleteNote(note._id)}
                            className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg flex items-center gap-2 transition"
                          >
                            <FaTrash /> Trash
                          </button>
                        </div>
                      ) : (
                        // trash buttons
                        <div className="flex gap-3 flex-wrap">
                          {/* restore */}
                          <button
                            onClick={() => restoreNote(note._id)}
                            className="text-green-500 hover:bg-green-500/10 p-2 rounded-lg flex items-center gap-2 transition"
                          >
                            <FaUndo /> Restore
                          </button>

                          {/* permanent delete */}
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
            // if no notes found
            <p className="col-span-full text-center text-slate-500 py-10">
              No notes found here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
