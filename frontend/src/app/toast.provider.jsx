"use client";

import { ToastContainer } from "react-toastify";


export default function ToastProvider({ children }) {
    return (
        <>
            {children}
            <ToastContainer />
        </>
    );
}