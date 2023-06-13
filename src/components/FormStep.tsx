import React, {useCallback, useEffect, useState} from 'react';
import "./styles/css/FormStep.css"
import gsap from "gsap"

interface IFormStep {
    children: React.ReactNode,
    valids?: boolean[],
    setIsValid?: (valid: boolean) => void,
}

const FormStep: React.FC<IFormStep> = ({children, valids, setIsValid}) => {

    useEffect(() => {
        if (valids?.some(v => v === false)) {
            setIsValid && setIsValid(false)
        } else {
            setIsValid && setIsValid(true)
        }
    }, valids)

    const tl = gsap.timeline()

    const [opacity, setOpacity] = useState(0)

    useEffect(() => {
        tl.set('.form-step', {
            left: '1200px',
            delay: 0.1
        }).then(() => {
            setOpacity(1)
            tl.to('.form-step', {
                duration: 1,
                ease: 'power1',
                left: '0px',
            })
        })

    }, [])

    return (
        <div style={{opacity: opacity}} className={"column-left-flex form-step"}>
            {children}
        </div>
    );
};

export default FormStep;