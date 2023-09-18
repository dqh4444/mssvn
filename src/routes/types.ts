export interface IMetadata {
    title: string
    description: string
}

export interface IRouteBase {
    component?: any

    path?: string

    label?: React.ReactNode

    icon?: React.ReactNode

    children?: IRouteBase[]

    disabled?: boolean

    has_layout?: boolean

    has_auth?: boolean

    is_comming?: boolean

    metadata: IMetadata

    menu?: {
        key?: string

        show?: boolean

        has_top_devider?: boolean

        type_parent?: "group" | "sub"
    }

    breadcrumb?: {
        path: string
        title?: string
        icon?: React.ReactNode
    }[]
}
