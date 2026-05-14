import express from "express";

import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  getDeletedNotes,
  restoreNote,
  togglePinNote,
  searchNotes,
  permanentDeleteNote,
} from "../controllers/note.Controller.js";

import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();


// ================= CREATE NOTE =================
router.post("/", isLoggedIn, createNote);


// ================= GET ACTIVE NOTES =================
router.get("/", isLoggedIn, getNotes);


// ================= SEARCH NOTES =================
router.get("/search", isLoggedIn, searchNotes);


// ================= GET DELETED NOTES =================
router.get("/deleted", isLoggedIn, getDeletedNotes);


// ================= RESTORE NOTE =================
router.put("/restore/:id", isLoggedIn, restoreNote);


// ================= PIN / UNPIN NOTE =================
router.put("/pin/:id", isLoggedIn, togglePinNote);


// ================= UPDATE NOTE =================
router.put("/:id", isLoggedIn, updateNote);


// ================= PERMANENT DELETE NOTE =================
router.delete("/permanent/:id",isLoggedIn,permanentDeleteNote);


// ================= MOVE NOTE TO TRASH =================
router.delete("/:id", isLoggedIn, deleteNote);


export default router;