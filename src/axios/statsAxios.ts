import axios from "axios";
import store from '@/store/index'

const url = process.env.statsService


const instance = axios.create({
    baseURL: url,
})
  
export default instance