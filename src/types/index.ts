export interface IForm {
    nickname: string,
    name: string,
    sername: string,
    phone: string,
    email: string,
    sex: "man" | "woman"
    advantages: string[],
    radio: number | null,
    checkbox: number[],
    about: string,
}