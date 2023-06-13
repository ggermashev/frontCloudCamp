import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import "./styles/css/FormPage.css"
import {Image} from "react-bootstrap";
import Btn from "../components/Btn";
import {useNavigate} from "react-router-dom";
import FormStep from "../components/FormStep";
import InputField from "../components/InputField";
import {useAppDispatch, useAppSelector} from "../redux";
import {
    addAdvantage, clearForm,
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
import gsap from "gsap";
import {postForm} from "../api";
import {setStep1, setStep2, setStep3} from "../redux/validSlice";
import {Simulate} from "react-dom/test-utils";
import abort = Simulate.abort;

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
            <InputField required={true} title={"Nickname"} input={form.nickname}
                        setInput={v => dispatch(setNickname(v))} type={"text"}
                        setIsValid={setNicknameIsValid} maxLength={30}
                        placeholder={"крутой nickname123"}
            />
            <InputField required={true} title={"Name"} input={form.name} setInput={v => dispatch(setName(v))}
                        type={"text"} placeholder={'name'}
                        setIsValid={setNameIsValid} maxLength={50} allowNumbers={false}
            />
            <InputField required={true} title={"Sername"} input={form.sername} setInput={v => dispatch(setSername(v))}
                        type={"text"} placeholder={'sername'}
                        setIsValid={setSernameIsValid} maxLength={50} allowNumbers={false}/>
            <SelectInput options={['man', 'woman']} setOption={v => {
                dispatch(setSex(v))
            }} placeholder={'Не выбрано'} title={'Sex'}/>
        </FormStep>
    );
}

const Step2: FC<IStep> = function ({setIsValid}) {
    const form = useAppSelector(state => state.form)
    const dispatch = useAppDispatch()

    const [radioIsValid, setRadioIsValid] = useState(false)

    return (
        <FormStep valids={[radioIsValid]} setIsValid={setIsValid}>
            <div className="advantages">
                <ManyInputFields title={"Advantages"} onAdd={() => dispatch(addAdvantage())}
                                 onRemove={i => dispatch(removeAdvantage(i))}
                                 values={form.advantages} setValues={vals => dispatch(setAdvantages(vals))}
                                 type={"text"}/>
            </div>
            <CheckBoxes title={"Checkbox group"} values={['1', '2', '3']} answers={form.checkbox.length > 0 ? form.checkbox.map(ans => ans.toString()) : []}
                        setAnswers={val => dispatch(setCheckbox(val.map(v => +v)))}/>
            <Radios title={"Radio group"} values={['1', '2', '3']} answer={form.radio?.toString()}
                    setAnswer={v => dispatch(setRadio(+v))} setIsValid={setRadioIsValid}/>
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
                    navigate('/frontCloudCamp/')
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

    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)

    const form = useAppSelector(state => state.form)
    const valid = useAppSelector(state => state.valid)
    const dispatch = useAppDispatch()

    const tl = gsap.timeline()

    return (
        <div className="form-page column-left-flex">
            <Image className="step-img" src={require(`../images/step${step}.png`)}/>
            {step === 1 && <Step1 setIsValid={(valid) => dispatch(setStep1(valid))}/>}
            {step === 2 && <Step2 setIsValid={(valid) => dispatch(setStep2(valid))}/>}
            {step === 3 && <Step3 setIsValid={(valid) => dispatch(setStep3(valid))}/>}
            <div className="row-space-flex navigation">
                {step === 1
                    ? <Btn type={'white'} onClick={() => {
                        navigate('/frontCloudCamp')
                    }}>Назад</Btn>
                    : <Btn type={'white'} onClick={() => {
                        tl.to('.form-step', {
                            duration: 1,
                            ease: "power1",
                            left: '-600px',
                        })
                        setTimeout(() => setStep(Math.max(1, step - 1)), 1000)
                    }}>Назад</Btn>}

                <div id={'next-btn-wrap'}
                     onMouseOver={() => {
                         if (step === 1 && !valid.step1 || step === 2 && !valid.step2 || step === 3 && !valid.step3) {
                             tl.to('#next-btn', {
                                 duration: 0.1,
                                 position: 'relative',
                                 left: '-110%',
                             })
                         }
                     }}
                     onMouseLeave={() => {
                         if (step === 1 && !valid.step1 || step === 2 && !valid.step2 || step === 3 && !valid.step3) {
                             tl.to('#next-btn', {
                                 duration: 0.1,
                                 left: '0',
                             })
                         }
                     }}
                >
                    {step === 3
                        ? <Btn id={'next-btn'}
                               onClick={() => {
                                   if (valid.all) {
                                       postForm(form).then(
                                           ans => {
                                               console.log(form)
                                               console.log(ans)
                                               dispatch(clearForm())
                                               setShowSuccessModal(true)
                                           },
                                           err => {
                                               setShowErrorModal(true)
                                           }
                                       )
                                   } else {
                                       setShowErrorModal(true)
                                   }
                               }}
                               disabled={!valid.step3}
                        >Отправить</Btn>
                        : <Btn
                            id={'next-btn'}
                            disabled={step === 1 && !valid.step1 || step === 2 && !valid.step2 || step === 3 && !valid.step3}
                            onClick={() => {
                                tl.to('.form-step', {
                                    duration: 1,
                                    ease: "power1",
                                    left: '-600px',
                                })
                                setTimeout(() => setStep(step + 1), 1000)
                            }}
                        >Далее</Btn>}
                </div>
            </div>
            {showSuccessModal && createPortal(<ModalWindow><SuccessWindow
                onClose={() => setShowSuccessModal(false)}/></ModalWindow>, document.body)}
            {showErrorModal && createPortal(<ModalWindow><ErrorWindow
                onClose={() => setShowErrorModal(false)}/></ModalWindow>, document.body)}
        </div>
    );
};

export default FormPage;