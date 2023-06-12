import React, {useEffect, useState} from 'react';
import {Container, Image, Row} from "react-bootstrap";
import "./styles/css/MainPage.css"
import SocialLink from "../components/SocialLink";
import InputField from "../components/InputField";
import {useAppDispatch, useAppSelector} from "../redux";
import {setEmail, setPhone, setStep0IsValid} from "../redux/formSlice";
import Btn from "../components/Btn";
import {useNavigate} from "react-router-dom";

const MainPage = () => {

    const form = useAppSelector(state => state.form)
    const dispatch = useAppDispatch()
    const [phoneIsValid, setPhoneIsValid] = useState(false)
    const [emailIsValid, setEmailIsValid] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (phoneIsValid && emailIsValid) {
            dispatch(setStep0IsValid(true))
        } else {
            dispatch(setStep0IsValid(false))
        }
    }, [phoneIsValid, emailIsValid])

    return (
        <div className="main-page">
            <div className="column-left-flex">

                <div className="row-left-flex header">
                    <Image className="ava-img" src={require('../images/ava.jpg')}/>
                    <div>
                        <h3>Иван Иванов</h3>
                        <div className="row-left-flex">
                            <SocialLink title={"Telegram"}/>
                            <SocialLink title={"GitHub"}/>
                            <SocialLink title={"Resume"}/>
                        </div>
                    </div>
                </div>

                <InputField type="phone" setIsValid={setPhoneIsValid} title={"Номер телефона"} input={form.phone} setInput={v => dispatch(setPhone(v))}/>
                <InputField type="email" setIsValid={setEmailIsValid} title={"Email"} input={form.email} setInput={v => dispatch(setEmail(v))}/>

                <Btn onClick={() => {navigate('/form')}}>Начать</Btn>

            </div>
        </div>
    );
};

export default MainPage;