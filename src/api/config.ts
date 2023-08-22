import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { DataLoginType } from './authApi'
import AuthStore from '../store/AuthStore/auth-store'

export const BASE_URL = 'https://weedo-demo-production.up.railway.app/'

export const instance = axios.create({
    baseURL: BASE_URL,
});

// Request interceptor for API calls
instance.interceptors.request.use(
    async (config) => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        //await CourierOrderStore.checkInternet()
        if (accessToken) {
            //@ts-ignore
            config.headers = {
                Authorization: `Bearer ${accessToken}`,
            };
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

// Response interceptor for API calls
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                const { data } = await axios.post<DataLoginType>(`${BASE_URL}auth/refresh`, { refreshToken: refreshToken });

                // Обновляем токены в хранилище
                await AsyncStorage.setItem('refreshToken', data.refreshToken);
                await AsyncStorage.setItem('accessToken', data.accessToken);

                // Обновляем заголовок запроса с новым accessToken
                originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;

                // Повторно выполняем оригинальный запрос
                return axios(originalRequest);
            } catch (e) {
                return Promise.reject(e); // Возвращаем ошибку, чтобы обработать ее дальше
            }
        }

        // Если это не ошибка авторизации, просто возвращаем ошибку
        return Promise.reject(error);
    },
);
