import { ENUM_COMMON_STATUS, ICommonResource } from "./_common"

export interface IResourceWordGroup extends ICommonResource {
    name: string

    description: string

    s_status: ENUM_COMMON_STATUS
}
