import { useState } from "react";


function Modal({ header, body, footer, onClose }) {

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <span onClick={onClose} className="close-modal-icon">&times;</span>
                    <h2>{header}</h2>
                </div>
                <div className="modal-body">
                    {body}
                </div>
                <div className="modal-footer">
                    {footer}
                </div>
            </div>
        </div>
    );
}

export default Modal;