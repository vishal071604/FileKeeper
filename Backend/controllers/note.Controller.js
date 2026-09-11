
import Note from "../models/note.js";

// ================= CREATE NOTE =================

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required"
      });
    }

    const note = await Note.create({
      title,
      content,
      userId: req.user.id
    });

    res.status(201).json({
      message: "Note created successfully",
      note
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating note"
    });
  }
};


// ================= GET NOTES =================

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.id,
      isDeleted: false
    }).sort({
      isPinned: -1,
      createdAt: -1
    });

    res.status(200).json(notes);

  } catch (error) {
    res.status(500).json({
      message: "Error getting notes"
    });
  }
};


// ================= GET DELETED NOTES =================

export const getDeletedNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.id,
      isDeleted: true
    });

    res.status(200).json(notes);

  } catch (error) {
    res.status(500).json({
      message: "Error getting deleted notes"
    });
  }
};


// ================= UPDATE NOTE =================

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    // Check note belongs to logged-in user
    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    if (note.isDeleted) {
      return res.status(400).json({
        message: "Deleted note cannot be updated"
      });
    }

    // Update title
    if (title) {
      note.title = title;
    }

    // Update content
    if (content) {
      note.content = content;
    }

    await note.save();

    res.status(200).json({
      message: "Note updated successfully",
      note
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating note"
    });
  }
};


// ================= DELETE NOTE =================

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    // Check ownership
    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    // Move note to trash
    note.isDeleted = true;

    await note.save();

    res.status(200).json({
      message: "Note moved to trash"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting note"
    });
  }
};


// ================= PIN / UNPIN NOTE =================

export const togglePinNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    // Check ownership
    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    if (note.isDeleted) {
      return res.status(400).json({
        message: "Cannot pin deleted note"
      });
    }

    // Change true to false or false to true
    note.isPinned = !note.isPinned;

    await note.save();

    res.status(200).json({
      message: note.isPinned
        ? "Note pinned"
        : "Note unpinned",
      note
    });

  } catch (error) {
    res.status(500).json({
      message: "Error pinning note"
    });
  }
};


// ================= SEARCH NOTES =================

export const searchNotes = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required"
      });
    }

    const notes = await Note.find({
      userId: req.user.id,
      isDeleted: false,

      $or: [
        {
          title: {
            $regex: query,
            $options: "i"
          }
        },
        {
          content: {
            $regex: query,
            $options: "i"
          }
        }
      ]
    });

    res.status(200).json(notes);

  } catch (error) {
    res.status(500).json({
      message: "Search failed"
    });
  }
};


// ================= RESTORE NOTE =================

export const restoreNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    // Check ownership
    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    // Restore note
    note.isDeleted = false;

    await note.save();

    res.status(200).json({
      message: "Note restored successfully",
      note
    });

  } catch (error) {
    res.status(500).json({
      message: "Restore failed"
    });
  }
};


// ================= PERMANENT DELETE =================

export const permanentDeleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.id,
      isDeleted: true
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found in trash"
      });
    }

    // Permanently remove from MongoDB
    await note.deleteOne();

    res.status(200).json({
      message: "Note permanently deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: "Permanent delete failed"
    });
  }
};

