import api from './api';

export const registerUser = async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
};
export const loginUser = async (userData) => {
    const response = await api.post('/login', userData);
    return response.data;
};
export const getUserProfile = async () => {
    const response = await api.get('/profile');
    return response.data;
};
export const updateUserProfile = async (userData) => {
    const response = await api.put('/profile', userData);
    return response.data;
};