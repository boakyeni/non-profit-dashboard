'use client'
import React, { useEffect, useState } from "react";
import { Droppable } from '@hello-pangea/dnd'
import { LuMoreHorizontal } from "react-icons/lu";
import Dropdown from "./Dropdown";
import Editable from "./Editable";
import Card from "./Card";
import DeleteBoardConfirm from "./DeleteBoardConfirm";
import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteBoardModal } from "../../../lib/features/dropdown/dropdownSlice";



const Board = (props) => {
    const [show, setShow] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        document.addEventListener("keypress", (e) => {
            if (e.code === "Enter") setShow(false);
        });
        return () => {
            document.removeEventListener("keypress", (e) => {
                if (e.code === "Enter") setShow(false);
            });
        };
    });
    const handleOpenDeleteModal = () => {
        props.openDeleteModal(props.id);
    };


    return (
        <>

            <div className="shadow-lg relative flex flex-col w-[290px] rounded-2xl bg-slate-50  border-t-4 border-t-blue-700  h-full max-h-[82vh] text-black">

                <div className="flex items-center justify-between px-[.5rem] m-4">
                    {show ? (
                        <div className="cursor-pointer">
                            <input
                                className="h-[30px] rounded-xl"
                                type={"text"}
                                defaultValue={props.name}
                                onChange={(e) => {
                                    props.setName(e.target.value, props.id);
                                }}
                            />
                        </div>
                    ) : (
                        <div className="cursor-pointer">
                            <p
                                onClick={() => {
                                    setShow(true);
                                }}
                                className="hover:cursor-pointer font-bold"
                            >
                                {props?.name || "Name of Board"}
                                <span className="text-sm px-3 rounded-full border-2 m-4">{props.card?.length}</span>
                            </p>
                        </div>
                    )}
                    <div onClick={() => setDropdown(true)} className="">
                        {!dropdown ? <LuMoreHorizontal /> : null}
                        {dropdown && (
                            <Dropdown
                                class=""
                                onClose={() => {
                                    setDropdown(false);
                                }}
                            >
                                <p className=" cursor-pointer" onClick={handleOpenDeleteModal}>Delete</p>
                            </Dropdown>
                        )}
                    </div>

                </div>
                <Droppable droppableId={props.id.toString()}>
                    {(provided) => (
                        <div
                            className=" p-3 overflow-y-auto"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {props.card?.map((items, index) => (
                                <Card
                                    bid={props.id}
                                    id={items.id}
                                    index={index}
                                    key={items.id}
                                    title={items.title}
                                    tags={items.tags}
                                    updateCard={props.updateCard}
                                    removeCard={props.removeCard}
                                    card={items}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <div className="flex flex-col">
                    <Editable
                        name={"Add Card"}
                        btnName={"Add Card"}
                        placeholder={"Enter Card Title"}
                        onSubmit={(value) => props.addCard(value, props.id)}
                    />
                </div>
            </div>
        </>
    )


}

export default Board

