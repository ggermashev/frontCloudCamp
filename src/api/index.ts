import {IForm} from "../types";
import axios from "axios";

const $host = axios.create({
    baseURL: "https://api.sbercloud.ru/content/v1/bootcamp/"
})

export async function postForm(form: IForm) {
    const response = await $host.post('frontend', form)
    return response.status
}
