import React, {FC} from 'react';
import {Button} from "react-bootstrap";
import "./styles/css/Btn.css"

interface IBtn {
    type?: "blue" | "white"
    children: string | React.ReactNode,
    onClick: () => void,
    disabled?: boolean,
    id?: string,
}

const Btn: FC<IBtn> = ({children, onClick, type="blue", disabled=false, id}) => {
    return (
        <button id={id} disabled={disabled} className={`btn-${type} btn`} onClick={onClick}><p className="p-btn">{children}</p></button>
    );
};

export default Btn;