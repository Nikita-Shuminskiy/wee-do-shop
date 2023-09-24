import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { DataLoginType } from './authApi'
import AuthStore from '../store/AuthStore/auth-store'
import { createAlert } from '../components/Alert'

export const BASE_URL = 'https://core-production-cd57.up.railway.app/'

export const instance = axios.create({
	baseURL: BASE_URL,
})

// Request interceptor for API calls
instance.interceptors.request.use(
	async (config) => {
		const accessToken = await AsyncStorage.getItem('accessToken')
		//await CourierOrderStore.checkInternet()
		if (accessToken) {
			//@ts-ignore
			config.headers = {
				Authorization: `Bearer ${accessToken}`,
			}
		}
		return config
	},
	(error) => {
		Promise.reject(error)
	}
)

// Response interceptor for API calls
instance.interceptors.response.use(
	(response) => {
		return response
	},
	async function (error) {
		const originalRequest = error.config
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			try {
				const refreshToken = await AsyncStorage.getItem('refreshToken')
				const { data } = await axios.post<DataLoginType>(`${BASE_URL}auth/refresh`, {
					refreshToken: refreshToken,
				})
				alert('interseptor try => ok')
				await AsyncStorage.setItem('refreshToken', data.refreshToken)
				await AsyncStorage.setItem('accessToken', data.accessToken)

				originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken

				return axios(originalRequest)
			} catch (e) {
				console.log(e?.response?.data)
				console.log('interceptors response catch')
				// return Promise.reject(e);
			}
		}

		return Promise.reject(error)
	}
)
