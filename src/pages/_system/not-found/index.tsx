import { ReactComponent as NotFoundSvg } from "@/assets/svgs/404.svg"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import { PAGE_ROUTE_DASHBOARD, PAGE_ROUTE_LOGIN } from "@/configs/page-route"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { useEffect } from "react"
import BrandTitle from "@/components/brand-title"

export default function NotFound() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("mssvn_storage_token")) {
            navigate(PAGE_ROUTE_LOGIN)
        }
    }, [])

    return (
        <section className="util-flex-col-center laptop:flex-row h-screen w-screen bg-bg">
            <NotFoundSvg className="w-[340px] tablet:w-[440px] laptop:w-[520px] h-auto"></NotFoundSvg>
            <div className="tablet:ml-6 laptop:ml-14 px-4">

                <p className="component-text-header">Địa chỉ bạn truy cập không tồn tại</p>
                <p className="mt-2">
                    Có thể URL bị hỏng hoặc quản trị viên đã gỡ xuống. <BrandTitle></BrandTitle>{" "}
                    xin lỗi nếu làm trải nghiệm của bạn giảm đi !
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
        </section>
    )
}
