import React, {FC} from 'react';
import {Button} from "react-bootstrap";
import "./styles/css/Btn.css"

const Btn: FC<{text: string, onClick: () => void}> = ({text, onClick}) => {
    return (
        <Button onClick={onClick}>{text}</Button>
    );
};

export default Btn;