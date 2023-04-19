import axios from "axios";
import store from '@/store/index'

const url = process.env.usersService


const instance = axios.create({
    baseURL: url,
})

instance.interceptors.request.use(
    async (config: any) => {
        const accessToken = (store.state as any).auth.accessToken
        if (accessToken) {
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${accessToken}`,
          };
        }
        return config;
    },
    (error) => Promise.reject(error)
)

instance.interceptors.response.use(async(response) => {return response}, async(error) => {
  const originalRequest = error.config;
  if(error.response !== null){
    if(error.response.status === 401 && !originalRequest._retry){
      originalRequest._retry = true
      try{
        const refreshToken = getCookie("refreshToken")
        if(!refreshToken) return Promise.reject(error);
        const tokens = await store.dispatch('refresh', refreshToken);
        axios.defaults.headers.common['Authorization'] = (store.state as any).auth.accessToken
        return instance(originalRequest);
      } catch(error: any){
        if(error.response && error.response.data){
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
      }
    }
  }
  return Promise.reject(error)
  }
);

const getCookie = (name: string) => {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[0] === name) {
      return cookie[1];
    }
  }
  return null;
}

export default instance