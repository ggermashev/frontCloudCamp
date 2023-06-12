import React, {FC} from 'react';
import "./styles/css/ModalWindow.css"

interface IModalWindow {
    children: React.ReactNode,
}

const ModalWindow: FC<IModalWindow> = ({children}) => {
    return (
        <div className="modal-wrap">
            <div className="modal-window">
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;