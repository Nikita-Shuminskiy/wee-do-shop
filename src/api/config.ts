import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { authApi, DataLoginType } from './authApi'
import AuthStore from '../store/AuthStore/auth-store'
import { createAlert } from '../components/Alert'
import { deviceStorage } from '../utils/storage/storage'

export const BASE_URL = 'https://core-production-cd57.up.railway.app/'
//https://core-develop.up.railway.app/   dev
//https://core-production-cd57.up.railway.app/   prod
export const instance = axios.create({
	baseURL: BASE_URL,
})

// Request interceptor for API calls
instance.interceptors.request.use(
	async (req) => {
		const accessToken = await deviceStorage.getItem('accessToken')
		req.headers.Authorization = `Bearer ${accessToken}`

		return req
	},
	(error) => {
		Promise.reject(error)
	}
)

// Response interceptor for API calls
instance.interceptors.response.use(
	(response) => response,
	async function (error) {
		const originalRequest = error.config

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			try {
				const refreshToken = await AsyncStorage.getItem('refreshToken')

				const { data } = await axios.post<DataLoginType>(`${BASE_URL}auth/refresh`, {
					refreshToken: refreshToken,
				})
				await AsyncStorage.setItem('refreshToken', data.refreshToken)
				await AsyncStorage.setItem('accessToken', data.accessToken)

				originalRequest.headers.authorization = `Bearer ${data.accessToken}`

				return axios.request(originalRequest)
			} catch (e) {
				if (e.response?.status === 401 && e.response?.data.message === 'Unauthorized') {
					return Promise.reject(error)
				}
			}
		}
		return Promise.reject(error)
	}
)
