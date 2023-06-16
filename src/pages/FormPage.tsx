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
import Stepper from "../components/Stepper";

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
            <InputField required={true} id={"field-nickname"} title={"Nickname"} input={form.nickname}
                        setInput={v => dispatch(setNickname(v))} type={"text"}
                        setIsValid={setNicknameIsValid} maxLength={30}
                        placeholder={"крутой nickname123"}
            />
            <InputField required={true} id={"field-name"} title={"Name"} input={form.name}
                        setInput={v => dispatch(setName(v))}
                        type={"text"} placeholder={'name'}
                        setIsValid={setNameIsValid} maxLength={50} allowNumbers={false}
            />
            <InputField required={true} id={"field-sername"} title={"Sername"} input={form.sername}
                        setInput={v => dispatch(setSername(v))}
                        type={"text"} placeholder={'sername'}
                        setIsValid={setSernameIsValid} maxLength={50} allowNumbers={false}/>
            <SelectInput id={"field-sex"} options={['man', 'woman']} setOption={v => {
                dispatch(setSex(v))
            }} placeholder={'Не выбрано'} title={'Sex'}/>
        </FormStep>
    );
}

const Step2: FC<IStep> = function ({setIsValid}) {
    const form = useAppSelector(state => state.form)
    const dispatch = useAppDispatch()

    const [radioIsValid, setRadioIsValid] = useState(false)
    const [advantagesAreValid, setAdvantagesAreValid] = useState(false)

    return (
        <FormStep valids={[radioIsValid]} setIsValid={setIsValid}>
            <div className="advantages">
                <ManyInputFields title={"Advantages"} id={"field-advantages"} onAdd={() => dispatch(addAdvantage())}
                                 onRemove={i => dispatch(removeAdvantage(i))}
                                 values={form.advantages} setValues={vals => dispatch(setAdvantages(vals))}
                                 type={"text"} />
            </div>
            <CheckBoxes title={"Checkbox group"} id={"field-checkbox-group"} values={['1', '2', '3']}
                        answers={form.checkbox.length > 0 ? form.checkbox.map(ans => ans.toString()) : []}
                        setAnswers={val => dispatch(setCheckbox(val.map(v => +v)))}/>
            <Radios title={"Radio group"} id={"field-radio-group"} values={['1', '2', '3']}
                    answer={form.radio?.toString()}
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
                       id={"field-about"}
                       placeholder={"Информация о себе"}
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
        <ModalWindow>
            <div className="column-center-flex success-window">
                <h4>Форма успешно отправлена</h4>
                <Image src={require('../images/success.png')}/>
                <Btn
                    id={"button-to-main"}
                    onClick={() => {
                        onClose()
                        navigate('/')
                    }}
                >На главную</Btn>
            </div>
        </ModalWindow>
    )
}

const ErrorWindow: FC<IWindow> = function ({onClose}) {
    return (
        <ModalWindow>
            <div className="error-window column-center-flex">
                <div className="row-space-flex">
                    <h4>Ошибка</h4>
                    <Image className="x" onClick={() => onClose()} src={require('../images/x.png')}/>
                </div>
                <Image src={require('../images/error.png')}/>
                <Btn id={"button-close"} onClick={() => onClose()}>Закрыть</Btn>
            </div>
        </ModalWindow>
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

    useEffect(() => {
        tl.to(".form-page", {
            duration: 0.5,
            opacity: 1
        })
    }, [])

    return (
        <div className="form-page column-left-flex">
            <Stepper steps={3} currentStep={step}/>
            {step === 1 && <Step1 setIsValid={(valid) => dispatch(setStep1(valid))}/>}
            {step === 2 && <Step2 setIsValid={(valid) => dispatch(setStep2(valid))}/>}
            {step === 3 && <Step3 setIsValid={(valid) => dispatch(setStep3(valid))}/>}
            <div className="row-space-flex navigation">
                {step === 1
                    ? <Btn type={'white'}
                           id={"button-back"}
                           onClick={() => {
                               tl.to(".form-page", {
                                   duration: 0.5,
                                   opacity: 0
                               }).then(() => navigate('/'))
                           }}>Назад</Btn>
                    : <Btn type={'white'}
                           id={"button-back"}
                           onClick={() => {
                               tl.to('.form-step', {
                                   duration: 1,
                                   ease: "power1",
                                   left: '-900px',
                               })
                               setTimeout(() => setStep(Math.max(1, step - 1)), 1000)
                           }}>Назад</Btn>}

                <div id={'next-btn-wrap'}
                     onMouseOver={() => {
                         if (step === 1 && !valid.step1 || step === 2 && !valid.step2) {
                             tl.to('#button-next', {
                                 duration: 0.1,
                                 position: 'relative',
                                 left: '-110%',
                             })
                         }
                         if (step === 3 && !valid.step3) {
                             tl.to('#button-send', {
                                 duration: 0.1,
                                 position: 'relative',
                                 left: '-110%',
                             })
                         }
                     }}
                     onMouseLeave={() => {
                         if (step === 1 && !valid.step1 || step === 2 && !valid.step2) {
                             tl.to('#button-next', {
                                 duration: 0.1,
                                 left: '0',
                             })
                         }
                         if (step === 3 && !valid.step3) {
                             tl.to('#button-send', {
                                 duration: 0.1,
                                 left: '0',
                             })
                         }
                     }}
                >
                    {step === 3
                        ? <Btn id={'button-send'}
                               onClick={() => {
                                   if (valid.all) {
                                       postForm(form).then(
                                           ans => {
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
                               disabled={!valid.all}
                        >Отправить</Btn>
                        : <Btn
                            id={'button-next'}
                            disabled={step === 1 && !valid.step1 || step === 2 && !valid.step2 || step === 3 && !valid.step3}
                            onClick={() => {
                                tl.to('.form-step', {
                                    duration: 1,
                                    ease: "power1",
                                    left: '-900px',
                                })
                                setTimeout(() => setStep(step + 1), 1000)
                            }}
                        >Далее</Btn>}
                </div>
            </div>
            {showSuccessModal && createPortal(<SuccessWindow
                onClose={() => setShowSuccessModal(false)}/>, document.body)}
            {showErrorModal && createPortal(<ErrorWindow
                onClose={() => setShowErrorModal(false)}/>, document.body)}
        </div>
    );
};

export default FormPage;