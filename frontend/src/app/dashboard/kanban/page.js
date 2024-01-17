'use client'
import { useEffect, useState } from "react"
import { DragDropContext } from '@hello-pangea/dnd'
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "use-local-storage";
import Board from "./components/Board";
import Editable from "./components/Editable";
import DeleteBoardConfirm from "./components/DeleteBoardConfirm";
import { toggleDeleteBoardModal } from "../../lib/features/dropdown/dropdownSlice";
import { useDispatch, useSelector } from "react-redux";




const KanbanPage = () => {
    {/* Kanban from https://github.com/aman162000/kanban-board */ }
    const [data, setData] = useState([]);
    const [deleteBoardId, setDeleteBoardId] = useState(null);
    const { deleteBoardModalOpen } = useSelector((state) => state.dropdowns);
    const dispatch = useDispatch()

    const openDeleteModal = (boardId) => {
        setDeleteBoardId(boardId);
        dispatch(toggleDeleteBoardModal());
    };

    useEffect(() => {
        setData(localStorage.getItem("kanban-board")
            ? JSON.parse(localStorage.getItem("kanban-board"))
            : [])
    }, [])
    const setName = (title, bid) => {
        const index = data.findIndex((item) => item.id === bid);
        const tempData = [...data];
        tempData[index].boardName = title;
        setData(tempData);
    };
    const dragCardInBoard = (source, destination) => {
        let tempData = [...data];
        const destinationBoardIdx = tempData.findIndex(
            (item) => item.id.toString() === destination.droppableId
        );
        const sourceBoardIdx = tempData.findIndex(
            (item) => item.id.toString() === source.droppableId
        );
        tempData[destinationBoardIdx].card.splice(
            destination.index,
            0,
            tempData[sourceBoardIdx].card[source.index]
        );
        tempData[sourceBoardIdx].card.splice(source.index, 1);

        return tempData;
    };

    const addCard = (title, bid) => {
        const index = data.findIndex((item) => item.id === bid);
        const tempData = [...data];
        tempData[index].card.push({
            id: uuidv4(),
            title: title,
            tags: [],
            task: [],
        });
        setData(tempData);
    };

    const removeCard = (boardId, cardId) => {
        const index = data.findIndex((item) => item.id === boardId);
        const tempData = [...data];
        const cardIndex = data[index].card.findIndex((item) => item.id === cardId);

        tempData[index].card.splice(cardIndex, 1);
        setData(tempData);
    };

    const addBoard = (title) => {
        const tempData = [...data];
        tempData.push({
            id: uuidv4(),
            boardName: title,
            card: [],
        });
        setData(tempData);
    };

    const removeBoard = (bid) => {
        const tempData = [...data];
        const index = data.findIndex((item) => item.id === bid);
        tempData.splice(index, 1);
        setData(tempData);
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId === destination.droppableId) return;

        setData(dragCardInBoard(source, destination));
    };

    const updateCard = (bid, cid, card) => {
        const index = data.findIndex((item) => item.id === bid);
        if (index < 0) return;

        const tempBoards = [...data];
        const cards = tempBoards[index].card;

        const cardIndex = cards.findIndex((item) => item.id === cid);
        if (cardIndex < 0) return;

        tempBoards[index].card[cardIndex] = card;
        console.log(tempBoards);
        setData(tempBoards);
    };

    useEffect(() => {
        localStorage.setItem("kanban-board", JSON.stringify(data));
    }, [data]);

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="h-screen w-full flex flex-row transition-all duration-300 justify-around" >
                    <DeleteBoardConfirm id={deleteBoardId} removeBoard={removeBoard} />
                    <div className="flex-1 w-full overflow-x-auto">
                        <div className="mt-5 min-w-fit flex gap-8 px-[2rem] text-black">
                            {data.map((item) => (
                                <Board
                                    key={item.id}
                                    id={item.id}
                                    name={item.boardName}
                                    card={item.card}
                                    setName={setName}
                                    addCard={addCard}
                                    removeCard={removeCard}
                                    removeBoard={removeBoard}
                                    updateCard={updateCard}
                                    openDeleteModal={() => openDeleteModal(item.id)}
                                />
                            ))}
                            <Editable
                                class={""}
                                name={"Add Board"}
                                btnName={"Add Board"}
                                onSubmit={addBoard}
                                placeholder={"Enter Board  Title"}
                                parentClass={"w-44"}
                            />

                        </div>


                    </div>



                </div>

            </DragDropContext>


        </>
    )
}

export default KanbanPage
