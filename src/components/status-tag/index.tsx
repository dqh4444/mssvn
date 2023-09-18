import { ENUM_COMMON_STATUS } from "@/types/resources/_common"
import { Tag } from "antd"
import { MouseEventHandler } from "react"

interface IStatusTagProps {
    status: ENUM_COMMON_STATUS
    onClick?: MouseEventHandler | undefined
}

export const getTitleByCommonStatus = (status: ENUM_COMMON_STATUS): string => {
    if (status === ENUM_COMMON_STATUS.PUBLIC) {
        return "Công khai"
    }
    if (status === ENUM_COMMON_STATUS.PRIVATE) {
        return "Riêng tư"
    }
    if (status === ENUM_COMMON_STATUS.INACTIVE) {
        return "Ẩn"
    }
    return "blue"
}

export default function StatusTag({ status, onClick }: IStatusTagProps) {
    const getColorByCommonStatus = (status: ENUM_COMMON_STATUS): string => {
        if (status === ENUM_COMMON_STATUS.PUBLIC) {
            return "green"
        }
        if (status === ENUM_COMMON_STATUS.PRIVATE) {
            return "purple"
        }
        if (status === ENUM_COMMON_STATUS.INACTIVE) {
            return "magenta"
        }
        return status
    }

    return (
        <Tag
            color={getColorByCommonStatus(status)}
            onClick={onClick}
            className={`${onClick && "cursor-pointer"}`}
        >
            {getTitleByCommonStatus(status)}
        </Tag>
    )
}
