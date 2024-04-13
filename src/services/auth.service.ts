import { IAuthForm, IAuthResponse } from "../types/auth.types";

import { getAccessToken, removeFromStorage, saveTokenStorage } from './auth-token.service.ts'
import { axiosDefault } from '../api/interceptors.ts'

export const authService = {
	async main(type: 'signin' | 'signup', data: IAuthForm) {
		const response = await axiosDefault.post<IAuthResponse>(
			`/auth/${type}`,
			data
		)
		if (type === 'signup') {
			console.log('There was a successful signup of a user!', response.data)
		}
		if (type === 'signin') {
			console.log('There was a successful signin of a user!')
		}
		console.log('your token is: ', response.data.token)

		if (response.data.token) saveTokenStorage(response.data.token)

		return response
	},

	async getNewTokens() {
		const response = await axiosDefault.post<IAuthResponse>(
			'/auth/signin'
		)

		if (response.data.token) saveTokenStorage(response.data.token)

		return response
	},

	async logout() {
		const response = await axiosDefault.post<boolean>('/auth/logout')

		if (response.data) removeFromStorage()

		return response
	}
}
