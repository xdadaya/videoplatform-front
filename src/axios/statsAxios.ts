import axios from "axios";
import store from '@/store/index'
const url = "http://localhost:5200/"


const instance = axios.create({
    baseURL: url,
})
  
export default instance