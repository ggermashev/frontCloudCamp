import React, {FC, useMemo} from 'react';
import {Form} from 'react-bootstrap';
import "./styles/css/TextInput.css"

interface ITextInput {
    title: string,
    value: string,
    setValue: (val: string) => void,
    maxLength?: number,
    setIsValid?: (valid: boolean) => void
}

const TextInput: FC<ITextInput> = ({title, value, setValue, maxLength, setIsValid}) => {

    const counter = useMemo(() => {
        return value.replaceAll(' ', '').replaceAll('\n', '').length
    }, [value])

    const validationText = useMemo(() => {
        if (setIsValid) {
            if (maxLength) {
                if (value.replaceAll(' ', '').replaceAll('\n', '').length > maxLength) {
                    setIsValid(false)
                    return `Число символов не должно превышать ${maxLength}`
                }
            }
            setIsValid(true)
            return ""
        }
    }, [value])

    return (
        <div className="text-input">
            {title &&
                <Form.Label htmlFor={title}>
                    <p>{title}</p>
                </Form.Label>}
            <Form.Control
                as="textarea"
                rows={5}
                id={title}
                value={value}
                onChange={e => {
                    setValue(e.target.value)
                }}
            />
            <p className="counter">{counter}</p>
            {validationText !== "" &&
                <Form.Text>
                    <p className="error">{validationText}</p>
                </Form.Text>}
        </div>
    );
};

export default TextInput;