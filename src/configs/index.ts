import { Rule } from "antd/es/form"

export const SLOGAN_BRAND = ``

export const MAIN_DOMAIN = `https://tuvu.vn`

export const LIST_COLOR_HEX_SIDE_NOTES = ["#e9e96f", "#efc0c0", "#8ddb8d", "#f8cf85", "#a8b7dd"]

export const RULE_FORM_PASSWORD: Rule[] = [
    { required: true, message: "Bạn chưa nhập mật khẩu" },
    // { type: "string", min: 8, message: "Mật khẩu có ít nhất 8 kí tự" },
    {
        pattern: /^(?=.*[0-9])(?!.*[\W_])(?!.*\s).{8,}$/,
        message: "Mật khẩu ít nhất 8 kí tự gồm chữ cái, ít nhất 1 chữ số, không dấu cách"
    }
]

export const RULE_FORM_VN_PHONE_NUMBER: Rule[] = [
    { required: true, message: "Bạn chưa nhập số điện thoại" },
    {
        pattern: /^(?:\+?84|0)(?:\d){9,10}$/,
        message: "Không đúng định dạng số điện thoại"
    }
]

export const LIST_WORD_TYPES = [
    {
        code: "noun",
        name: "Danh từ",
        description: ""
    },
    {
        code: "verb",
        name: "Động từ",
        description: ""
    },
    {
        code: "adj",
        name: "Tính từ",
        description: ""
    },
    {
        code: "adv",
        name: "Trạng từ",
        description: ""
    },
    {
        code: "pre",
        name: "Giới từ",
        description: ""
    },
    {
        code: "conjun",
        name: "Liên từ",
        description: ""
    },
    {
        code: "pronoun",
        name: "Đại từ",
        description: ""
    },
    {
        code: "determine",
        name: "Hạn định từ",
        description: ""
    },
    {
        code: "article",
        name: "Mạo từ",
        description: ""
    }
]

export const LIST_JOBS = [
    {
        key: "student",
        name: "Học sinh"
    },
    {
        key: "college_student",
        name: "Sinh viên"
    },
    {
        key: "just_have_graduated",
        name: "Mới ra trường"
    },
    {
        key: "long_time_working",
        name: "Đi làm lâu năm"
    },
    {
        key: "tutor",
        name: "Gia sư - Giáo viên"
    }
]

