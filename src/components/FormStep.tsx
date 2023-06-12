import React, {useEffect} from 'react';
import "./styles/css/FormStep.css"

interface IFormStep {
    children: React.ReactNode,
    valids?: boolean[],
    setIsValid?: (valid: boolean) => void
}

const FormStep: React.FC<IFormStep> = ({children, valids, setIsValid}) => {

    useEffect(() => {
        if (valids?.some(v => v === false)) {
            setIsValid && setIsValid(false)
        } else {
            setIsValid && setIsValid(true)
        }
    }, valids)

    return (
        <div className={"column-left-flex form-step"}>
            {children}
        </div>
    );
};

export default FormStep;