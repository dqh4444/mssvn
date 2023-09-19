import useFetchWords from "@/hooks/fetch-data/useFetchWords"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { useState } from "react"
import { IResourceWord } from "@/types/resources/word"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { Avatar, Button, Carousel, Input, Tabs, TabsProps, Tag } from "antd"
import { FileImageOutlined, LayoutOutlined, UserOutlined } from "@ant-design/icons"

export default function Dashboard() {
    const { languageOptions } = useSelector((state: RootState) => state.app)

    const { listItems, setListItems } = useFetchWords({
        is_memory: true,
        random: true,
        limit: 10
    })

    const [selectedEditItem, setSelectedEditItem] = useState<IResourceWord>(null)

    const onChange = (key: string) => {
        console.log(key)
    }

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Home"
        },
        {
            key: "2",
            label: "Proxy"
        },
        {
            key: "3",
            label: "Price"
        },
        {
            key: "4",
            label: "API"
        }
    ]

    return (
        <div>
            <div className="bg-white">
                <div className="component-main-section">
                    <Tabs
                        className="bg-white"
                        defaultActiveKey="1"
                        items={items}
                        onChange={onChange}
                    />
                </div>
            </div>

            <div className="mt-4 flex space-x-6 px-4">
                <div className="component-box w-[360px]">
                    <p>Manager Account</p>
                    <div className="h-[600px]"></div>
                </div>
                <div className="component-box flex-1">
                    <div className="flex items-center">
                        <Input className="w-[400px]" placeholder="Nhập UUID tìm kiếm" />

                        <div className="!ml-auto"></div>

                        <p>Đã có không tài khoản</p>
                    </div>
                    <div>
                        <Tag color="#2db7f5" className="mt-2">
                            All:0
                        </Tag>
                        <Tag className="mt-2">Live:0</Tag>
                        <Tag className="mt-2">CP:0</Tag>
                    </div>

                    <div className="h-[600px]"></div>
                </div>
                <div className="component-box w-[440px]">
                    <div className="flex space-x-2 items-center">
                        <Avatar size={38} icon={<UserOutlined />} />
                        <p>Manh Cuong</p>
                    </div>
                    <Tag color="#2db7f5" className="mt-2">
                        123 lượt backup
                    </Tag>
                    <Tag color="#87d068" className="mt-2">
                        123467898 MCoin
                    </Tag>

                    <p className="mt-6 mb-2">MSS</p>

                    <div className="flex flex-col space-y-4">
                        <div className="flex space-x-2 border-border border-b-[1px]">
                            <Avatar size={38} className="min-w-[40px]" icon={<UserOutlined />} />
                            <div>
                                <p>Cảnh báo</p>
                                <p>Tài khoản ABC đã bị checkpoint hoặc bị đổi mật khẩu</p>

                                <span>3 năm trước</span>
                            </div>
                        </div>

                        <div className="flex space-x-2 border-border border-b-[1px]">
                            <Avatar size={38} className="min-w-[40px]" icon={<UserOutlined />} />
                            <div>
                                <p>Cảnh báo</p>
                                <p>Tài khoản ABC đã bị checkpoint hoặc bị đổi mật khẩu</p>

                                <span>3 năm trước</span>
                            </div>
                        </div>

                        <div className="flex space-x-2 border-tertiary border-[1px]">
                            <Avatar size={38} className="min-w-[40px]" icon={<UserOutlined />} />
                            <div>
                                <p>Cảnh báo</p>
                                <p>Tài khoản ABC đã bị checkpoint hoặc bị đổi mật khẩu</p>

                                <span>3 năm trước</span>
                            </div>
                        </div>

                        <div className="flex space-x-2 border-border border-b-[1px]">
                            <Avatar size={38} className="min-w-[40px]" icon={<UserOutlined />} />
                            <div>
                                <p>Cảnh báo</p>
                                <p>Tài khoản ABC đã bị checkpoint hoặc bị đổi mật khẩu</p>

                                <span>3 năm trước</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
