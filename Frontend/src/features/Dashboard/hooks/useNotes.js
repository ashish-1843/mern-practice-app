import { useContext } from "react";
import { NotesContext } from "../notes.context";
import { createNote, getNotes, updateNote, deleteNote } from "../services/notes.api";
import { useParams } from "react-router";


export const useNotes = () => {
    const context = useContext(NotesContext);
    const { loading, setLoading, notes, setNotes } = context;

    const handleCreateNote = async ({ title, description }) => {
        setLoading(true);
        try {
            const data = await createNote({ title, description })
            setNotes(data.notes);
            return data;
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const handleGetNotes = async () => {
        setLoading(true);

        try {
            const data = await getNotes();
            setNotes(data.notes);
            return data;
        } catch (err) {
            throw err
        } finally {
            setLoading(false);
        }
    }

    const handleUpdateNote = async (noteId, { title, description }) => {
        setLoading(true);
        try {
            const data = await updateNote(noteId, { title, description });
             setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note._id === noteId
                    ? { ...note, title, description }
                    : note
            )
        );
            return data;
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteNote = async (noteId) =>{
        setLoading(true);
        try{
            const data = await deleteNote(noteId);
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
            return data;
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return {
        loading, 
        notes,
        handleCreateNote,
        handleGetNotes,
        handleUpdateNote,
        handleDeleteNote
    }


}