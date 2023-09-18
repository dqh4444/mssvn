const ROUTER_AUTH = "auth"

const ROUTER_USER = "users"

export const ROUTER_WORD = "words"

const ROUTER_PACKAGE = "packages"

export const ROUTER_SIDE_NOTE = "side-notes"

export const ROUTER_WORD_GROUP = "word-groups"

export const API_PATH_MIND_MAP_PROJECT = `mind-map-projects`

export const API_PATH_LOGIN = `${ROUTER_AUTH}/login`

export const API_PATH_REGISTER = `${ROUTER_AUTH}/register`

export const API_PATH_FORGET_PASSWORD = `${ROUTER_AUTH}/forget-password`

export const API_PATH_CHANGE_PASSWORD = `${ROUTER_AUTH}/change-password`

export const API_PATH_CHANGE_PASSWORD_WHEN_FORGET = `${ROUTER_AUTH}/change-password-when-forget`

export const API_PATH_VERIFY_USER = `${ROUTER_USER}/me`

export const API_PATH_USER_CONFIG = `${ROUTER_USER}/config`

export const API_PATH_USER_LOG = `${ROUTER_USER}/log`

export const API_PATH_USER_PHONE_NUMBER = `${ROUTER_USER}/phone-number`

export const API_PATH_WORDS = `${ROUTER_WORD}/me`

export const API_PATH_WORD_GROUPS = `${ROUTER_WORD_GROUP}`

//-------------------
const PATH_PUBLIC = "p"

export const API_PATH_PUBLIC_PACKAGES = `${PATH_PUBLIC}/${ROUTER_PACKAGE}`
