import { ICommonResource, IResourceImage } from "./_common"

export interface IResourceWord extends ICommonResource {
    vocabulary: string
    mean: string
    description: string
    starred: boolean
    memorize: boolean
    user_id: string
    word_type_codes: string[]
    word_group_ids: string[]
    language_code: string
    synonym_ids: string[]
    antonym_ids: string[]
    image: IResourceImage
    specific_example: string
    category_ids: string[]
}
