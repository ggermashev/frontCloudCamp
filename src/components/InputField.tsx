import React, {FC, useEffect, useMemo, useState} from 'react';
import {Form} from "react-bootstrap";
import "./styles/css/InputField.css"

interface IInput {
    title: string,
    input: string,
    setInput: (input: string) => void,
    type: "text" | "phone" | "email",
    setIsValid: (isValid: boolean) => void,
    maxLength?: number,
    allowNumbers?: boolean,
}

const InputField: FC<IInput> = ({title, input, setInput, type, setIsValid, maxLength, allowNumbers=true}) => {

    const validationText = useMemo(() => {
        switch (type) {
            case "text":
                if (maxLength) {
                    if (input.length > maxLength) {
                        setIsValid(false)
                        return `Число символов не должно превышать ${maxLength}`
                    }
                }
                if (!allowNumbers) {
                    if (input.search(/\d/) !== -1) {
                        setIsValid(false)
                        return `Числовые значения не допускаются `
                    }
                }
                if (input.search(/\W/) !== -1) {
                    setIsValid(false)
                    return `Допускаются только буквы и цифры`
                }
                setIsValid(true)
                return ""

            case "phone":
                if (input.length > 0 && input.at(-1)?.search(/[\D ]/) !== -1) {
                    setIsValid(false)
                    return `Допускаются только цифры`
                }
                if (input.length == 1) {
                    setInput(`+${input} `)
                }
                if (input.length == 6) {
                    setInput(`${input} `)
                }
                if (input.length == 10) {
                    setInput(input + '-')
                }
                if (input.length == 13) {
                    setInput(input + '-')
                }
                if (input.length > 16) {
                    setInput(input.slice(0, 16))
                }
                setIsValid(true)
                return ""

            case "email":
                if (input.length > 0 && !/\w+@\w+\.\w+/.test(input)) {
                    setIsValid(false)
                    return "нужен@такой.формат"
                }

                setIsValid(true)
                return ""

            default:
                setIsValid(true)
                return ""
        }

    }, [input])

    return (
        <div className="input-field">
            <Form.Label htmlFor={title}>
                <p>{title}</p>
            </Form.Label>
            <Form.Control
                type="text"
                id={title}
                value={input}
                onChange={e => {
                    setInput(e.target.value)
                }}
            />
            <Form.Text>
                <p>{validationText}</p>
            </Form.Text>
        </div>
    );
};

export default InputField;