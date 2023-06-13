import React, {useEffect, useState} from 'react';
import {Container, Image, Row} from "react-bootstrap";
import "./styles/css/MainPage.css"
import SocialLink from "../components/SocialLink";
import InputField from "../components/InputField";
import {useAppDispatch, useAppSelector} from "../redux";
import {setEmail, setPhone} from "../redux/formSlice";
import Btn from "../components/Btn";
import {useNavigate} from "react-router-dom";
import gsap from 'gsap';
import {setStep0} from "../redux/validSlice";


const MainPage = () => {

    const form = useAppSelector(state => state.form)
    const valid = useAppSelector(state => state.valid)
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

    return (
        <div className="main-page">
            <div className="column-left-flex">

                <div className="row-left-flex header">
                    <Image className="ava-img" src={require('../images/ava.png')}/>
                    <div>
                        <h3>Иван Иванов</h3>
                        <div className="row-left-flex">
                            <SocialLink title={"Telegram"}/>
                            <SocialLink title={"GitHub"}/>
                            <SocialLink title={"Resume"}/>
                        </div>
                    </div>
                </div>

                <InputField type="phone" setIsValid={setPhoneIsValid} title={"Номер телефона"} input={form.phone}
                            setInput={v => dispatch(setPhone(v))} required={true} placeholder={'+7 (777) 777-77-77'}/>
                <InputField type="email" setIsValid={setEmailIsValid} title={"Email"} input={form.email}
                            setInput={v => dispatch(setEmail(v))} required={true} placeholder={'почта'}/>

                <div id={"start-btn-wrap"}
                     onMouseOver={() => {
                         if (!valid.step0) {
                             tl.to('#start-btn', {
                                 duration: 0.1,
                                 position: 'relative',
                                 left: '110%',
                             })
                         }
                     }}
                     onMouseLeave={() => {
                         if (!valid.step0) {
                             tl.to('#start-btn', {
                                 duration: 0.1,
                                 left: '0',
                             })
                         }
                     }}
                >
                    <Btn
                        onClick={() => {
                            navigate('/frontCloudCamp/form')
                        }}
                        disabled={!valid.step0}
                        id={'start-btn'}
                    >Начать</Btn>
                </div>

            </div>
        </div>
    );
};

export default MainPage;