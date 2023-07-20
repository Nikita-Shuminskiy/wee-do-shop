import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import {DataLoginType} from './apiAuth'
import {deviceStorage} from '../utils/storage/storage'

export const url = 'https://weedo-demo-production.up.railway.app/';

export const instance = axios.create({
    baseURL: url,
});

// Request interceptor for API calls
instance.interceptors.request.use(
    async (config) => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        //await NotificationStore.checkInternet()
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
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const {data} = await instance.post<DataLoginType>(`auth/refresh`, {refreshToken});
            //	axios.defaults.headers.common['authorization'] = 'Bearer ' + data.accessToken;
            await deviceStorage.saveItem('refreshToken', data.refreshToken)
            await deviceStorage.saveItem('accessToken', data.accessToken)
            return instance(originalRequest);
        }
        return Promise.reject(error);
    },
);
