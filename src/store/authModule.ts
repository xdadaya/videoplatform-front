import usersAxios from '@/axios/usersAxios'
import { Axios, AxiosError } from 'axios'
import { Commit, Dispatch } from "vuex"
import router from '@/router/router'
import { errorHandler } from '@/axios/toastHandler'

export interface AuthState {
    isAuth: boolean,
    accessToken: string,
    refreshToken: string,
    userId: string,
}

export interface AuthStoreInterface{
    state: AuthState,
    commit: Commit,
    dispatch: Dispatch
}

export interface ITokens{
    refresh_token: string,
    access_token: string
}

export const authModule = {
    state: () => ({
        isAuth: false,
        accessToken: '',
        refreshToken: '',
        userId: '',
    }),
    mutations: {
        setIsAuth(state: AuthState, isAuth: boolean) {
            state.isAuth = isAuth
        },
        setAccessToken(state: AuthState, accessToken: string) {
            state.accessToken = accessToken
        },
        setRefreshToken(state: AuthState, refreshToken: string) {
            state.refreshToken = refreshToken
        },
        setUserId(state: AuthState, userId: string) {
            state.userId = userId
        }
    },
    actions: {
        logout({state, commit, dispatch}: AuthStoreInterface){
            commit('setIsAuth', false)
            commit('setRefreshToken', '')
            commit('setAccessToken', '')
            commit('setUserId', '')
            document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            router.push('/')
        },
        setData({state, commit, dispatch}: AuthStoreInterface, tokens: ITokens){
            commit('setIsAuth', true)
            commit('setRefreshToken', tokens.refresh_token)
            commit('setAccessToken', tokens.access_token)
            const accessTokenExp = new Date(JSON.parse(atob(state.accessToken.split('.')[1])).exp * 1000)
            const refreshTokenExp = new Date(JSON.parse(atob(state.refreshToken.split('.')[1])).exp * 1000)
            document.cookie = `accessToken=${state.accessToken}; expires=${accessTokenExp}`
            document.cookie = `refreshToken=${state.refreshToken}; expires=${refreshTokenExp}`
            commit('setUserId', JSON.parse(atob(state.accessToken.split('.')[1])).id)
        },
        async refresh({state, commit, dispatch}: AuthStoreInterface, refreshToken: string){
            try{
                const response = await usersAxios.post(`users/refresh`, {refresh_token: refreshToken})
                dispatch('setData', response.data)
            } catch(e: unknown) {
                errorHandler(e as AxiosError<unknown, any>)
            }
        },
        async login({state, commit, dispatch}: AuthStoreInterface, userData: object) {
            try{
                const response = await usersAxios.post(`users/login`, userData)
                dispatch('setData', response.data)
                router.push('/')
                return true
            } catch(e: unknown) {
                errorHandler(e as AxiosError<unknown, any>)
                return false
            }
        },
        async register({state, commit, dispatch}: AuthStoreInterface, userData: object) {
            try{
                const response = await usersAxios.post(`users/register`, userData)
                dispatch('setData', response.data)
                router.push('/')
                return true
            } catch(e: unknown) {
                errorHandler(e as AxiosError<unknown, any>)
                return false
            }
        }
    },
    namespaced: true
}