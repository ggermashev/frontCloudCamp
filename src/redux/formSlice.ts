import {createSlice} from "@reduxjs/toolkit";


const formSlice = createSlice({
    name: "form",
    initialState: {
        nickname: "",
        name: "",
        sername: "",
        phone: "",
        email: "",
        sex: "",
        advantages: [],
        radio: null,
        checkbox: [],
        about: ""
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
        setPhone(state, action) {
            state.phone = action.payload
        },
        setEmail(state, action) {
            state.email = action.payload
        },
        setSex(state, action) {
            state.sex = action.payload
        },
        setAdvantages(state, action) {
            state.advantages = action.payload
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
    }
})

export default formSlice.reducer
export const {setNickname, setName, setPhone, setAdvantages, setCheckbox, setEmail, setAbout, setSex, setSername, setRadio} = formSlice.actions