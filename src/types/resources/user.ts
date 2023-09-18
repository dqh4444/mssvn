import { ICommonResource, IResourceImage } from "./_common"

export enum ENUM_GENDER {
    FEMALE = "FEMALE",
    MALE = "MALE"
}

export enum ENUM_USER_MEDAL {
    EXPERIENCE = "EXPERIENCE",
    DONATE = "DONATE",
    CREATIVE = "CREATIVE",
    MUCH_KNOWLEDGE = "MUCH_KNOWLEDGE",
    GREAT_TEACHER = "GREAT_TEACHER"
}

export interface IResourceUserInformation extends ICommonResource {
    fullname: string

    address: string

    avatar: IResourceImage

    bio: string

    link: string

    gender: ENUM_GENDER

    date_or_birth: Date
}

export interface IResourceUser extends ICommonResource {
    user: {
        username: string

        email: string

        phone_number: string

        email_has_verified: boolean

        phone_number_has_verified: boolean

        user_information: IResourceUserInformation

        ref_user_id: string
    }

    config: {
        medals: ENUM_USER_MEDAL[]

        has_package: boolean

        public_word: boolean

        config_for_first_time: boolean

        public_information: boolean

        selected_language_codes: string[]

        want_to_be_teacher: boolean

        job_key: string
    }
}
