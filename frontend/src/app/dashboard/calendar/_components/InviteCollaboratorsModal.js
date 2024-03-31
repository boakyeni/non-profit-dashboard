'use client'
import { useSelector, useDispatch } from "react-redux"
import { LuX } from "react-icons/lu"
import { inviteCalendar, reset, resetSelectedUsers, toggleInviteModal } from "../../../lib/features/events/eventSlice"
import { useState, useEffect } from "react"
import AddColaboratorsTable from "./AddCollaboratorsTable"
import { toast } from "react-toastify"


const InviteCollaboratorsModal = () => {
    const dispatch = useDispatch()
    const { inviteModalOpen, selectedUsers, error } = useSelector((state) => state.events)
    const [localTitle, setLocalTitle] = useState('');
    useEffect(() => {
        setLocalTitle("");
    }, []);
    const handleTitleChange = (e) => {
        setLocalTitle(e.target.value)
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [dispatch, error])

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            id: localStorage.getItem('current_calendar'),
            users: selectedUsers,
        }
        dispatch(inviteCalendar(data))
        dispatch(toggleInviteModal())
        dispatch(resetSelectedUsers())
        dispatch(reset())
    }
    return (
        <>
            <div className={`${inviteModalOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-40' : 'hidden'}`}></div>
            <div id="editUserModal" tabIndex="-1" aria-hidden="true" className={`${inviteModalOpen ? '' : 'hidden'} fixed max-sm:inset-0 z-50 items-center place-items-center justify-center p-4 h-max m-auto`}>
                <div className="relative w-full max-w-2xl  ">
                    {/* // Modal Content */}
                    <form className="relative bg-white rounded-2xl shadow ">
                        {/* //Modal Header */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                {`Invite to Calendar`}
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="editUserModal">
                                <LuX className="scale-[1.5] stroke-2" onClick={() => dispatch(toggleInviteModal())} />
                            </button>
                        </div>
                        {/* // Modal Body */}
                        <div className="p-6 space-y-6 max-h-[calc(100vh-15rem)] overflow-auto">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6">
                                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Add Collaborators</label>
                                    <AddColaboratorsTable itemsPerPage={5} />
                                </div>

                            </div>
                        </div>
                        {/* // Modal Footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
                            <button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " >Invite</button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default InviteCollaboratorsModal