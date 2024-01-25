'use client'
import { useDispatch, useSelector } from "react-redux"
import { LuX } from "react-icons/lu"
import { toggleAddPatientModal } from "../../../lib/features/campaigns/campaignSlice"

const AddPatientsModal = () => {
    const dispatch = useDispatch()
    const { addPatientModalOpen } = useSelector((state) => state.campaigns)

    return (
        <>
            <div className={`${addPatientModalOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-40' : 'hidden'}`} onClick={() => dispatch(toggleAddPatientModal())}></div>
            <div id="createEventModal" tabIndex="-1" aria-hidden="true" className={`${addPatientModalOpen ? '' : 'hidden'} fixed max-sm:inset-0 z-50 items-center place-items-center justify-center p-4 h-max m-auto max-lg:w-full`}>
                <div className="relative w-full lg:w-[70vw] ">
                    {/* // Modal Content */}
                    <div className="relative bg-white rounded-2xl shadow ">
                        {/* //Modal Header */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Add Patient to Campaign
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="editUserModal">
                                <LuX className="scale-[1.5] stroke-2" onClick={() => dispatch(toggleAddPatientModal())} />
                            </button>
                        </div>
                        {/* // Modal Body */}
                        <div className="p-6  max-h-[calc(100vh-20rem)] overflow-x-auto">
                            <div className="flex flex-col lg:flex-row space-x-6">
                                <div className="lg:w-1/2 2xl:w-3/4 space-y-6">
                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                                        <input type="text" name="title" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Bonnie" required="" />
                                    </div>

                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="select-date" className="block mb-2 text-sm font-medium text-gray-900 ">Select Date</label>
                                        <input type="text" name="select-date" id="select-date" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Green" required="" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                                        <textarea name="description" id="description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Write a description here" required="" />
                                    </div>
                                    <div className="max-w-lg">
                                        <label className="block text-sm font-medium text-gray-900" htmlFor="user_avatar">Upload file</label>
                                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2.5" aria-describedby="user_avatar_help" id="user_avatar" type="file" multiple={true} />
                                        <div className="mt-1 text-sm text-gray-500 " id="user_avatar_help">Please limit file size to 10MB</div>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="phone-number" className="block mb-2 text-sm font-medium text-gray-900 ">Phone Number</label>
                                        <input type="number" name="phone-number" id="phone-number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="e.g. +(12)3456 789" required="" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 ">Department</label>
                                        <input type="text" name="department" id="department" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Development" required="" />
                                    </div>


                                </div>
                                <div className="lg:w-1/2 2xl:w-1/4">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Add Contacts</label>
                                    <input type="text" name="first-name" id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Add Email" required="" />

                                </div>
                            </div>
                        </div>
                        {/* // Modal Footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Add New Event</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddPatientsModal