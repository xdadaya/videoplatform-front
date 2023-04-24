import { useToast } from "vue-toastification"
import { AxiosError } from "axios"
import router from "@/router/router"

const toast = useToast()

interface ErrorStringResponse {
    detail?: string
}

interface ErrorArrayResponse {
    detail?: Array<any>
}

export const errorHandler = (e: AxiosError<unknown, ErrorStringResponse>) => {
    console.log(e)
    if(e.code === "ERR_NETWORK") toast.error("Service is unavailable right now. Try again later")
    if(e.response?.status === 404) router.push('/404')
    if(e.response?.status === 401) {
        const data = e.response.data as ErrorStringResponse
        if(data?.detail) toast.error(data?.detail)
    }
    if(e.response?.status === 400) {
        const data = e.response.data as ErrorStringResponse
        if(data?.detail) toast.error(data?.detail)
    }
    if(e.response?.status === 422) {
        const data = e.response.data as ErrorArrayResponse
        if(data?.detail){
            for (const item of data?.detail){
                toast.error(`${item.loc[1]} : ${item.msg}`)
            }
        }
    }
}