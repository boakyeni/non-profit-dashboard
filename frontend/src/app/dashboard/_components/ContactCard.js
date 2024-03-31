'use client'
import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toggleContactCard, toggleContactCardMore, toggleEditUser, toggleDeleteModal, setSelectedContact, toggleTrackFundsModal } from '../../lib/features/contacts/contactSlice'
import { useDispatch } from 'react-redux'
import { LuX, LuMinimize2, LuMoreHorizontal } from 'react-icons/lu'

import { LuUser2 } from "react-icons/lu"


const ContactCard = () => {
    const dispatch = useDispatch()
    const { selectedContact, contactCardOpen, contactCardMoreOpen, editUserOpen } = useSelector((state) => state.contact)
    const [imageError, setImageError] = useState(false);
    const handleContactClose = () => {

        dispatch(toggleContactCard())
        dispatch(setSelectedContact(null))

    }

    /* Extra dispatch is to make sure dropdown closes */
    const handleDeleteConfirmation = () => {
        dispatch(toggleDeleteModal())
        dispatch(toggleContactCardMore())
    }

    const handleEditUser = () => {
        dispatch(toggleContactCardMore())
        dispatch(toggleEditUser())
    }

    /* Handle click outside of dropdown to close drowdown */
    const moreButtonRef = useRef(null)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contactCardMoreOpen && moreButtonRef.current && !moreButtonRef.current.contains(event.target)) {
                dispatch(toggleContactCardMore());
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dispatch, contactCardMoreOpen]);


    return (
        <>
            <div className={` ${contactCardOpen ? 'max-lg:fixed max-lg:inset-0 max-lg:bg-black max-lg:bg-opacity-50 max-lg:z-40' : 'hidden'}`}></div>
            <div id="userContactCard" tabIndex="-1" aria-hidden="true" className={`bg-white drop-shadow-2xl items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full rounded-2xl mt-10 w-[290px] ${contactCardOpen ? 'max-lg:absolute max-lg:top-0 max-lg:left-0 max-lg:right-0 max-lg:z-50 max-lg:mx-auto' : 'hidden'}`}>
                {/* absolute top-0 left-0 right-0 z-50 mx-auto */}
                <div className="relative w-full max-w-2xl max-h-full">

                    <div className="flex justify-between px-4 pt-4">

                        <button ref={moreButtonRef} id="dropdownButton" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100  focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5" type="button" >
                            <LuMoreHorizontal className='scale-[2.0]' onClick={() => dispatch(toggleContactCardMore())} />
                        </button>
                        <button onClick={() => handleContactClose()}>
                            <LuMinimize2 title='Close' className='stroke-gray-500 scale-[1.25]' />
                        </button>
                        {/* <!-- Dropdown menu --> */}
                        <div ref={moreButtonRef} id="dropdown" className={`${contactCardMoreOpen ? '' : 'hidden'} fixed top-16 z-10  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
                            <ul className="py-2" aria-labelledby="dropdownButton">
                                <li>
                                    <button onClick={handleEditUser} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Edit</button>
                                </li>
                                <li>
                                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Export Data</button>
                                </li>
                                <li>
                                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 " onClick={handleDeleteConfirmation}>Delete</button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col items-center pb-10 w-full">
                        <div className='w-16 h-16 mx-auto flex items-center justify-around rounded-full'>
                            {!imageError && selectedContact?.profile_photo
                                ? <img
                                    src={selectedContact.profile_photo}
                                    alt="Profile"
                                    onError={() => setImageError(true)}
                                />
                                : <LuUser2 className="scale-[4.0] rounded-full bg-slate-200 stroke-1" />
                            }
                        </div>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 ">{selectedContact?.name}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{selectedContact?.email}</span>
                        <div className="flex mt-4 md:mt-6">

                            <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3">Message</a>
                            <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3" onClick={() => dispatch(toggleTrackFundsModal())}>Report Cash Flow</a>
                        </div>
                    </div>

                </div>

            </div>
        </>

    )
}

export default ContactCard