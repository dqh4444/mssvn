import React from "react"
import LayoutAuth from "../_layout"
import { ReactComponent as BigLogoBrandSvg } from "@/assets/svgs/big_logo_brand.svg"
import { Button, Form, Input, message } from "antd"
import { Link } from "react-router-dom"
import { PAGE_ROUTE_LOGIN, PAGE_ROUTE_REGISTER } from "@/configs/page-route"
import { API_PATH_FORGET_PASSWORD } from "@/configs/api-path"
import { postData } from "@/helpers/axios"
import { SendOutlined } from "@ant-design/icons"
import Icon from "@ant-design/icons/lib/components/Icon"
import { generatorCommonHandle } from "@/utils/generator-common-handle"

interface IRequest {
    username: string
}

export default function ForgetPassword() {
    const [form] = Form.useForm()

    const onFinish = async () => {
        await generatorCommonHandle(
            () => postData<IRequest, any>(API_PATH_FORGET_PASSWORD, form.getFieldsValue()),
            null,
            async () => {
                message.success(
                    "Gửi yêu cầu thành công. Vui lòng chờ giây lát TUVU xác minh và gửi mail phản hồi cho bạn"
                )
            }
        )
    }

    return (
        <LayoutAuth>
            <BigLogoBrandSvg></BigLogoBrandSvg>

            <h1 className="mt-4 component-text-header">Đăng nhập</h1>
            <h1 className="mt-4 ">Quên mật khẩu</h1>

            <p className="text-left w-3/4 laptop:w-1/2">
                Vui lòng nhập địa chỉ email đăng nhập dưới đây để <b>TUVU</b> gửi cho bạn liên kết
                đặt lại mật khẩu
            </p>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="w-3/4 laptop:w-1/2 mt-6"
            >
                <Form.Item
                    name="email"
                    label="Email đăng nhập"
                    rules={[{ required: true }, { type: "email" }]}
                >
                    <Input placeholder="Email" />
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

            <Link to={PAGE_ROUTE_LOGIN}>Trở về đăng nhập</Link>

            <Link className="mt-2" to={PAGE_ROUTE_REGISTER}>
                Đăng ký mới
            </Link>
        </LayoutAuth>
    )
}
