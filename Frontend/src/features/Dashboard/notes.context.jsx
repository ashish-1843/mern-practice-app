import { createContext, useState } from "react";


export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState(null);

    return (
        <NotesContext.Provider value={{ loading, setLoading, notes, setNotes }}>
            {children}
        </NotesContext.Provider>
    )
}