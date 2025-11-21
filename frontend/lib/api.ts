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
    detail: (id: number) => `${API_URL}/api/products/${id}/`,
  },
  cart: {
    list: `${API_URL}/api/cart/`,
    add: `${API_URL}/api/cart/`,
    update: (id: number) => `${API_URL}/api/cart/${id}/`,
    remove: (id: number) => `${API_URL}/api/cart/${id}/`,
  },
  orders: {
    list: `${API_URL}/api/orders/`,
    create: `${API_URL}/api/orders/`,
  },
  users: {
    list: `${API_URL}/api/users/`,
  },
  admin: {
    stats: `${API_URL}/api/admin/stats/`,
  },
  dashboard: {
    stats: `${API_URL}/api/dashboard/`,
  },
};

