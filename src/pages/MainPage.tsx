import React, {useEffect, useState} from 'react';
import {Container, Image, Row} from "react-bootstrap";
import "./styles/css/MainPage.css"
import SocialLink from "../components/SocialLink";
import InputField from "../components/InputField";
import {useAppDispatch, useAppSelector} from "../redux";
import Btn from "../components/Btn";
import {useNavigate} from "react-router-dom";
import gsap from 'gsap';
import {setStep0} from "../redux/validSlice";


const MainPage = () => {

    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const dispatch = useAppDispatch()
    const [phoneIsValid, setPhoneIsValid] = useState(false)
    const [emailIsValid, setEmailIsValid] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (phoneIsValid && emailIsValid) {
            dispatch(setStep0(true))
        } else {
            dispatch(setStep0(false))
        }
    }, [phoneIsValid, emailIsValid])

    const tl = gsap.timeline()

    useEffect(() => {
        tl.to(".main-page", {
            duration: 1,
            opacity: 1
        })
    }, [])

    return (
        <div className="main-page">
            <div className="column-left-flex">

                <div className="row-left-flex header">
                    <div className="ava-img-wrap"/>
                    <div>
                        <h3>Григорий Гермашев</h3>
                        <div className="row-left-flex">
                            <SocialLink link={"https://t.me/g_grm"} title={"Telegram"}/>
                            <SocialLink link={"https://github.com/ggermashev?tab=repositories"} title={"GitHub"}/>
                            <SocialLink link={"https://hh.ru/resume/e3780d9eff0bf059ae0039ed1f587a6c487079"} title={"Resume"}/>
                        </div>
                    </div>
                </div>

                <InputField type="phone" setIsValid={setPhoneIsValid} title={"Номер телефона"} input={phone}
                            setInput={v => setPhone(v)} placeholder={'+7 (961) 670-44-00'}/>
                <InputField type="email" setIsValid={setEmailIsValid} title={"Email"} input={email}
                            setInput={v => setEmail(v)} placeholder={'ggermashev@gmail.com'}/>

                <div id={"start-btn-wrap"}>
                    <Btn
                        onClick={() => {
                            tl.to('.main-page', {
                                duration: 0.5,
                                opacity: 0
                            }).then(() => navigate('/create'))
                        }}
                        id={'button-start'}
                    >Начать</Btn>
                </div>

            </div>
        </div>
    );
};

export default MainPage;