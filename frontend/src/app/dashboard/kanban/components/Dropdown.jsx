'use client'

import React, { useRef, useEffect } from 'react';


const Dropdown = (props) => {
    const dropRef = useRef()
    const handleClick = (event) => {
        if (dropRef && !dropRef.current.contains(event.target) && props.onClose) {
            props.onClose()
        }
    };
    useEffect(() => {
        document.addEventListener("click", handleClick, { capture: true });

        return () => {
            document.removeEventListener("click", handleClick, { capture: true });
        };
    });
    return (
        <div
            ref={dropRef}
            className={` drop-shadow-xl cursor-default bg-white rounded-xl p-2 ${props.class ? props.class : ""}`}
        >
            {props.children}
        </div>
    );
}

export default Dropdown;