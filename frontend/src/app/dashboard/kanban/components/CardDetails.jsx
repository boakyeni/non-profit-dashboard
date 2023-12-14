'use client'

import React, { useState, useEffect } from "react";
import { LuX, LuCheckCircle, LuClock3, LuTag, LuTrash, LuClipboardEdit } from "react-icons/lu";
import Editable from "./Editable";
import Modal from "./Modal";
import { v4 as uuidv4 } from "uuid";
import Label from "./Label";

export default function CardDetails(props) {
    const colors = ["#61bd4f", "#f2d600", "#ff9f1a", "#eb5a46", "#c377e0"];

    const [values, setValues] = useState({ ...props.card });
    const [input, setInput] = useState(false);
    const [text, setText] = useState(values.title);
    const [labelShow, setLabelShow] = useState(false);
    const Input = (props) => {
        return (
            <div className="">
                <input
                    autoFocus
                    defaultValue={text}
                    type={"text"}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                />
            </div>
        );
    };
    const addTask = (value) => {
        values.task.push({
            id: uuidv4(),
            task: value,
            completed: false,
        });
        setValues({ ...values });
    };

    const removeTask = (id) => {
        const remaningTask = values.task.filter((item) => item.id !== id);
        setValues({ ...values, task: remaningTask });
    };

    const deleteAllTask = () => {
        setValues({
            ...values,
            task: [],
        });
    };

    const updateTask = (id) => {
        const taskIndex = values.task.findIndex((item) => item.id === id);
        values.task[taskIndex].completed = !values.task[taskIndex].completed;
        setValues({ ...values });
    };
    const updateTitle = (value) => {
        setValues({ ...values, title: value });
    };

    const calculatePercent = () => {
        const totalTask = values.task.length;
        const completedTask = values.task.filter(
            (item) => item.completed === true
        ).length;

        return Math.floor((completedTask * 100) / totalTask) || 0;
    };

    const removeTag = (id) => {
        const tempTag = values.tags.filter((item) => item.id !== id);
        setValues({
            ...values,
            tags: tempTag,
        });
    };

    const addTag = (value, color) => {
        values.tags.push({
            id: uuidv4(),
            tagName: value,
            color: color,
        });

        setValues({ ...values });
    };

    const handelClickListner = (e) => {
        if (e.code === "Enter") {
            setInput(false);
            updateTitle(text === "" ? values.title : text);
        } else return;
    };

    useEffect(() => {
        document.addEventListener("keypress", handelClickListner);
        return () => {
            document.removeEventListener("keypress", handelClickListner);
        };
    });
    useEffect(() => {
        if (props.updateCard) props.updateCard(props.bid, values.id, values);
    }, [values]);

    return (
        <Modal onClose={props.onClose}>
            <div className="">
                <div
                    className="relative"

                >
                    <div className="flex flex-row pb-4">
                        <div className="flex flex-col">
                            <div className="flex flex-row place-items-center pt-6 pl-6 gap-4">
                                <LuClipboardEdit className="scale-[2]" />
                                {input ? (
                                    <Input title={values.title} />
                                ) : (
                                    <h5
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setInput(true)}
                                        className="text-lg font-bold"
                                    >
                                        {values.title}
                                    </h5>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-around">
                        <div className="flex flex-col">
                            <h6 className="text-justify">Label</h6>
                            <div
                                className="flex flex-wrap"

                            >
                                {values.tags.length !== 0 ? (
                                    values.tags.map((item) => (
                                        <span
                                            className="flex place-items-center h-[32px] box-border w-auto min-w-[40px] p-3 rounded-md text-black float-left gap-2"
                                            style={{ backgroundColor: item.color }}
                                        >
                                            {item.tagName.length > 10
                                                ? item.tagName.slice(0, 6) + "..."
                                                : item.tagName}
                                            <LuX
                                                onClick={() => removeTag(item.id)}
                                                style={{ width: "15px", height: "15px" }}
                                            />
                                        </span>
                                    ))
                                ) : (
                                    <span
                                        style={{ color: "#ccc" }}
                                        className="flex place-items-center h-[32px] box-border w-auto min-w-[40px] p-3 rounded-md text-white float-left gap-2"
                                    >
                                        <i> No Labels</i>
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-row items-end justify-between gap-5">
                                    <div className="flex flex-row items-center gap-2">
                                        <LuCheckCircle className="h-[20px] w-[20px]" />
                                        <h6 className="font-bold">Check List</h6>
                                    </div>
                                    <div className="">
                                        <button onClick={() => deleteAllTask()} className="w-full bg-slate-200 cursor-pointer h-[32px] flex gap-3 overflow-hidden border border-slate-300 mt-2 p-3 relative text-ellipsis duration-100 transition-colors ease-in-out whitespace-nowrap items-center rounded-2xl drop-shadow-2xl ">
                                            Delete All Tasks
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-[#61bd4f]">
                                    <div className="flex-1">
                                        <div
                                            className=""
                                            role="progressbar"
                                            style={{ width: calculatePercent() + "%" }}
                                            aria-valuenow="75"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            {calculatePercent() + "%"}
                                        </div>
                                    </div>
                                </div>

                                <div className="my-2">
                                    {values.task.length !== 0 ? (
                                        values.task.map((item, index) => (
                                            <div className="flex  gap-2 min-h-[20px] h-auto p-2 hover:bg-slate-300 rounded-xl justify-between place-items-center">
                                                <input
                                                    className="h-[18px] w-[18px] cursor-pointer"
                                                    type="checkbox"
                                                    defaultChecked={item.completed}
                                                    onChange={() => {
                                                        updateTask(item.id);
                                                    }}
                                                />

                                                <h6
                                                    className={`flex-grow-1 text-lg ${item.completed === true ? "line-through" : ""
                                                        }`}
                                                >
                                                    {item.task}
                                                </h6>
                                                <LuTrash
                                                    onClick={() => {
                                                        removeTask(item.id);
                                                    }}
                                                    style={{
                                                        cursor: "pointer",
                                                        widht: "18px",
                                                        height: "18px",
                                                    }}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <></>
                                    )}

                                    <Editable
                                        parentClass={"task__editable"}
                                        name={"Add Task"}
                                        btnName={"Add task"}
                                        onSubmit={addTask}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <h6>Add to card</h6>
                            <div className="">
                                <button onClick={() => setLabelShow(true)} className="w-full bg-slate-200 cursor-pointer h-[32px] flex gap-3 overflow-hidden border border-slate-300 mt-2 p-3 relative text-ellipsis duration-100 transition-colors ease-in-out whitespace-nowrap items-center rounded-2xl drop-shadow-2xl ">
                                    <span className="">
                                        <LuTag />
                                    </span>
                                    Add Label
                                </button>
                                {labelShow && (
                                    <Label
                                        color={colors}
                                        addTag={addTag}
                                        tags={values.tags}
                                        onClose={setLabelShow}
                                    />
                                )}
                                <button className="w-full bg-slate-200 cursor-pointer h-[32px] flex gap-3 overflow-hidden box-border mt-2 p-3 relative border border-slate-300 text-ellipsis duration-100 transition-colors ease-in-out whitespace-nowrap items-center rounded-2xl shadow-2xl" >
                                    <span className="">
                                        <LuClock3 />
                                    </span>
                                    Date
                                </button>

                                <button onClick={() => props.removeCard(props.bid, values.id)} className="w-full bg-slate-200 cursor-pointer h-[32px] border border-slate-300 flex gap-3 overflow-hidden box-border mt-2 p-3 relative text-ellipsis duration-100 transition-colors ease-in-out whitespace-nowrap items-center rounded-2xl shadow-2xl">
                                    <span className="">
                                        <LuTrash />
                                    </span>
                                    Delete Card
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}