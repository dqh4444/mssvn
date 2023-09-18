import { LIST_COLOR_HEX_SIDE_NOTES, RULE_FORM_PASSWORD } from "@/configs"
import { API_PATH_CHANGE_PASSWORD } from "@/configs/api-path"
import { postData } from "@/helpers/axios"
import { RootState } from "@/store"
import { generatorCommonHandle } from "@/utils/generator-common-handle"
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"
import { Form, Modal, message, Segmented, Input } from "antd"
import { useEffect } from "react"
import { useSelector } from "react-redux"

interface IProps {
    onCancel: () => void
    open: boolean
}

interface IRequest {
    email: string
    old_password: string
    new_password: string
}

export default function ChangePasswordModal({ open, onCancel }: IProps) {
    const [form] = Form.useForm()

    const user_info = useSelector((state: RootState) => state.user_info.user)

    useEffect(() => {
        if (open) {
            form.resetFields()
        }
    }, [open])

    const onFinish = async () => {
        await generatorCommonHandle(
            () =>
                postData<IRequest, any>(API_PATH_CHANGE_PASSWORD, {
                    ...form.getFieldsValue(),
                    email: user_info.user.email
                }),
            "thay đổi mật khẩu",
            async () => {
                setTimeout(() => {
                    onCancel()
                }, 1234)
            }
        )
    }

    return (
        <Modal
            okText="Xác nhận"
            cancelText="Thoát"
            title="Đổi mật khẩu"
            onOk={() => form.submit()}
            open={open}
            onCancel={onCancel}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                initialValues={{
                    color_hex: LIST_COLOR_HEX_SIDE_NOTES[0]
                }}
            >
                <Form.Item name="old_password" label="Mật khẩu cũ" rules={RULE_FORM_PASSWORD}>
                    <Input.Password
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        placeholder="Mật khẩu"
                    />
                </Form.Item>

                <Form.Item name="new_password" label="Mật khẩu mới" rules={RULE_FORM_PASSWORD}>
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
                                if (!value || getFieldValue("new_password") === value) {
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
            </Form>
        </Modal>
    )
}
