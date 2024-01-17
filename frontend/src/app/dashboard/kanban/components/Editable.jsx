'use client'
import React, { useState } from "react";
import { LuX, LuPlus } from "react-icons/lu";


const Editable = (props) => {
    const [show, setShow] = useState(props?.handler || false);
    const [text, setText] = useState(props.defaultValue || "");

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (text && props.onSubmit) {
            setText("");
            props.onSubmit(text);
        }
        setShow(false);
    };

    return (
        <div className={`h-auto ${props.parentClass}`}>
            {show ? (
                <form className='flex flex-col px-3 gap-3' onSubmit={handleOnSubmit}>
                    <div className={` ${props.class}`}>
                        <textarea
                            placeholder={props.placeholder}
                            autoFocus
                            id={"edit-input"}
                            type={"text"}
                            onChange={(e) => setText(e.target.value)}
                            className="w-[98%] appearance-none bg-white p-2 rounded-md shadow-lg block mb-6 duration-100 transition-colors ease-in-out "
                        />
                        <div className="flex gap-3 items-center px-1 mb-2">
                            <button className="bg-blue-700 h-[2rem] text-white flex place-items-center text-sm p-2 rounded-md hover:bg-blue-800 " type="submit">
                                {`${props.btnName}` || "Add"}
                            </button>
                            <LuX
                                className="hover:cursor-pointer scale-[1.5] stroke-1"
                                onClick={() => {
                                    setShow(false);
                                    // props?.setHandler(false);
                                }}
                            />
                        </div>
                    </div>
                </form>
            ) : (
                <p
                    onClick={() => {
                        setShow(true);
                    }} className="w-[90%] flex gap-1 rounded-lg transition ease-in-out duration-200 p-3 mx-auto hover:bg-blue-600 hover:cursor-pointer hover:text-[#ffffff] m-4 place-items-center"
                >
                    {props.defaultValue === undefined ? <LuPlus /> : <></>}
                    {props?.name || "Add"}
                </p>
            )}
        </div>
    );
};

export default Editable;