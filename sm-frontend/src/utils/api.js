// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8000';  // Your Django backend base URL

// // Stock data APIs
// export const fetchDailyClosingPrice = async () => {
//     const response = await axios.get(`${API_BASE_URL}/api/daily_closing_price/`);
//     return response.data;
// };

// export const fetchPriceChangePercentage = async () => {
//     const response = await axios.get(`${API_BASE_URL}/api/price_change_percentage/`);
//     return response.data;
// };

// export const fetchTopGainersLosers = async () => {
//     const response = await axios.get(`${API_BASE_URL}/api/top_gainers_losers/`);
//     return response.data;
// };

// // Authentication APIs
// export const register = async (userData) => {
//     return await axios.post(`${API_BASE_URL}/auth/registration/`, userData);
// };

// export const login = async (credentials) => {
//     return await axios.post(`${API_BASE_URL}/auth/login/`, credentials);
// };

// export const logout = async (token) => {
//     return await axios.post(`${API_BASE_URL}/auth/logout/`, null, {
//         headers: {
//             'Authorization': `Token ${token}`
//         }
//     });
// };

// export const getUserInfo = async (token) => {
//     return await axios.get(`${API_BASE_URL}/auth/user/`, {
//         headers: {
//             'Authorization': `Token ${token}`
//         }
//     });
// };


import axios from 'axios';

const API_BASE_URL = 'http://192.168.49.2:30001';
//const API_BASE_URL = 'http://django-backend-deployment:8000';  // Your Django backend base URL

// Stock data APIs
export const fetchDailyClosingPrice = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/daily_closing_price/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching daily closing price:", error);
        throw error;
    }
};

export const fetchPriceChangePercentage = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/price_change_percentage/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching price change percentage:", error);
        throw error;
    }
};

export const fetchTopGainersLosers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/top_gainers_losers/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching top gainers/losers:", error);
        throw error;
    }
};

// Authentication APIs
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/registration/`, userData);
        return response.data;
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
};

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login/`, credentials);
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};

export const logout = async (token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/logout/`, null, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error during logout:", error);
        throw error;
    }
};

export const getUserInfo = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/user/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
};
