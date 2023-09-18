import React from "react"
import { ReactComponent as NoDataSvg } from "@/assets/svgs/no_data.svg"

export default function NoDataWrapper() {
    return (
        <div className="w-full h-full util-flex-col-center">
            <NoDataSvg></NoDataSvg>

            <p className="text-center component-text-desc mt-6">Chưa có dữ liệu</p>
        </div>
    )
}
