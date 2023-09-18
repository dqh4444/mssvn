import axios from "axios"
import { ENV_API_URL } from "configs/env"
import { PAGE_ROUTE_LOGIN, PAGE_ROUTE_NOT_FOUND } from "configs/page-route"
import { message } from "antd"

const instance = axios.create({
    baseURL: ENV_API_URL,
    timeout: 6000
})

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("tuvu_storage_token")
        if (token) {
            config.headers["authorization"] = token
        }
        return config
    },
    (error) => Promise.reject(error)
)

instance.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        if (error?.code === "ERR_NETWORK" || error?.code === "ECONNABORTED") {
            message.error("Hệ thống không hoạt động . Xin liên hệ với phòng IT")
            return null
        }

        const { data } = error.response

        const { statusCode } = data?.error

        if (statusCode === 401 || statusCode === 403) {
            message.error("Bạn không có quyền thực hiện hành động này")

            setTimeout(() => {
                let query = ""
                if (window.location.pathname !== "/") {
                    query = `?redirect=${window.location.href}`
                }
                localStorage.removeItem("tuvu_storage_token")
                window.location.replace(`${PAGE_ROUTE_LOGIN}${query}`)
            }, 888)
        } else if (statusCode === 404) {
            window.location.replace(PAGE_ROUTE_NOT_FOUND)
        }

        return data
    }
)

export { instance }
