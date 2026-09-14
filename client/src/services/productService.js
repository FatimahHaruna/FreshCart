import api from './api';

export const getAllProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};
export const getProductByCategory = async (categoryId) => {
    const response = await api.get(`/category/${categoryId}`);
    return response.data;
};
export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};