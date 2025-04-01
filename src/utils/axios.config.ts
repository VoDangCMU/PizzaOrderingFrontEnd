import axios, { AxiosInstance } from 'axios';
import { logout } from '@/store/slices/authSlice';
import { store } from '@//store';

const createDataApiInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_DATA_API,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000', 10),
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                console.warn("⚠ Token hết hạn! Tự động logout...");

                document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

                store.dispatch(logout());
            }
            return Promise.reject(error);
        }
    );

    return instance;
};


export const dataApiInstance = createDataApiInstance();

