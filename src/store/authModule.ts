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
            router.push('/')
        },
        async login({state, commit, dispatch}: AuthStoreInterface, userData: object) {
            try{
                const response = await usersAxios.post(`users/login`, userData)
                commit('setIsAuth', true)
                commit('setRefreshToken', response.data.refresh_token)
                commit('setAccessToken', response.data.access_token)
                commit('setUserId', JSON.parse(atob(state.accessToken.split('.')[1])).id)
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
                commit('setIsAuth', true)
                commit('setRefreshToken', response.data.refresh_token)
                commit('setAccessToken', response.data.access_token)
                commit('setUserId', JSON.parse(atob(state.accessToken.split('.')[1])).id)
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