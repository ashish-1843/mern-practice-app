import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://mern-practice-app-mf0a.onrender.com',
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

const refreshApi = axios.create({
    // baseURL: "https://mern-practice-app-mf0a.onrender.com",
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

const getAccessToken = () => localStorage.getItem("accessToken");

const setAccessToken = (token) => {
    if (token) {
        localStorage.setItem("accessToken", token);
    } else {
        localStorage.removeItem("accessToken");
    }
};

//Axios request interceptor is correct for attaching your access token to every request.
api.interceptors.request.use((config) => {
    const token = getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const isAuthRequest =
            originalRequest?.url?.includes("/api/auth/login") ||
            originalRequest?.url?.includes("/api/auth/register") ||
            originalRequest?.url?.includes("/api/auth/refresh");

        if (
            error.response?.status === 401 &&
            !originalRequest?._retry &&
            !isAuthRequest
        ) {
            originalRequest._retry = true;

            try {
                const response = await refreshApi.post("/api/auth/refresh");
                const newAccessToken = response.data.accessToken;

                setAccessToken(newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                setAccessToken(null);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export async function register({ username, email, password }) {
    const response = await api.post("/api/auth/register", {
        username,
        email,
        password
    });

    setAccessToken(response.data.accessToken);
    return response.data;
}

export async function login({ email, password }) {
    const response = await api.post("/api/auth/login", {
        email,
        password
    });

    setAccessToken(response.data.accessToken);
    return response.data;
}

export async function logout() {
    const response = await api.get("/api/auth/logout");
    setAccessToken(null);
    return response;
}

export async function getMe() {
    const response = await api.get("/api/auth/get-me");
    return response.data;
}

export async function verifyEmail({ otp }) {
    const response = await api.post("/api/auth/verify-email", { otp });
    return response.data;
}

export async function forgotPassword({ email }) {
    const responce = await api.post("/api/auth/forgot-password", { email });
    return responce.data;
}

export async function resetPassword({ email, newPassword }) {
    const response = await api.post(`/api/auth/reset-password/${email}`, { newPassword });
    return response.data;
}

export async function restoreSession() {
    try {
        const response = await refreshApi.post("/api/auth/refresh");
        setAccessToken(response.data.accessToken);

        const meResponse = await api.get("/api/auth/get-me");
        return meResponse.data;
    } catch (err) {
        setAccessToken(null);
        throw err;
    }
}

export { api }