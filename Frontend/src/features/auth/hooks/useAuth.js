import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { forgotPassword, login, logout, register, resetPassword, verifyEmail } from "../services/auth.api";


export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading, error, setError } = context;

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);

        try {
            const data = await register({ username, email, password });
            setUser(data.user);
            return data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const handleLogin = async ({ email, password }) => {
        setLoading(true);

        try {
            const data = await login({ email, password });
            setUser(data.user);
            return data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);

        try {
            const data = await logout();
            setUser(null);
            return data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const handleVerifyEmail = async ({ otp }) => {
        setLoading(true);

        try {
            const data = await verifyEmail({ otp });
            setUser(data.user);
            return data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const handleForgotPassword = async ({ email }) => {
        setLoading(true);

        try {
            const data = await forgotPassword({ email });
            setUser(data.user);
            return data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const handleNewPassword = async ({ email, newPassword }) => {
        setLoading(true);
        try {
            const data = await resetPassword({ email, newPassword });
            setUser(data.user);
            return data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout,
        handleVerifyEmail,
        handleForgotPassword,
        handleNewPassword
    }
}