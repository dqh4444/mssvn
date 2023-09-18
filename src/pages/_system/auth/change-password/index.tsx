import React, { useEffect, useState } from "react"
import LayoutAuth from "../_layout"
import { ReactComponent as BigLogoBrandSvg } from "@/assets/svgs/big_logo_brand.svg"
import { Button, Form, Input, message } from "antd"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { PAGE_ROUTE_LOGIN, PAGE_ROUTE_REGISTER } from "@/configs/page-route"
import { API_PATH_CHANGE_PASSWORD_WHEN_FORGET } from "@/configs/api-path"
import { postData } from "@/helpers/axios"
import Icon, { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"
import { RULE_FORM_PASSWORD } from "@/configs"

interface IRequest {
    new_password: string
}

export default function ChangePassword() {
    const [countDown, setCountDown] = useState(null)

    const [form] = Form.useForm()

    const [searchParams] = useSearchParams()

    const navigate = useNavigate()

    useEffect(() => {
        let interval = null

        if (
            !searchParams.get("token") ||
            !searchParams.get("user_id") ||
            !searchParams.get("email") ||
            !searchParams.get("created_at") ||
            !searchParams.get("second")
        ) {
            navigate(PAGE_ROUTE_LOGIN)
        } else {
            const created_at = +searchParams.get("created_at")
            const second = +searchParams.get("second")

            interval = setInterval(() => {
                const time = created_at + second * 1000 - new Date().getTime()
                if (time < 0) {
                    navigate(PAGE_ROUTE_LOGIN)
                }
                setCountDown(time)
            }, 1000)
        }

        return () => clearInterval(interval)
    }, [])

    const onFinish = async () => {
        try {
            const response = await postData<IRequest, any>(API_PATH_CHANGE_PASSWORD_WHEN_FORGET, {
                ...form.getFieldsValue(),
                token: searchParams.get("token"),
                user_id: searchParams.get("user_id")
            })

            if (response.success) {
                message.success("Bạn đã thay đổi mật khẩu . Hãy đăng nhập lại")

                setTimeout(() => {
                    navigate(PAGE_ROUTE_LOGIN)
                }, 1689)
            } else {
                message.error(response.error)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getReturnValues = (countDown) => {
        // calculate time left
        const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
        const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

        return [
            days,
            hours,
            minutes < 10 ? `0${minutes}` : minutes,
            seconds < 10 ? `0${seconds}` : seconds
        ]
    }

    const [, , minutes, seconds] = getReturnValues(countDown)

    return (
        <LayoutAuth>
            <BigLogoBrandSvg></BigLogoBrandSvg>

            <h1 className="mt-4 component-text-header">Đổi mật khẩu</h1>

            <p className="text-left w-3/4 laptop:w-1/2">
                <b>TUVU</b> đã xác minh và cho phép bạn có thể đổi mật khẩu mới cho email{" "}
                <b>{searchParams.get("email")}</b>. Xin hãy tạo mật khẩu mới an toàn , dễ nhớ.
                <br></br>
                <i className="text-[0.9rem]">
                    * Thời hạn của tính năng còn{" "}
                    <b className="text-primary">
                        {minutes}:{seconds}
                    </b>
                    .
                </i>
            </p>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="w-3/4 laptop:w-1/2 mt-6"
            >
                <Form.Item name="new_password" label="Mật khẩu mới" rules={RULE_FORM_PASSWORD}>
                    <Input.Password
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        placeholder="Mật khẩu"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        icon={
                            <Icon
                                component={() => (
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 24 24"
                                        height="1.2rem"
                                        width="1.2rem"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M20 4H6c-1.103 0-2 .897-2 2v5h2V8l6.4 4.8a1.001 1.001 0 0 0 1.2 0L20 8v9h-8v2h8c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-7 6.75L6.666 6h12.668L13 10.75z"></path>
                                        <path d="M2 12h7v2H2zm2 3h6v2H4zm3 3h4v2H7z"></path>
                                    </svg>
                                )}
                            />
                        }
                        type="primary"
                        size="large"
                        htmlType="submit"
                        className="w-full"
                    >
                        Gửi yêu cầu
                    </Button>
                </Form.Item>
            </Form>

            <Link className="mt-4" to={PAGE_ROUTE_LOGIN}>
                Trở về đăng nhập
            </Link>

            <Link className="mt-2" to={PAGE_ROUTE_REGISTER}>
                Đăng ký mới
            </Link>
        </LayoutAuth>
    )
}
