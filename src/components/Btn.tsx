import React, {FC} from 'react';
import {Button} from "react-bootstrap";
import "./styles/css/Btn.css"

interface IBtn {
    type?: "blue" | "white"
    children: string | React.ReactNode,
    onClick: () => void,
}

const Btn: FC<IBtn> = ({children, onClick, type="blue"}) => {
    return (
        <button className={`btn-${type} btn`} onClick={onClick}><p className="p-btn">{children}</p></button>
    );
};

export default Btn;