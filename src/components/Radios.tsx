import React, {FC, useEffect, useMemo} from 'react';
import {Form} from "react-bootstrap";
import "./styles/css/Radios.css"

interface IRadios {
    id?: string,
    title: string,
    values: string[],
    answer: string | undefined | null,
    setAnswer: (s: string) => void,
    setIsValid?: (valid: boolean) => void,
}

const Radios: FC<IRadios> = ({id, title, values, answer, setAnswer, setIsValid}) => {

    const validationText = useMemo(() => {
        if (setIsValid) {
            if (answer === null || answer === undefined) {
                setIsValid(false)
                return "Обязательное поле"
            } else {
                setIsValid(true)
                return ""
            }
        }
    }, [answer])

    return (
        <div className="radios">
            <p>{title}</p>
            <Form>
                {values.map((v, i) =>
                    <Form.Check name={title}
                                id={`${id}-option-${i+1}`}
                                onChange={e => e.target.checked && setAnswer(v)}
                                type={"radio"}
                                key={i}
                                checked={answer === v}
                                label={v}/>)}
            </Form>
            <p className={"error"}>{validationText}</p>
        </div>
    );
};

export default Radios;