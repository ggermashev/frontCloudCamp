import React, {FC} from 'react';
import {Form} from "react-bootstrap";
import "./styles/css/CheckBoxes.css"


interface ICheckBoxes {
    id?: string,
    title: string,
    values: string[],
    answers: string[],
    setAnswers: (answers: string[]) => void,
}

const CheckBoxes: FC<ICheckBoxes> = ({id, title, values, answers, setAnswers}) => {
    return (
        <div className="checkboxes">
            <p>{title}</p>
            {values.map((v, i) =>
                <Form.Check key={i}
                            type="checkbox"
                            id={`${id}-option-${i+1}`}
                            label={v}
                            checked={answers && answers.includes(v)}
                            onChange={e => {
                                e.target.checked
                                    ? setAnswers([...answers, v])
                                    : setAnswers(answers.filter(ans => ans !== v))

                            }}
                />)}
        </div>
    );
};

export default CheckBoxes;