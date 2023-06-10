import React, {useState} from 'react';
import "./styles/css/FormPage.css"
import {Image} from "react-bootstrap";
import Btn from "../components/Btn";
import {useNavigate} from "react-router-dom";

function Step1() {
    return (
        <div>

        </div>
    );
}

function Step2() {
    return (
        <div>

        </div>
    );
}

function Step3() {
    return (
        <div>

        </div>
    );
}

const FormPage = () => {
    const [step, setStep] = useState(1)
    const navigate = useNavigate()
    return (
        <div className="form-page column-left-flex">
            <Image className="step-img" src={require(`../images/step${step}.png`)}/>
            {step === 1 && <Step1/>}
            {step === 2 && <Step2/>}
            {step === 3 && <Step3/>}
            <div className="row-space-flex navigation">
                {step === 1
                    ? <Btn text={"Назад"} onClick={() => {navigate('/')}}/>
                    : <Btn text={"Назад"} onClick={() => {setStep(Math.max(1,step-1))}}/>}
                {step === 3
                    ? <Btn text={"Отправить"} onClick={() => {}}/>
                    : <Btn text={"Вперед"} onClick={() => {setStep(step+1)}}/>}
            </div>
        </div>
    );
};

export default FormPage;