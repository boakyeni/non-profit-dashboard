'use client'
import React from "react";

const Modal = (props) => {
    return (
        <div className="fixed top-0 left-0 h-full min-h-screen w-full bg-slate-950 bg-opacity-20 flex justify-center items-center z-20" onClick={() => props.onClose(false)}>
            <div
                className="max-h-[95vh] rounded-2xl shadow-md bg-white max-sm:max-w-[90vw] md:w-[40%]"
                onClick={(event) => event.stopPropagation()}
            >
                {props.children}
            </div>
        </div>
    );
};

export default Modal;