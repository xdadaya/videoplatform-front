import axios from "axios";
import store from '@/store/index'
const url = "http://localhost:5100/api/v1/"


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
  
export default instance