import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {Image} from "react-bootstrap";
import "./styles/css/Stepper.css"
import gsap from "gsap"

interface IStepper {
    steps: number,
    currentStep: number,
}

const Stepper: FC<IStepper> = ({steps, currentStep}) => {

    const circles = new Array(steps).fill(0)

    const colors = useMemo(() => {
        const copyColors = new Array(steps - 1).fill("lightgrey")
        for (let i = 0; i < currentStep - 2; i++) {
            console.log("blue")
            copyColors[i] = "blue"
        }
        for (let i = currentStep; i < steps - 1; i++) {
            console.log("grey")
            copyColors[i] = "lightgrey"
        }

        return copyColors
    }, [currentStep])

    useEffect(() => {
        const tl1 = gsap.timeline()
        const tl2 = gsap.timeline()
        tl1.to(`#ray-bar-${currentStep - 2}`, {
            duration: 1,
            backgroundColor: "blue"
        })
        tl2.to(`#ray-bar-${currentStep - 1}`, {
            duration: 1,
            backgroundColor: "lightgrey"
        })
    }, [colors])

    return (
        <div className={"stepper"}>
            <div className="rays">
                {circles.map((step, i) =>
                    <>
                        <div className={i !== steps - 1 ? "ray" : "last-ray"}>
                            <Image src={
                                i + 1 > currentStep && require('../images/unfinished-step.png') ||
                                i + 1 == currentStep && require('../images/current-step.png') ||
                                i + 1 < currentStep && require('../images/finished-step.png')
                            } className="ray-circle"></Image>
                            {i !== steps - 1 && <div id={`ray-bar-${i}`} style={{backgroundColor: colors[i]}} className="ray-bar"></div>}
                        </div>
                    </>
                )}
            </div>
            <div className="rays">
                {circles.map((step, i) => <p>{i+1}</p>)}
            </div>
        </div>
    );
};

export default Stepper;