import React, {FC, useEffect, useMemo, useState} from 'react';
import "./styles/css/FormPage.css"
import {Image} from "react-bootstrap";
import Btn from "../components/Btn";
import {useNavigate} from "react-router-dom";
import FormStep from "../components/FormStep";
import InputField from "../components/InputField";
import {useAppDispatch, useAppSelector} from "../redux";
import {
    addAdvantage,
    removeAdvantage, setAbout,
    setAdvantages, setCheckbox,
    setName,
    setNickname, setRadio,
    setSername,
    setSex
} from "../redux/formSlice";
import {useSelector} from "react-redux";
import SelectInput from "../components/SelectInput";
import ManyInputFields from "../components/ManyInputFields";
import CheckBoxes from "../components/CheckBoxes";
import Radios from "../components/Radios";
import TextInput from "../components/TextInput";
import {createPortal} from "react-dom";
import ModalWindow from "../components/ModalWindow";

interface IStep {
    setIsValid?: (valid: boolean) => void
}

interface IWindow {
    onClose: () => void
}

const Step1: FC<IStep> = function ({setIsValid}) {
    const form = useAppSelector(state => state.form)
    const dispatch = useAppDispatch()

    const [nicknameIsValid, setNicknameIsValid] = useState(false)
    const [nameIsValid, setNameIsValid] = useState(false)
    const [sernameIsValid, setSernameIsValid] = useState(false)


    return (
        <FormStep valids={[nicknameIsValid, nameIsValid, sernameIsValid]} setIsValid={setIsValid}>
            <InputField title={"Nickname"} input={form.nickname} setInput={v => dispatch(setNickname(v))} type={"text"}
                        setIsValid={setNicknameIsValid} maxLength={30}/>
            <InputField title={"Name"} input={form.name} setInput={v => dispatch(setName(v))} type={"text"}
                        setIsValid={setNameIsValid} maxLength={50} allowNumbers={false}/>
            <InputField title={"Sername"} input={form.sername} setInput={v => dispatch(setSername(v))} type={"text"}
                        setIsValid={setSernameIsValid} maxLength={50} allowNumbers={false}/>
            <SelectInput options={['man', 'woman']} setOption={v => {
                dispatch(setSex(v))
            }} placeholder={'Не выбрано'} title={'Sex'}/>
        </FormStep>
    );
}

const Step2: FC<IStep> = function () {
    const form = useAppSelector(state => state.form)
    const dispatch = useAppDispatch()

    return (
        <FormStep>
            <div className="advantages">
                <ManyInputFields title={"Advantages"} onAdd={() => dispatch(addAdvantage())}
                                 onRemove={i => dispatch(removeAdvantage(i))}
                                 values={form.advantages} setValues={vals => dispatch(setAdvantages(vals))}
                                 type={"text"}/>
            </div>
            <CheckBoxes title={"Checkbox group"} values={['1', '2', '3']} answers={form.checkbox}
                        setAnswers={val => dispatch(setCheckbox(val))}/>
            <Radios title={"Radio group"} values={['1', '2', '3']} answer={form.radio}
                    setAnswer={v => dispatch(setRadio(v))}/>
        </FormStep>
    );
}

const Step3: FC<IStep> = function ({setIsValid}) {
    const form = useAppSelector(state => state.form)
    const dispatch = useAppDispatch()

    const [textInputIsValid, setTextInputIsValid] = useState(false)

    return (
        <FormStep valids={[textInputIsValid]} setIsValid={setIsValid}>
            <TextInput title={"About"}
                       value={form.about}
                       setValue={v => {
                           dispatch(setAbout(v))
                       }}
                       maxLength={200}
                       setIsValid={setTextInputIsValid}
            />
        </FormStep>
    );
}

const SuccessWindow: FC<IWindow> = function ({onClose}) {
    const navigate = useNavigate()

    return (
        <div className="column-center-flex success-window">
            <h4>Форма успешно отправлена</h4>
            <Image src={require('../images/success.png')}/>
            <Btn
                onClick={() => {
                    onClose()
                    navigate('/')
                }}
            >На главную</Btn>
        </div>
    )
}

const ErrorWindow: FC<IWindow> = function ({onClose}) {
    return (
        <div className="error-window column-center-flex">
            <div className="row-space-flex">
                <h4>Ошибка</h4>
                <Image className="x" onClick={() => onClose()} src={require('../images/x.png')}/>
            </div>
            <Image src={require('../images/error.png')}/>
            <Btn onClick={() => onClose()}>Закрыть</Btn>
        </div>
    )
}

const FormPage = () => {
    const [step, setStep] = useState(1)
    const navigate = useNavigate()

    const [step1IsValid, setStep1IsValid] = useState(false)
    const [step3IsValid, setStep3IsValid] = useState(false)

    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)

    const form = useAppSelector(state => state.form)

    return (
        <div className="form-page column-left-flex">
            <Image className="step-img" src={require(`../images/step${step}.png`)}/>
            {step === 1 && <Step1 setIsValid={setStep1IsValid}/>}
            {step === 2 && <Step2/>}
            {step === 3 && <Step3 setIsValid={setStep3IsValid}/>}
            <div className="row-space-flex navigation">
                {step === 1
                    ? <Btn type={'white'} onClick={() => {
                        navigate('/')
                    }}>Назад</Btn>
                    : <Btn type={'white'} onClick={() => {
                        setStep(Math.max(1, step - 1))
                    }}>Назад</Btn>}
                {step === 3
                    ? <Btn onClick={() => {
                        console.log(step1IsValid , step3IsValid , form.step0IsValid)
                        if (step1IsValid && step3IsValid && form.step0IsValid) {
                            setShowSuccessModal(true)
                        } else {
                            setShowErrorModal(true)
                        }
                    }}>Отправить</Btn>
                    : <Btn onClick={() => {
                        setStep(step + 1)
                    }}>Далее</Btn>}
            </div>
            {showSuccessModal && createPortal(<ModalWindow><SuccessWindow onClose={() => setShowSuccessModal(false)}/></ModalWindow>, document.body)}
            {showErrorModal && createPortal(<ModalWindow><ErrorWindow onClose={() => setShowErrorModal(false)}/></ModalWindow>, document.body)}
        </div>
    );
};

export default FormPage;