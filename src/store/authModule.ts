import axios from "axios"
import { Commit, Dispatch} from "vuex"
import { useToast } from 'vue-toastification'

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

const toast = useToast()

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
        },
        async login({state, commit, dispatch}: AuthStoreInterface, userData: object) {
            try{
                const response = await axios.post(`http://localhost:5000/api/v1/users/login`, userData)
                commit('setIsAuth', true)
                commit('setRefreshToken', response.data.refresh_token)
                commit('setAccessToken', response.data.access_token)
                commit('setUserId', JSON.parse(atob(state.accessToken.split('.')[1])).id)
                return true
            } catch(e) {
                console.log(e)
                toast.error("Error")
                return false
            }
        },
        async register({state, commit, dispatch}: AuthStoreInterface, userData: object) {
            try{
                const response = await axios.post(`http://localhost:5000/api/v1/users/register`, userData)
                commit('setIsAuth', true)
                commit('setRefreshToken', response.data.refresh_token)
                commit('setAccessToken', response.data.access_token)
                commit('setUserId', JSON.parse(atob(state.accessToken.split('.')[1])).id)
                return true
            } catch(e) {
                console.log(e)
                toast.error("Error")
                return false
            }
        }
    },
    namespaced: true
}