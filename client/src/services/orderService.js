import api from './api';

export const createOrder = async (orderData) => {
    const response = await api.post('/order', {orderData});
    return response.data;
};
export const getMyOrders = async () => {
    const response = await api.get('/order');
    return response.data;
};
export const getOrderById = async (id) => {
    const response = await api.get(`/order/${id}`);
    return response.data;
};