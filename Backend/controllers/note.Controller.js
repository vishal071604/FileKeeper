import Note from "../models/note.js";

// CREATE NOTE
export const createNote = async (req, res) => {
  try {
    const { title, content, isPinned } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const note = await Note.create({
      title,
      content,
      userId: req.user.id,
      isPinned: isPinned || false,
      isDeleted: false
    });

    res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating note",
      error: error.message,
    });
  }
};

// GET NOTES
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.id,
      isDeleted: false,
    }).sort({ isPinned: -1, createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get only deleted nodes
export const getDeletedNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.id,
      isDeleted: true,
    }).sort({ updatedAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE NOTE
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    if (note.isDeleted) {
      return res.status(400).json({
        message: "Deleted note cannot be updated",
      });
    }

    let message = "Note updated successfully";

    if (title && !content) {
      note.title = title;
      message = "Title updated successfully";
    } else if (!title && content) {
      note.content = content;
      message = "Content updated successfully";
    } else if (title && content) {
      note.title = title;
      note.content = content;
      message = "Note updated successfully";
    }

    await note.save();

    res.status(200).json({
      message,
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating note",
      error: error.message,
    });
  }
};

// DELETE NOTE
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (note.isDeleted) {
      return res.status(400).json({
        message: "This note has been deleted cannot been deleted again",
      });
    }

    note.isDeleted = true;
    await note.save();

    res.json({ message: "Note moved to trash" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PIN / UNPIN NOTE

export const togglePinNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    // ownership check
    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    if (note.isDeleted) {
      return res.status(400).json({
        message: "Cannot pin deleted note",
      });
    }

    // toggle pin
    note.isPinned = !note.isPinned;
    await note.save();

    res.json({
      message: note.isPinned ? "Note pinned" : "Note unpinned",
      note,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//serach notes
export const searchNotes = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const notes = await Note.find({
      userId: req.user.id,
      isDeleted: false,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    }).sort({
      isPinned: -1,
      createdAt: -1,
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: "Search failed",
      error: error.message,
    });
  }
};

// restore notes
export const restoreNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    // IMPORTANT CHECK
    if (!note.isDeleted) {
      return res.status(400).json({
        message: "This note is already active",
      });
    }

    note.isDeleted = false;
    await note.save();

    res.status(200).json({
      message: "Note restored successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Restore failed",
      error: error.message,
    });
  }
};


export const permanentDeleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.id,
      isDeleted: true,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found in trash",
      });
    }

    await note.deleteOne();

    res.json({
      message: "Note permanently deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Permanent delete failed",
      error: error.message,
    });
  }
};