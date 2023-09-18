import { ICommonResource } from "./_common"

export interface IResourceMindMapProject extends ICommonResource {
    name: string

    user_id: string

    description: string

    json: string

    starred: boolean

    category_ids: string[]
}
