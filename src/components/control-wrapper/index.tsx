import { Avatar, Tooltip } from "antd"
import React from "react"
import { Link } from "react-router-dom"

interface IProps {
    items: {
        title: string
        icon: React.ReactNode
        onClick?: () => void
        to?: string
        className?: string
    }[]
}

export default function ControlWrapper({ items }: IProps) {
    return (
        <div className="component-control-wrapper">
            {items.map((item, index) => (
                <div key={index}>
                    {item.to ? (
                        <Link to={item.to}>
                            <Tooltip title={item.title}>
                                <Avatar
                                    className={`component-avatar-button ${item.className}`}
                                    size={46}
                                    icon={item.icon}
                                />
                            </Tooltip>
                        </Link>
                    ) : (
                        <Tooltip title={item.title}>
                            <Avatar
                                className={`component-avatar-button ${item.className}`}
                                size={46}
                                icon={item.icon}
                                onClick={item.onClick}
                            />
                        </Tooltip>
                    )}
                </div>
            ))}
        </div>
    )
}
