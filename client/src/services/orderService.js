import api from './api';

export const createOrder = async (orderData) => {
    const response = await api.post('/', {orderData});
    return response.data;
};
export const getMyOrders = async () => {
    const response = await api.get('/');
    return response.data;
};
export const getOrderById = async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
};