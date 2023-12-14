'use client'
import React from "react";
import { useRef, useState } from "react";
import { LuX, LuCheck } from 'react-icons/lu'



const Label = (props) => {
    const input = useRef();
    const [selectedColor, setSelectedColor] = useState("");
    const [label, setLabel] = useState("");

    const isColorUsed = (color) => {
        const isFound = props.tags.find((item) => item.color === color);

        return isFound ? true : false;
    };

    return (
        <div className="">
            <div className="absolute left-[55%] top-[55%] w-[400px] max-w-[45%] flex justify-center bg-white items-center z-30 rounded-2xl">
                <div className="max-h-[95vh] shadow-md rounded-2xl px-2 mb-2">
                    <div className=" border-b h-[25px] flex flex-row justify-between">
                        <p style={{ fontSize: "15px" }} className="">
                            <b>Label</b>
                        </p>
                        <LuX
                            onClick={() => props.onClose(false)}
                            style={{ cursor: "pointer", width: "20px", height: "20px" }}
                        />
                    </div>
                    <div className=" flex flex-col">
                        <p
                            style={{
                                color: "#5e6c84",
                                display: "block",
                                fontSize: "12px",
                                fontWeight: "700",
                                lineHeight: "16px",
                            }}
                            className="my-2"
                        >
                            Name
                        </p>
                        <div className="">
                            <input
                                type="text"
                                ref={input}
                                defaultValue={label}
                                placeholder="Name of label"
                                onChange={(e) => {
                                    setLabel(e.target.value);
                                }}
                                className="w-full bg-[#fafbfc] rounded-lg shadow-lg block mb-3 transition-colors duration-100ms ease-in-out p-2 "
                            />
                        </div>
                        <p
                            style={{
                                color: "#5e6c84",
                                display: "block",
                                fontSize: "12px",
                                fontWeight: "700",
                                lineHeight: "16px",
                            }}
                            className="my-2"
                        >
                            Select color
                        </p>
                        <div className="flex flex-wrap justify-between mb-3 ">
                            {props.color.map((item, index) => (
                                <span
                                    onClick={() => setSelectedColor(item)}
                                    key={index}
                                    className={`${isColorUsed(item) ? " pointer-events-none opacity-40" : ""}  box-border w-auto p-4 block rounded-full text-white float-left hover:scale-125`}
                                    style={{ backgroundColor: item, cursor: "pointer" }}
                                >
                                    {selectedColor === item ? <LuCheck className="h-[20px] w-[20px] -m-3 pt-1 pl-1" /> : ""}
                                </span>
                            ))}
                        </div>
                        <div>
                            <button
                                className="bg-[#0079bf] h-[2rem] px-3 text-white mb-2 rounded-xl hover:bg-[#026aa7] hover:cursor-pointer"
                                onClick={() => {
                                    if (label !== "") {
                                        if (selectedColor === "") {
                                            alert("Please select color for label.");
                                        }
                                        props.addTag(label, selectedColor);
                                        setSelectedColor("");
                                        setLabel("");
                                        input.current.value = "";
                                    } else return;
                                }}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Label