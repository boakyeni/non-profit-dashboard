'use client'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LuX } from "react-icons/lu"
import { toggleTrackFundsModal } from "../../lib/features/contacts/contactSlice"


const TrackFundsModal = () => {
    const dispatch = useDispatch()
    const { selectedContact, contactTrackFundsModalOpen } = useSelector((state) => state.contact)

    const [firstName, setFirstName] = useState(selectedContact?.first_name || '');
    const [lastName, setLastName] = useState(selectedContact?.last_name || '');
    const [email, setEmail] = useState(selectedContact?.email || '');

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    return (
        <>
            <div className={`${contactTrackFundsModalOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-40' : 'hidden'}`}></div>
            <div id="editUserModal" tabIndex="-1" aria-hidden="true" className={`${contactTrackFundsModalOpen ? '' : 'hidden'} fixed max-sm:inset-0 z-50 items-center place-items-center justify-center p-4 h-max m-auto`}>
                <div className="relative w-full max-w-2xl  ">
                    {/* // Modal Content */}
                    <form className="relative bg-white rounded-2xl shadow ">
                        {/* //Modal Header */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Report Funds Flow
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="editUserModal">
                                <LuX className="scale-[1.5] stroke-2" onClick={() => dispatch(toggleTrackFundsModal())} />
                            </button>
                        </div>
                        {/* // Modal Body */}
                        <div className="p-6 space-y-6 max-h-[calc(100vh-15rem)] overflow-auto">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                                    <input type="text" name="first-name" id="first-name" value={firstName} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder={selectedContact ? selectedContact.first_name : "Bonnie"} onChange={(e) => setFirstName(e.target.value)} required="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                                    <textarea name="description" id="description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="How was the money used or received" required="" />
                                </div>

                                <div className="col-span-6 sm:col-span-3 flex flex-col">
                                    <label htmlFor="credit_debit" className="block mb-2 text-sm font-medium text-gray-900 ">Cash Flow Type</label>
                                    <div className="flex flex-row space-x-2">
                                        <input type="radio" id="credit" name="credit_debit" value="funds_in" />
                                        <label htmlFor="credit">Funds In</label>
                                    </div>
                                    <div className="flex flex-row space-x-2">
                                        <input type="radio" id="debit" name="credit_debit" value="funds_out" />
                                        <label htmlFor="debit">Funds Out</label>
                                    </div>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="current-password" className="block mb-2 text-sm font-medium text-gray-900 ">Upload Documents</label>
                                    <input type="file" name="current-password" id="current-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="currency" className="block mb-2 text-sm font-medium text-gray-900 ">Currency</label>
                                    <select name="currency" id="currency" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5">
                                        <option value="USD">USD</option>
                                        <option value="GHC">GHC</option>
                                        <option value="GBP">GBP</option>
                                        <option value="EUR">EUR</option>
                                    </select>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Amount</label>
                                    <input type="number" name="company" id="company" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="123456" required="" />
                                </div>


                            </div>
                        </div>
                        {/* // Modal Footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default TrackFundsModal