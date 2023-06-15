import React, {FC, useEffect, useMemo, useState} from 'react';
import {Form} from "react-bootstrap";
import "./styles/css/InputField.css"

export interface IInput {
    id?: string,
    title?: string,
    input: string,
    setInput: (input: string) => void,
    placeholder?: string,
    type: "text" | "phone" | "email",
    maxLength?: number,
    allowNumbers?: boolean,
    required?: boolean,
    setIsValid?: (isValid: boolean) => void,
}

const InputField: FC<IInput> = ({
                                    id,
                                    title,
                                    input,
                                    setInput,
                                    placeholder,
                                    type,
                                    setIsValid,
                                    maxLength,
                                    allowNumbers = true,
                                    required = false
                                }) => {

    const validationText = useMemo(() => {
        if (setIsValid) {
            if (required && input.length === 0) {
                setIsValid(false)
                return "Обязательное поле"
            }
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
                    if (!/^[ёЁА-яa-zA-Z0-9]+$/.test(input)) {
                        setIsValid(false)
                        return `Допускаются только буквы и цифры`
                    }

                    setIsValid(true)
                    return ""

                case "phone":
                    if (input.length > 0 && input.at(-1)?.search(/[\D ]/) !== -1) {
                        setInput(`${input.slice(0, -1)}`)
                    }
                    if (/\d/.test(input.at(-1) as string)) {
                        if (input.length == 1) {
                            setInput(`+${input}`)
                        }
                        if (input.length == 3) {
                            setInput(`${input.slice(0, -1)} ${input.at(-1)}`)
                        }
                        if (input.length == 4) {
                            setInput(`${input.slice(0, -1)}(${input.at(-1)}`)
                        }
                        if (input.length == 8) {
                            setInput(`${input.slice(0, -1)}) ${input.at(-1)}`)
                        }
                        if (input.length == 13) {
                            setInput(`${input.slice(0, -1)}-${input.at(-1)}`)
                        }
                        if (input.length == 16) {
                            setInput(`${input.slice(0, -1)}-${input.at(-1)}`)
                        }
                        if (input.length > 18) {
                            setInput(input.slice(0, -1))
                        }
                    }
                    if (input.length > 0 && !/\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}/.test(input)) {
                        setIsValid(false)
                        return "Не соответствует шаблону +7 (777) 777-77-77"
                    }
                    setIsValid(true)
                    return ""

                case "email":
                    if (input.length > 0 && !/.+@.+\..+/.test(input)) {
                        setIsValid(false)
                        return "нужен@такой.формат"
                    }

                    setIsValid(true)
                    return ""

                default:
                    setIsValid(true)
                    return ""
            }
        }
        return ""
    }, [input])

    return (
        <div className="input-field">
            {title && <Form.Label htmlFor={title}>
                <p>{title}</p>
            </Form.Label>}
            <Form.Control
                type="text"
                id={id}
                value={input}
                placeholder={placeholder}
                onChange={e => {
                    setInput(e.target.value)
                }}
            />
            {validationText !== "" && <Form.Text>
                <p className="error">{validationText}</p>
            </Form.Text>}
        </div>
    );
};

export default InputField;