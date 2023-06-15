import React, {FC, useEffect, useState} from 'react';
import SelectInput from "./SelectInput";
import InputField from "./InputField";
import Btn from "./Btn";
import {Image} from "react-bootstrap";
import "./styles/css/ManyInputFields.css"


interface IManyInputFields {
    id?: string,
    onAdd: () => void,
    onRemove: (i: number) => void,
    values: string[],
    setValues: (values: string[]) => void,
    title?: string,
    type: "text" | "phone" | "email",
    maxLength?: number,
    allowNumbers?: boolean,
    required?: boolean,
    setIsValid?: (isValid: boolean) => void,
}

const ManyInputFields: FC<IManyInputFields> = ({
                                                   id,
                                                   title,
                                                   values,
                                                   setValues,
                                                   onAdd,
                                                   onRemove,
                                                   type,
                                                   maxLength,
                                                   allowNumbers,
                                                   required = false,
                                                   setIsValid
                                               }) => {

    const [inputsAreValid, setInputsAreValid] = useState<boolean[]>([])
    useEffect(() => {
        if (inputsAreValid.length == 0) {
            setIsValid && setIsValid(true)
        } else {
            setIsValid && setIsValid(true)
            for (let valid of inputsAreValid) {
                if (!valid) {
                    setIsValid && setIsValid(false)
                }
            }
        }
    }, [inputsAreValid])


    return (
        <div className="many-input-fields column-left-flex">
            <p>{title}</p>
            {values.map((v, i) =>
                <span className="row-left-flex">
                    <InputField key={i}
                                id={`${id}-${i + 1}`}
                                input={v}
                                setInput={v => {
                                    const copyValues = [...values]
                                    copyValues[i] = v
                                    setValues(copyValues)
                                }}
                                type={type}
                                setIsValid={setIsValid
                                    ? valid => {
                                        const copyInputsAreValid = [...inputsAreValid]
                                        copyInputsAreValid[i] = valid
                                        setInputsAreValid(copyInputsAreValid)
                                    }
                                    : undefined
                                }
                                allowNumbers={allowNumbers}
                                maxLength={maxLength}
                                required={required}
                    />
                    <Image className="remove-img"
                           src={require('../images/remove.png')}
                           id={`button-remove-${i + 1}`}
                           onClick={() => {
                               setInputsAreValid(inputsAreValid.filter((val,j) => j !== i))
                               onRemove(i)
                           }}
                    />
                </span>
            )}
            <Btn id={"button-add"} onClick={() => {
                onAdd();
                setInputsAreValid([...inputsAreValid, false])
            }} type={"white"}><Image src={require('../images/plus.png')}/></Btn>
        </div>
    );
};

export default ManyInputFields;