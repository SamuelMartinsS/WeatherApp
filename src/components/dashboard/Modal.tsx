import React from "react";
import messages from "../../data/messages.json";
import { useEffect } from "react";

const Modal = ({ isOpen, onClose, error }) => {
    if (!isOpen) return null;

    const timeOut = () => {
        setTimeout(onClose,1500)
    }

    return (
        <div className="modal-card">
            <div
                className="modal-content">

                <h3 className="card-title">
                    {error ? <>{messages.error.title}</> : <>{messages.loading.title}</>}
                </h3>


                <p className="card-message">
                    {error ? <>{messages.error.message}</> : <>{messages.loading.message}</>}
                  
                </p>
                {error ? <button className="input-button" type="button" onClick={onClose} >OK</button>
                : timeOut()}
                
            </div>
        </div>
    );
};

export default Modal;