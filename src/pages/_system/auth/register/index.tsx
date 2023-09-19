import { API_PATH_REGISTER } from "@/configs/api-path"
import { PAGE_ROUTE_DASHBOARD, PAGE_ROUTE_LOGIN } from "@/configs/page-route"
import { postData } from "@/helpers/axios"
import { setIsLoggedIn, setRedirectPath } from "@/store/slices/app"
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"
import { Button, Form, Input, message } from "antd"
import { useDispatch } from "react-redux"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import LayoutAuth from "../_layout"
import Icon from "@ant-design/icons"
import { RULE_FORM_PASSWORD } from "@/configs"
import { generatorCommonHandle } from "@/utils/generator-common-handle"

interface IRegisterRequest {
    fullname: string
    username: string
    password: string
}

interface ILoginResponse {
    access_token: string
}

export default function Login() {
    const [form] = Form.useForm()

    const [searchParams] = useSearchParams()

    const dispatch = useDispatch()

    const onFinish = async () => {
        await generatorCommonHandle<ILoginResponse>(
            () =>
                postData<IRegisterRequest, ILoginResponse>(
                    API_PATH_REGISTER,
                    form.getFieldsValue()
                ),
            null,
            async (payload: ILoginResponse) => {
                message.success("Đăng ký thành công !")

                setTimeout(() => {
                    dispatch(setIsLoggedIn(payload.access_token))
                    message.success("Chào mừng bạn đến với mssvn !")

                    if (searchParams.get("redirect")) {
                        dispatch(setRedirectPath(searchParams.get("redirect")))
                    } else {
                        dispatch(setRedirectPath(""))
                    }
                }, 1200)
            }
        )
    }

    return (
        <LayoutAuth>

            <h1 className="mt-4 component-text-header">Đăng ký</h1>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="w-3/4 laptop:w-1/2 mt-6"
            >
                <Form.Item name="fullname" label="Họ và tên" rules={[{ required: true }]}>
                    <Input name="fullname" placeholder="Họ và tên" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email đăng nhập"
                    rules={[{ required: true }, { type: "email" }]}
                >
                    <Input name="email" placeholder="Email" />
                </Form.Item>
                <Form.Item name="password" label="Mật khẩu" rules={RULE_FORM_PASSWORD}>
                    <Input.Password
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        placeholder="Mật khẩu"
                    />
                </Form.Item>
                <Form.Item
                    name="confirm_password"
                    label="Nhập lại mật khẩu"
                    rules={[
                        ...RULE_FORM_PASSWORD,
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject("Mật khẩu không khớp với nhau")
                            }
                        })
                    ]}
                >
                    <Input.Password
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        placeholder="Nhập lại mật khẩu"
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
                                        height="1.3rem"
                                        width="1.3rem"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 8a3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4 3.91 3.91 0 0 0-4 4zm6 0a1.91 1.91 0 0 1-2 2 1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2zM4 18a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h2v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1h2z"></path>
                                    </svg>
                                )}
                            ></Icon>
                        }
                        type="primary"
                        size="large"
                        htmlType="submit"
                        className="w-full"
                    >
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>

            <Link to={PAGE_ROUTE_LOGIN}>Bạn đã có tài khoản</Link>
        </LayoutAuth>
    )
}
