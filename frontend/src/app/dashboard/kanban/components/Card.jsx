'use client'

import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { LuMoreHorizontal, LuCheckCircle } from "react-icons/lu";
import Dropdown from "./Dropdown";
import Modal from "./Modal";
import Tag from "./Tag";
import CardDetails from "./CardDetails";

const Card = (props) => {
    const [dropdown, setDropdown] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    return (
        <Draggable
            key={props.id.toString()}
            draggableId={props.id.toString()}
            index={props.index}
        >
            {(provided) => (
                <>
                    {modalShow && (
                        <CardDetails
                            updateCard={props.updateCard}
                            onClose={setModalShow}
                            card={props.card}
                            bid={props.bid}
                            removeCard={props.removeCard}
                        />
                    )}

                    <div
                        className="bg-white rounded-md drop-shadow-md mx-auto p-2 mb-3"
                        onClick={() => {
                            setModalShow(true);
                        }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className="flex items-center justify-between">
                            <p>{props.title}</p>
                            <LuMoreHorizontal
                                className=""
                                onClick={() => {
                                    setDropdown(true);
                                }}
                            />
                        </div>

                        <div className="flex gap-2 flex-wrap self-start">
                            {props.tags?.map((item, index) => (
                                <Tag key={index} tagName={item.tagName} color={item.color} />
                            ))}
                        </div>

                        <div className="mt-2 flex justify-between">
                            {/* <div className="time">
                <Clock />
                <span>Sun 12:30</span>
              </div> */}
                            {props.card.task.length !== 0 && (
                                <div className="flex items-center space-x-1">
                                    <LuCheckCircle />
                                    <span className="text-slate-500">
                                        {props.card.task.length !== 0
                                            ? `${(props.card.task?.filter(
                                                (item) => item.completed === true
                                            )).length
                                            } / ${props.card.task.length}`
                                            : `${"0/0"}`}
                                    </span>
                                </div>
                            )}
                        </div>

                        {provided.placeholder}
                    </div>
                </>
            )}
        </Draggable>
    );
};

export default Card;