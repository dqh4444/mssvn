import { MyResponse } from "@/helpers/axios"
import { message } from "antd"

async function generatorCommonHandle<T>(
    cb: () => Promise<MyResponse<T>>,
    title_action?: string,
    cbAfterSuccess?: (payload?: T) => Promise<void>
) {
    try {
        const response = await cb()

        if (response.success) {
            if (cbAfterSuccess) {
                await cbAfterSuccess(response.payload)
            }

            if (title_action) {
                message.success(`Đã ${title_action}`)
            }
        } else {
            if (response.error) {
                message.error(response.error)
            }
        }
    } catch (error: any) {
        if (title_action) {
            message.error(`Chưa thể ${title_action}`)
        }

        console.error(error)
    }
}

export { generatorCommonHandle }
