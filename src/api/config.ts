import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import {DataLoginType} from './authApi'
import {deviceStorage} from '../utils/storage/storage'

export const url = 'https://weedo-demo-production.up.railway.app/';

export const instance = axios.create({
    baseURL: url,
});

// Request interceptor for API calls
instance.interceptors.request.use(
    async (config) => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        //await OrderStore.checkInternet()
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
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            originalRequest._retry = true;
            try {
                const {data} = await axios.post<DataLoginType>(`${url}auth/refresh`, {refreshToken: refreshToken});

                originalRequest.headers['Authorization'] = 'Bearer' + data.accessToken;
                await deviceStorage.saveItem('refreshToken', data.refreshToken)
                await deviceStorage.saveItem('accessToken', data.accessToken)
            } catch (e) {
                console.log(e, 'error interceptors')
            }

            return instance(originalRequest);


        }

        return Promise.reject(error);
    },
);
