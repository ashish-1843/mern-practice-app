import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mern-practice-app-mf0a.onrender.com',
    withCredentials: true
});

const getAccessToken = () => localStorage.getItem("accessToken");

api.interceptors.request.use((config) => {
    const token = getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


export async function createNote({title, description}){
    const response = await api.post('/api/user/create-note',
        {
            title,
            description
        }
    );
    return response.data;
}          

export async function getNotes(){
    const response = await api.get('/api/user/get-notes');
    return response.data;
}

export async function updateNote(noteId, {title, description}){
    const response = await api.put(`/api/user/update-note/${noteId}`,
        {
            title, 
            description
        }
    );
    return response.data;
}


export async function deleteNote(noteId){
    const response = await api.delete(`/api/user/delete-note/${noteId}`);
    return response.data;
}