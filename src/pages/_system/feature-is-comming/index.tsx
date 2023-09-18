import React from "react"
import { ReactComponent as FeatureIsCommingSvg } from "@/assets/svgs/feature_is_comming.svg"
import { Button } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { PAGE_ROUTE_DASHBOARD } from "@/configs/page-route"
import { useNavigate } from "react-router-dom"

export default function FeatureIsComming() {
    const navigate = useNavigate()

    return (
        <section className="util-flex-col-center text-center">
            <FeatureIsCommingSvg className="w-[280px] h-[320px] tablet:w-[400px]"></FeatureIsCommingSvg>
            <p className="component-text-header">Tính năng này đang phát triển</p>
            <p className="mt-2">
                <span className="font-semibold">
                    <span className="text-primary">TU</span>VU{" "}
                </span>
                sẽ thông báo đến bạn ngay khi tính năng này ra mắt
            </p>

            <Button
                size="large"
                icon={<ArrowLeftOutlined />}
                className="mt-6"
                type="primary"
                onClick={() => navigate(PAGE_ROUTE_DASHBOARD)}
            >
                Trở về trang chủ
            </Button>
        </section>
    )
}
