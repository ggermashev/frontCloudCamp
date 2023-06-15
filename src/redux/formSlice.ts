import {createSlice} from "@reduxjs/toolkit";


const formSlice = createSlice({
    name: "form",
    initialState: {
        nickname: "",
        name: "",
        sername: "",
        sex: "man" as "man" | "woman",
        advantages: [] as string[],
        radio: null as null | number,
        checkbox: [] as number[],
        about: "",
    },
    reducers: {
        setNickname(state, action) {
            state.nickname = action.payload
        },
        setName(state, action) {
            state.name = action.payload
        },
        setSername(state, action) {
            state.sername = action.payload
        },
        setSex(state, action) {
            state.sex = action.payload
        },
        setAdvantages(state, action) {
            state.advantages = action.payload
        },
        addAdvantage(state) {
            state.advantages.push("")
        },
        removeAdvantage(state, action) {
            state.advantages = state.advantages.filter((adv, i) => i !== action.payload)
        },
        setRadio(state, action) {
            state.radio = action.payload
        },
        setCheckbox(state, action) {
            state.checkbox = action.payload
        },
        setAbout(state, action) {
            state.about = action.payload
        },
        clearForm(state) {
            state.nickname = ""
            state.name = ""
            state.sername = ""
            state.sex = "man"
            state.advantages = []
            state.radio = null
            state.checkbox = []
            state.about = ""
        }
    }
})

export default formSlice.reducer
export const {
    setNickname,
    setName,
    setAdvantages,
    addAdvantage,
    removeAdvantage,
    setCheckbox,
    setAbout,
    setSex,
    setSername,
    setRadio,
    clearForm,
} = formSlice.actions