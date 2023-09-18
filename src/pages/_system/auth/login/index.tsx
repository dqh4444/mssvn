import { ReactComponent as BigLogoBrandSvg } from "@/assets/svgs/big_logo_brand.svg"
import { API_PATH_LOGIN } from "@/configs/api-path"
import { PAGE_ROUTE_FORGET_PASSWORD, PAGE_ROUTE_REGISTER } from "@/configs/page-route"
import { postData } from "@/helpers/axios"
import { setIsLoggedIn, setRedirectPath } from "@/store/slices/app"
import { Button, Form, Input, message } from "antd"
import { useDispatch } from "react-redux"
import { Link, useSearchParams } from "react-router-dom"
import LayoutAuth from "../_layout"
import { EyeInvisibleOutlined, EyeTwoTone, LoginOutlined } from "@ant-design/icons"
import { RULE_FORM_PASSWORD } from "@/configs"
import { generatorCommonHandle } from "@/utils/generator-common-handle"

interface ILoginRequest {
    username: string
    password: string
}

interface ILoginResponse {
    access_token: string
}

export default function Login() {
    const [form] = Form.useForm()

    const dispatch = useDispatch()

    const [searchParams] = useSearchParams()

    const onFinish = async () => {
        await generatorCommonHandle<ILoginResponse>(
            () => postData<ILoginRequest, ILoginResponse>(API_PATH_LOGIN, form.getFieldsValue()),
            null,
            async (payload: ILoginResponse) => {
                dispatch(setIsLoggedIn(payload.access_token))

                message.success("Chào mừng bạn đến với TUVU !")

                if (searchParams.get("redirect")) {
                    dispatch(setRedirectPath(searchParams.get("redirect")))
                } else {
                    dispatch(setRedirectPath(""))
                }
            }
        )
    }

    return (
        <LayoutAuth>
            <BigLogoBrandSvg></BigLogoBrandSvg>

            <h1 className="mt-4 component-text-header">Đăng nhập</h1>

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
                    rules={[{ required: true, message: "Bạn chưa nhập email" }, { type: "email" }]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item name="password" label="Mật khẩu" rules={RULE_FORM_PASSWORD}>
                    <Input.Password
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        placeholder="Mật khẩu"
                    />
                </Form.Item>
                <div className="flex">
                    <Link className="ml-auto mb-1 underline" to={PAGE_ROUTE_FORGET_PASSWORD}>
                        Quên mật khẩu
                    </Link>
                </div>

                <Form.Item>
                    <Button
                        icon={<LoginOutlined />}
                        type="primary"
                        size="large"
                        htmlType="submit"
                        className="w-full"
                    >
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>

            <Link to={PAGE_ROUTE_REGISTER}>Đăng ký</Link>
        </LayoutAuth>
    )
}
