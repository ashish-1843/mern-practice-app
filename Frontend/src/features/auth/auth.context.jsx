import { createContext, useEffect, useState } from "react";
import { restoreSession } from "./services/auth.api";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {

        let isMounted = true;
        const restore = async () => {
            try {
                const data = await restoreSession();
                if (isMounted) {
                    setUser(data.user);
                    setError(null);
                }
            } catch (err){
                 if (isMounted) {
                    setUser(null);
                    setError(null);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        restore();

        return () => {
            isMounted = false;
        };
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading, error, setError }}>
            {children}
        </AuthContext.Provider>
    );
};