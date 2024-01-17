'use client'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LuX } from "react-icons/lu"
import { toggleEditUser, addContact, editContact } from "../../lib/features/contacts/contactSlice"


const ContactModal = () => {
    const dispatch = useDispatch()
    const { selectedContact, editUserOpen } = useSelector((state) => state.contact)

    const [firstName, setFirstName] = useState(selectedContact?.first_name || '');
    const [lastName, setLastName] = useState(selectedContact?.last_name || '');
    const [email, setEmail] = useState(selectedContact?.email || '');

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!isValidEmail(email)) {
            /* replace with react toastify */
            alert('Invalid email');
            return;
        }
        const contactData = {
            'id': selectedContact?.id || '',
            'first_name': firstName,
            'last_name': lastName,
        }
        if (selectedContact) {

            dispatch(editContact(contactData))

        } else {

            dispatch(addContact(contactData))
        }

    }

    return (
        <>
            <div className={`${editUserOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-40' : 'hidden'}`}></div>
            <div id="editUserModal" tabIndex="-1" aria-hidden="true" className={`${editUserOpen ? '' : 'hidden'} fixed max-sm:inset-0 z-50 items-center place-items-center justify-center p-4 h-max m-auto`}>
                <div className="relative w-full max-w-2xl  ">
                    {/* // Modal Content */}
                    <form className="relative bg-white rounded-2xl shadow ">
                        {/* //Modal Header */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                {selectedContact ? 'Edit Contact' : "Add Contact"}
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="editUserModal">
                                <LuX className="scale-[1.5] stroke-2" onClick={() => dispatch(toggleEditUser())} />
                            </button>
                        </div>
                        {/* // Modal Body */}
                        <div className="p-6 space-y-6 max-h-[calc(100vh-15rem)] overflow-auto">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 ">First Name</label>
                                    <input type="text" name="first-name" id="first-name" value={firstName} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder={selectedContact ? selectedContact.first_name : "Bonnie"} onChange={(e) => setFirstName(e.target.value)} required="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
                                    <input type="text" name="last-name" id="last-name" value={lastName} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Green" onChange={(e) => setLastName(e.target.value)} required="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                    <input type="email" name="email" id="email" value={email} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="example@company.com" onChange={(e) => setEmail(e.target.value)} required="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="phone-number" className="block mb-2 text-sm font-medium text-gray-900 ">Phone Number</label>
                                    <input type="number" name="phone-number" id="phone-number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="e.g. +(12)3456 789" required="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 ">Department</label>
                                    <input type="text" name="department" id="department" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Development" required="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Company</label>
                                    <input type="number" name="company" id="company" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="123456" required="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="current-password" className="block mb-2 text-sm font-medium text-gray-900 ">Current Password</label>
                                    <input type="password" name="current-password" id="current-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="••••••••" required="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-900 ">New Password</label>
                                    <input type="password" name="new-password" id="new-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  " placeholder="••••••••" required="" />
                                </div>
                            </div>
                        </div>
                        {/* // Modal Footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Save all</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default ContactModal