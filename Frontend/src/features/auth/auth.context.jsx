import { createContext, useEffect, useState } from "react";
import { restoreSession } from "./services/auth.api";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const restore = async () => {
            try {
                const data = await restoreSession();
                setUser(data.user);
            } catch (err) {
                setUser(null);
                console.log(err)
            } finally {
                setLoading(false);
            }
        };

        restore();
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading, error, setError }}>
            {children}
        </AuthContext.Provider>
    );
};