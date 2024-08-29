'use client'
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { LuX } from "react-icons/lu"
import { toggleEditEventModal, setEndDate, setStartDate, editEvent, setSelectedEvent, updateSelectedEvent, toggleEditEventModalEdit, getEvents, setEditEventModalEdit } from "../../../lib/features/events/eventSlice"
import DateComponent from "../../_components/DateComponent"
import moment from 'moment-timezone';

/* View/Edit Modal */
const EditEventModal = () => {
    /* Think of the useStates as temporary variables, since we don't want to immediately send to the backend 
    or redux store the user's partial changes. Instead we store as temp and wait for user to confirm those changes, by clicking save  */
    const dispatch = useDispatch()
    const { editEventModalOpen, editEventModalEditable, selectedEvent, startTimeRange, endTimeRange } = useSelector((state) => state.events)
    const [localTitle, setLocalTitle] = useState(selectedEvent?.title);
    const [localStartDate, setLocalStartDate] = useState(selectedEvent.start);
    const [localEndDate, setLocalEndDate] = useState(selectedEvent.end);
    const [localDescription, setLocalDescription] = useState(selectedEvent.description)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalTitle(value);
    }
    // Update local state when selectedEvent changes, this ensures that when the modal opens the data of the event is there. There is a possibility of selectedEvent being null by the time the modal opens, this ensures that once selected event populates it will also show in the modal
    useEffect(() => {
        setLocalTitle(selectedEvent?.title || "");
        setLocalStartDate(selectedEvent.start);
        setLocalEndDate(selectedEvent.end);
        setLocalDescription(selectedEvent.description);
    }, [selectedEvent]);

    // Reset state on cancel
    const resetState = () => {
        setLocalTitle(selectedEvent.title);
        setLocalStartDate(selectedEvent.start);
        setLocalEndDate(selectedEvent.end);
        setLocalDescription(selectedEvent.description);
    }

    const handleCancelEdit = () => {
        resetState()
        dispatch(toggleEditEventModalEdit())

    }

    const handleSaveChanges = () => {
        const updatedEvent = {
            ...selectedEvent,
            title: localTitle,
            start: localStartDate,
            end: localEndDate,
            description: localDescription,
            cancel_start: selectedEvent.start,
            cancel_end: selectedEvent.end,
        }
        // Check for any changes before making this call to avoid spam
        dispatch(editEvent(updatedEvent)).then(() => {
            dispatch(setSelectedEvent(updatedEvent)) // Update the selected event in the state
            dispatch(setEditEventModalEdit(false))
            dispatch(getEvents({ 'start': startTimeRange, 'end': endTimeRange }))
        }
        )


    }

    return (
        <>
            <div className={`${editEventModalOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-40' : 'hidden'}`} onClick={() => dispatch(toggleEditEventModal())}></div>
            <div id="createEventModal" tabIndex="-1" aria-hidden="true" className={`${editEventModalOpen ? '' : 'hidden'} fixed max-sm:inset-0 z-50 items-center place-items-center justify-center p-4 h-max m-auto max-lg:w-full`}>
                <div className="relative w-full lg:w-[70vw] ">
                    {/* // Modal Content */}
                    <div className="relative bg-white rounded-2xl shadow ">
                        {/* //Modal Header */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Event or Appointment Details
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="editUserModal">
                                <LuX className="scale-[1.5] stroke-2" onClick={() => dispatch(toggleEditEventModal())} />
                            </button>
                        </div>
                        {/* // Modal Body */}
                        <div className="p-6  max-h-[calc(100vh-20rem)] overflow-x-auto">
                            <div className="flex flex-col lg:flex-row space-x-6">
                                <div className="lg:w-1/2 2xl:w-3/4 space-y-6">
                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                                        <input type="text" name="title" value={localTitle} id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Bonnie" required="" onChange={handleInputChange} readOnly={!editEventModalEditable} />
                                    </div>

                                    <div className="flex flex-row w-full space-x-3">
                                        <div className="max-sm:w-1/2">
                                            <label htmlFor="select-date" className="block mb-2 text-sm font-medium text-gray-900 ">Start</label>
                                            <DateComponent selected={localStartDate} setDate={(date) => setLocalStartDate(moment(date).format('YYYY-MM-DDTHH:mm:ssZ'))} read={!editEventModalEditable} />
                                        </div>
                                        <div className="max-sm:w-1/2">
                                            <label htmlFor="select-date" className="block mb-2 text-sm font-medium text-gray-900 ">End</label>
                                            <DateComponent selected={localEndDate} setDate={(date) => setLocalEndDate(moment(date).format('YYYY-MM-DDTHH:mm:ssZ'))} read={!editEventModalEditable} />
                                        </div>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Frequency</label>
                                        <select disabled={!editEventModalEditable} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                            <option value="">One Time Event</option>
                                            <option value="US">Yearly</option>
                                            <option value="CA">Monthly</option>
                                            <option value="FR">Weekly</option>
                                            <option value="DE">Daily</option>
                                        </select>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                                        <textarea name="description" id="description" value={localDescription} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Write a description here" required="" onChange={(e) => setLocalDescription(e.target.value)} readOnly={!editEventModalEditable} />
                                    </div>
                                    <div className="max-w-lg">
                                        <label className="block text-sm font-medium text-gray-900" htmlFor="user_avatar">Upload file</label>
                                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2.5" aria-describedby="user_avatar_help" id="user_avatar" type="file" multiple={true} />
                                        <div className="mt-1 text-sm text-gray-500 " id="user_avatar_help">Please limit file size to 10MB</div>
                                    </div>



                                </div>
                                <div className="lg:w-1/2 2xl:w-1/4">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Guests</label>
                                    <input type="text" name="first-name" id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Add Email" required="" />

                                </div>
                            </div>
                        </div>
                        {/* // Modal Footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
                            {editEventModalEditable ?
                                <button type="submit" className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " onClick={handleCancelEdit}>Cancel Edit</button>
                                :
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " onClick={() => dispatch(toggleEditEventModalEdit())}>Edit</button>}

                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " onClick={handleSaveChanges}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditEventModal