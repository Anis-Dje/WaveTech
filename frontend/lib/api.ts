export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_URL}/api/auth/jwt/create/`,
    refresh: `${API_URL}/api/auth/jwt/refresh/`,
    register: `${API_URL}/api/auth/users/`,
    me: `${API_URL}/api/auth/users/me/`,
  },
  products: {
    list: `${API_URL}/api/products/`,
  },
  cart: {
    list: `${API_URL}/api/cart/`,
    add: `${API_URL}/api/cart/`,
  },
  orders: {
    create: `${API_URL}/api/orders/`,
  },
  admin: `${API_URL}/admin`,
};
