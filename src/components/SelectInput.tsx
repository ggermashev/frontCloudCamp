import React, {FC} from 'react';
import {Form} from 'react-bootstrap';
import "./styles/css/SelectInput.css"


interface ISelectInput {
    id?: string,
    options: string[],
    placeholder: string,
    title: string,
    setOption: (s: string) => void
}

const SelectInput: FC<ISelectInput> = ({id, placeholder, options, title, setOption}) => {
    return (
        <div className="select-input">
            <Form.Label htmlFor={title}>
                <p>{title}</p>
            </Form.Label>
            <Form.Select placeholder={placeholder} id={id} onChange={e => setOption(e.target.value)}>
                {options.map((opt, i) => <option key={i} id={`${id}-option-${opt}`} value={opt}>{opt}</option>)}
            </Form.Select>
        </div>
    );
};

export default SelectInput;