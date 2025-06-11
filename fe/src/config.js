const config = {
  // Base URL untuk API
  API_URL: process.env.REACT_APP_API_URL || "http://localhost:5000",

  // Endpoint untuk autentikasi
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    REFRESH_TOKEN: "/api/auth/refresh-token",
    LOGOUT: "/api/auth/logout",
  },

  // Endpoint untuk user
  USER: {
    PROFILE: "/api/users/profile",
    UPDATE_PROFILE: "/api/users/profile",
    UPDATE_PASSWORD: "/api/users/password",
  },

  // Endpoint untuk transaksi
  TRANSACTION: {
    BASE: "/api/transactions",
    CREATE: "/api/transactions",
    GET_ALL: "/api/transactions",
    GET_BY_ID: (id) => `/api/transactions/${id}`,
    UPDATE: (id) => `/api/transactions/${id}`,
    DELETE: (id) => `/api/transactions/${id}`,
  },

  // Endpoint untuk kategori
  CATEGORY: {
    BASE: "/api/categories",
    CREATE: "/api/categories",
    GET_ALL: "/api/categories",
    GET_BY_ID: (id) => `/api/categories/${id}`,
    UPDATE: (id) => `/api/categories/${id}`,
    DELETE: (id) => `/api/categories/${id}`,
  },

  // Konfigurasi untuk axios
  AXIOS_CONFIG: {
    timeout: 30000, // 30 detik
    headers: {
      "Content-Type": "application/json",
    },
  },
};

export default config;
