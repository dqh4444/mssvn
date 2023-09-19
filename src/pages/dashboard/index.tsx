import useFetchWords from "@/hooks/fetch-data/useFetchWords"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { useState } from "react"
import { IResourceWord } from "@/types/resources/word"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { Avatar, Button, Carousel, Input } from "antd"
import {
    EllipsisOutlined,
    FileImageOutlined,
    LayoutOutlined,
    LikeOutlined,
    MessageOutlined,
    ShareAltOutlined,
    UserOutlined
} from "@ant-design/icons"

export default function Dashboard() {
    const { languageOptions } = useSelector((state: RootState) => state.app)

    const { listItems, setListItems } = useFetchWords({
        is_memory: true,
        random: true,
        limit: 10
    })

    const [selectedEditItem, setSelectedEditItem] = useState<IResourceWord>(null)

    return (
        <div className="flex space-x-10 pt-4 component-main-section">
            <div className="w-[240px]">
                <div className="flex space-x-2 items-center mb-4">
                    <Avatar size={32} icon={<UserOutlined />} />
                    <p>Manh Cuong</p>
                </div>

                <div className="flex items-center rounded-lg space-x-1 py-2 px-3 bg-white mb-1 hover:bg-white">
                    <LayoutOutlined />
                    <p>Bảng tin</p>
                </div>

                <div className="flex items-center rounded-lg space-x-1 py-2 px-3 mb-1 hover:bg-white">
                    <LayoutOutlined />
                    <p>Bảng tin</p>
                </div>

                <p className="mt-3">Tiện ích</p>

                <div className="flex items-center rounded-lg space-x-1 py-2 px-3  mb-1 hover:bg-white">
                    <LayoutOutlined />
                    <p>Bảng tin</p>
                </div>

                <p className="mt-3">Tiện ích</p>

                <div className="flex items-center rounded-lg space-x-1 py-2 px-3  mb-1 hover:bg-white">
                    <LayoutOutlined />
                    <p>Bảng tin</p>
                </div>

                <div className="flex items-center rounded-lg space-x-1 py-2 px-3  mb-1 hover:bg-white">
                    <LayoutOutlined />
                    <p>Bảng tin</p>
                </div>
            </div>
            <div className="flex-1">
                <div className="component-box">
                    <p>Tạo bài viết</p>

                    <div className="flex mt-4 space-x-1">
                        <Avatar size={30} className="min-w-[30px]" icon={<UserOutlined />} />

                        <Input placeholder="Bạn đang nghĩ gì" bordered={false} />
                    </div>

                    <Button icon={<FileImageOutlined />} className="mt-4">
                        Ảnh/Video
                    </Button>
                    <Button type="primary" className="w-full mt-2">
                        Đăng
                    </Button>
                </div>

                <div className="component-box mt-4 shadow py-1">
                    <div className="flex mt-4 space-x-2">
                        <Avatar size={40} className="min-w-[30px]" icon={<UserOutlined />} />
                        <div>
                            <p className="text-[1.05rem] font-medium">Manh Cuong</p>
                            <p className="component-text-desc text-[0.85rem]">12 giờ trước</p>
                        </div>

                        <div className="!ml-auto"></div>

                        <EllipsisOutlined />
                    </div>
                    <p className="mt-2">Cần alo 1234</p>

                    <div className="-mx-4 mt-2">
                        <img
                            src="https://toquoc.mediacdn.vn/thumb_w/640/280518851207290880/2022/12/15/p0dnxrcv-16710704848821827978943.jpg"
                            alt=""
                        />
                    </div>

                    <div className="flex my-1">
                        <div className="!ml-auto"></div>
                        <p className="component-text-desc text-[0.9rem]">20 bình luận</p>
                    </div>

                    <div className="-mx-4 my-2 flex border-border border-solid py-2 border-y-[1px] border-x-0">
                        <p className="flex-1 text-center">
                            <LikeOutlined /> Thích
                        </p>
                        <p className="flex-1 text-center">
                            <MessageOutlined /> Bình luận
                        </p>
                        <p className="flex-1 text-center">
                            <ShareAltOutlined /> Chia sẻ
                        </p>
                    </div>

                    <div className="flex my-3 space-x-2">
                        <Avatar size={34} className="min-w-[34px]" icon={<UserOutlined />} />

                        <Input placeholder="Bạn đang nghĩ gì" className="!rounded-2xl" />
                    </div>
                </div>

                <div className="component-box mt-4 shadow py-1">
                    <div className="flex mt-4 space-x-2">
                        <Avatar size={40} className="min-w-[30px]" icon={<UserOutlined />} />
                        <div>
                            <p className="text-[1.05rem] font-medium">Manh Cuong</p>
                            <p className="component-text-desc text-[0.85rem]">12 giờ trước</p>
                        </div>
                    </div>
                    <p className="mt-2">Cần alo 1234</p>

                    <div className="-mx-4 mt-2">
                        <img
                            src="https://toquoc.mediacdn.vn/thumb_w/640/280518851207290880/2022/12/15/p0dnxrcv-16710704848821827978943.jpg"
                            alt=""
                        />
                    </div>

                    <div className="flex my-1">
                        <div className="!ml-auto"></div>
                        <p className="component-text-desc text-[0.9rem]">20 bình luận</p>
                    </div>

                    <div className="-mx-4 my-2 flex border-border border-solid py-2 border-y-[1px] border-x-0">
                        <p className="flex-1 text-center">
                            <LikeOutlined /> Thích
                        </p>
                        <p className="flex-1 text-center">
                            <MessageOutlined /> Bình luận
                        </p>
                        <p className="flex-1 text-center">
                            <ShareAltOutlined /> Chia sẻ
                        </p>
                    </div>

                    <div className="flex my-3 space-x-2">
                        <Avatar size={34} className="min-w-[34px]" icon={<UserOutlined />} />

                        <Input placeholder="Bạn đang nghĩ gì" className="!rounded-2xl" />
                    </div>
                </div>
            </div>
            <div className="w-[280px] component-box">
                <div className="flex space-x-2 items-center">
                    <Avatar size={32} icon={<UserOutlined />} />
                    <p>Manh Cuong</p>
                </div>
            </div>
        </div>
    )
}
