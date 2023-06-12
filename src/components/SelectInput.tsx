import React, {FC} from 'react';
import {Form} from 'react-bootstrap';
import "./styles/css/SelectInput.css"


interface ISelectInput {
    options: string[],
    placeholder: string,
    title: string,
    setOption: (s: string) => void
}

const SelectInput: FC<ISelectInput> = ({placeholder, options, title, setOption}) => {
    return (
        <div className="select-input">
            <Form.Label htmlFor={title}>
                <p>{title}</p>
            </Form.Label>
            <Form.Select placeholder={placeholder} id={title} onChange={e => setOption(e.target.value)}>
                {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
            </Form.Select>
        </div>
    );
};

export default SelectInput;