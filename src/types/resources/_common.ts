export interface IResourceImage {
    name: string
    url: string
}

export enum ENUM_COMMON_STATUS {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    INACTIVE = "INACTIVE"
}

export interface ICommonResource {
    id: string

    updated_at?: Date
    created_at?: Date
}
