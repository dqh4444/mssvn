import React, { useEffect } from "react"
import ImageSomethingWentWrong from "@/assets/images/something_went_wrong.png"
import BrandTitle from "@/components/brand-title"
import { useNavigate } from "react-router-dom"
import { PAGE_ROUTE_DASHBOARD, PAGE_ROUTE_LOGIN } from "@/configs/page-route"
import { Button } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"

export default function ErrorPage() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("tuvu_storage_token")) {
            navigate(PAGE_ROUTE_LOGIN)
        }
    }, [])

    return (
        <div className="util-flex-center flex-col pt-10">
            <img className="" src={ImageSomethingWentWrong} alt="" />

            <p className="component-text-header">Có lỗi xảy ra !!!</p>

            <p className="component-text-desc w-[90%] tablet:w-[480px] mt-2">
                <BrandTitle></BrandTitle> xin lỗi nếu làm trải nghiệm của bạn giảm đi! Với vấn đề
                này , TUVU sẽ sớm sửa lỗi. Bạn nên tải lại trang để thử lại tính năng
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
        </div>
    )
}
