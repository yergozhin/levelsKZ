import axios, { type CreateAxiosDefaults } from 'axios'
import { getAccessToken, removeFromStorage } from '../services/auth-token.service.ts'
import { errorCatch } from './error.ts'
import { authService } from '../services/auth.service.ts'

const options: CreateAxiosDefaults = {
	baseURL: 'https://onelab-levels-api.vercel.app/api',
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',

	},
	withCredentials: false,
}


const axiosDefault = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken()
	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

axiosWithAuth.interceptors.response.use(config => config,
		async error => {
			const originalRequest = error.config

			if (
				(error?.response?.status === 401 || errorCatch(error) === 'jwt expired' || errorCatch(error) === 'jwt must be provided') && error.config && !error.config._isRetry
			) {
				originalRequest._isRetry = true
				try {
					await authService.getNewTokens()
					return axiosWithAuth.request(originalRequest)
				} catch (error) {
					if (errorCatch(error) === 'jwt expired') {
						removeFromStorage()
					}
				}
			}

			throw error
		}
	)


export { axiosDefault, axiosWithAuth }