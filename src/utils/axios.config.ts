import axios, { AxiosInstance } from 'axios';

const createDataApiInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_DATA_API,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '5000', 10),
    });

    if (typeof window !== 'undefined') {
        instance.interceptors.request.use((config) => {
            const jwt = localStorage.getItem('token') || sessionStorage.getItem('token');
            if (jwt) {
                config.headers.Authorization = `${jwt}`;
            }
            return config;
        });
    } else {
        instance.interceptors.request.use((config) => {
            return config;
        });
    }

    return instance;
};

export const axiosAPIInstance = createDataApiInstance();