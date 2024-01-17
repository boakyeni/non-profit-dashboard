'use client'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LuX } from "react-icons/lu"
import { toggleDeleteBoardModal } from "../../../lib/features/dropdown/dropdownSlice"


const DeleteBoardConfirm = ({ id, removeBoard }) => {
    const dispatch = useDispatch()
    const { deleteBoardModalOpen } = useSelector((state) => state.dropdowns)

    const handleDeleteBoard = (e) => {
        e.preventDefault()
        dispatch(toggleDeleteBoardModal())
        removeBoard(id)
    }

    return (
        <>
            <div className={`${deleteBoardModalOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-40' : 'hidden'}`}></div>
            <div id="deleteBoardModal" tabIndex="-1" aria-hidden="true" className={`${deleteBoardModalOpen ? '' : 'hidden'} fixed max-sm:inset-0 z-50 items-center place-items-center justify-center p-4 h-max m-auto`}>
                <div className="relative w-full max-w-2xl  ">
                    {/* // Modal Content */}
                    <form className="relative bg-white rounded-2xl shadow ">
                        {/* //Modal Header */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Delete Board
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="editUserModal">
                                <LuX className="scale-[1.5] stroke-2" onClick={() => dispatch(toggleDeleteBoardModal())} />
                            </button>
                        </div>
                        {/* // Modal Body */}
                        <div className="p-6 space-y-6 max-h-[calc(100vh-15rem)] overflow-auto">
                            <div className="">
                                Are you sure that you want to delete this board?
                            </div>
                        </div>
                        {/* // Modal Footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
                            <button type="submit" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " onClick={handleDeleteBoard}>Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default DeleteBoardConfirm