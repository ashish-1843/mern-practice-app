const noteModel = require('../models/note.model');

/**
 * @route /api/user/create-note
 * @description Create a new note for the authenticated user
 * @access Private      
 */

const createNote = async (req, res) => {

    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }


        const newNote = new noteModel({
            user: req.user.id,
            title,
            description
        });

        const savedNote = await newNote.save();
        return res.status(201).json(savedNote);
    } catch (error) {
        return res.status(500).json({ message: "Error creating note.", error });
    }
}

/**
 * @route /api/user/get-notes
 * @description Get all notes for the authenticated user
 * @access Private      
 */

const getNotes = async (req, res) => {
    try {
        const notes = await noteModel.find({ user: req.user.id });
        return res.status(200).json({ message: "Notes fetched successfully.", notes });

    } catch (error) {
        return res.status(500).json({ message: "Error fetching notes.", error });
    }
}

/**
 * @route /api/user/update-note/:noteId
 * @description Update a note for the authenticated user
 * @access Private      
 */

const updateNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const { title, description } = req.body;

        const note = await noteModel.findOne({ _id: noteId, user: req.user.id });

        if (!note) {
            return res.status(404).json({
                message:
                    "Note not found."
            })
        }

        note.title = title;
        note.description = description;
        const updateNote = await note.save();

        return res.status(200).json({
            message: "Note updated successfully.",
            note: updateNote
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error updating note.",
            error: err
        });
    }
}

/**
 * @route /api/user/delete-note/:noteId
 * @description Delete a note for the authenticated user
 * @access Private          
 */

const deleteNote = async (req, res) => {
    const { noteId } = req.params;

    try {
        const note = await noteModel.findOneAndDelete({ _id: noteId, user: req.user.id });

        if (!note) {
            return res.status(404).json({
                message: "Note not found."
            })
        }

        return res.status(200).json({
            message: "Note deleted successfully."
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error deleting note.",
            error: err
        })
    }
}

module.exports = { createNote, getNotes, updateNote, deleteNote };