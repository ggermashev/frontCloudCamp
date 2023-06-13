import {createSlice} from "@reduxjs/toolkit";


function checkAll(...args: boolean[]) {
    for (let valid of args) {
        if (!valid) return false
    }
    return true
}

const validSlice = createSlice({
    name: "valid",
    initialState: {
        step0: false,
        step1: false,
        step2: false,
        step3: false,
        all: false
    },
    reducers: {
        setStep0(state, action) {
            state.step0 = action.payload
            state.all = checkAll(state.step0, state.step1, state.step2, state.step3)
        },
        setStep1(state, action) {
            state.step1 = action.payload
            state.all = checkAll(state.step0, state.step1, state.step2, state.step3)
        },
        setStep2(state, action) {
            state.step2 = action.payload
            state.all = checkAll(state.step0, state.step1, state.step2, state.step3)
        },
        setStep3(state, action) {
            state.step3 = action.payload
            state.all = checkAll(state.step0, state.step1, state.step2, state.step3)
        },
    }
})

export default validSlice.reducer
export const {setStep0, setStep1, setStep2, setStep3} = validSlice.actions