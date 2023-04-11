import axios from "axios"
import { Commit, Dispatch} from "vuex"

export interface AuthState {
    isAuth: boolean,
    accessToken: string,
    refreshToken: string
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
    },
    actions: {
        async login({state, commit, dispatch}: AuthStoreInterface, userData: object) {
            try{
                const response = await axios.post(`http://localhost:5000/api/v1/users/login`, userData)
                commit('setIsAuth', true)
                commit('setRefreshToken', response.data.refreshToken)
                commit('setAccessToken', response.data.accessToken)
            } catch(e) {
                console.log(e)
            }
        }
    },
    namespaced: true
}