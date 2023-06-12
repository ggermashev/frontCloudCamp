import React, {FC} from 'react';
import {Form} from "react-bootstrap";
import "./styles/css/Radios.css"

interface IRadios {
    title: string,
    values: string[],
    answer: string | null,
    setAnswer: (s: string) => void,
}

const Radios: FC<IRadios> = ({title, values, answer, setAnswer}) => {
    return (
        <div className="radios">
            <p>{title}</p>
            <Form>
                {values.map((v, i) =>
                    <Form.Check name={title}
                                onChange={e => e.target.checked && setAnswer(v)}
                                type={"radio"}
                                key={i}
                                checked={answer === v}
                                label={v}/>)}
            </Form>
        </div>
    );
};

export default Radios;