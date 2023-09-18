import { ICommonResource } from "./_common"

export interface IResourceSideNote extends ICommonResource{
    title: string

    content: string

    user_id: string

    color_hex: string

    starred: boolean

    global: boolean

    opaicty: string

}
