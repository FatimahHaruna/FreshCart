import api from './api';

export const getCart = async () => {
    const response = await api.get('/');
    return response.data;
};
export const addToCart = async (productId, quantity) => {
    const response = await api.post('/', {productId, quantity});
    return response.data;
};
export const updateCart = async (productId, quantity) => {
    const response = await api.put(`/${productId}`, {quantity});
    return response.data;
}
export const removeFromCart = async (productId) => {
    const response = await api.delete(`/${productId}`);
    return response.data;
};
export const clearCart = async () => {
    const response = await api.delete('/');
    return response.data;
};