import React, {FC} from 'react';
import SelectInput from "./SelectInput";
import InputField from "./InputField";
import Btn from "./Btn";
import {Image} from "react-bootstrap";
import "./styles/css/ManyInputFields.css"


interface IManyInputFields {
    onAdd: () => void,
    onRemove: (i: number) => void,
    values: string[],
    setValues: (values: string[]) => void,
    title?: string,
    type: "text" | "phone" | "email",
    maxLength?: number,
    allowNumbers?: boolean,
    setIsValid?: (isValid: boolean) => void,
}

const ManyInputFields: FC<IManyInputFields> = ({
                                                   title,
                                                   values,
                                                   setValues,
                                                   onAdd,
                                                   onRemove,
                                                   type,
                                                   maxLength,
                                                   allowNumbers,
                                                   setIsValid
                                               }) => {
    return (
        <div className="many-input-fields column-left-flex">
            <p>{title}</p>
            {values.map((v, i) =>
                <span className="row-left-flex">
                    <InputField key={i}
                                input={v}
                                setInput={v => {
                                    const copyValues = [...values]
                                    copyValues[i] = v
                                    setValues(copyValues)
                                }}
                                type={type}
                                setIsValid={setIsValid}
                                allowNumbers={allowNumbers}
                                maxLength={maxLength}
                    />
                    <Image className="remove-img"
                           src={require('../images/remove.png')}
                           onClick={() => {
                               onRemove(i)
                           }}
                    />
                </span>
            )}
            <Btn onClick={onAdd} type={"white"}><Image src={require('../images/plus.png')}/></Btn>
        </div>
    );
};

export default ManyInputFields;