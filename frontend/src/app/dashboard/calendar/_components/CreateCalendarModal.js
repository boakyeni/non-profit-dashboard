'use client'
import { useSelector, useDispatch } from "react-redux"
import { LuX } from "react-icons/lu"
import { createCalendar, resetSelectedUsers, toggleCreateCalendarModal } from "../../../lib/features/events/eventSlice"
import { useState, useEffect } from "react"
import SubscriberTable from "../../_components/SubscriberTable"
import AddColaboratorsTable from "./AddCollaboratorsTable"

import { toast } from "react-toastify"


const CreateCalendarModal = () => {
    const dispatch = useDispatch()
    const { createCalendarModalOpen, selectedUsers } = useSelector((state) => state.events)
    const [localTitle, setLocalTitle] = useState('');
    const [localPrivate, setLocalPrivate] = useState(false)
    useEffect(() => {
        setLocalTitle("");
        setLocalPrivate(false)
    }, []);

    const handleTitleChange = (e) => {
        setLocalTitle(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            name: localTitle,
            private: localPrivate,
            users: selectedUsers,
        }
        dispatch(createCalendar(data))
        dispatch(toggleCreateCalendarModal())
        dispatch(resetSelectedUsers())
        setLocalPrivate(false)
        setLocalTitle('')
    }
    return (
        <>
            <div className={`${createCalendarModalOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-40' : 'hidden'}`}></div>
            <div id="editUserModal" tabIndex="-1" aria-hidden="true" className={`${createCalendarModalOpen ? '' : 'hidden'} fixed max-sm:inset-0 z-50 items-center place-items-center justify-center p-4 h-max m-auto`}>
                <div className="relative w-full max-w-2xl  ">
                    {/* // Modal Content */}
                    <form className="relative bg-white rounded-2xl shadow ">
                        {/* //Modal Header */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                {`Create New Calendar`}
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="editUserModal">
                                <LuX className="scale-[1.5] stroke-2" onClick={() => dispatch(toggleCreateCalendarModal())} />
                            </button>
                        </div>
                        {/* // Modal Body */}
                        <div className="p-6 space-y-6 max-h-[calc(100vh-15rem)] overflow-auto">
                            <div className="grid grid-cols-6 gap-6">

                                <div className="col-span-6 sm:col-span-3 flex flex-col ">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                                    <input type="text" value={localTitle} name="title" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Bonnie" required="" onChange={handleTitleChange} />
                                    <div className="flex space-x-2 mt-3">
                                        <input type="checkbox" id="private_box" name="private_box" checked={localPrivate} onChange={(e) => setLocalPrivate(e.target.checked)} />
                                        <label htmlFor="private_box"> Make Private</label>
                                    </div>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Add Collaborators</label>
                                    <AddColaboratorsTable itemsPerPage={5} />
                                </div>

                            </div>
                        </div>
                        {/* // Modal Footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
                            <button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " >Add Calendar</button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateCalendarModal