'use client'
import { useDispatch, useSelector } from "react-redux"
import { fetchContacts, setSelectedContact, toggleContactCard, toggleContactTableAction, toggleContactSelection, toggleAllContacts, toggleEditUser, toggleContactSortModal } from "../../lib/features/contacts/contactSlice"

import { useEffect, useState, useRef } from "react"
import ReactPaginate from 'react-paginate'



const ContactsTable = ({ itemsPerPage }) => {

    /* State management for contacts */
    const dispatch = useDispatch()
    /* Grabs all contacts */
    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch])


    /* holds contacts, whether action dropdown is open, and which contacts the user has selected */
    const { contacts, searchResults, contactTableActionOpen, selectedContacts, editUserOpen } = useSelector((state) => state.contact)

    /* Handle click outside of dropdown to close drowdown */
    const tableActionRef = useRef(null)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contactTableActionOpen && tableActionRef.current && !tableActionRef.current.contains(event.target)) {
                dispatch(toggleContactTableAction());
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dispatch, contactTableActionOpen]);

    /* More Info opens a card, this makes sure the right user data is displayed in that card */
    const handleMoreInfoClick = (contact) => {
        // dispatch(setSelectedContact(contact))
        dispatch(toggleContactCard())
    }

    const handleAddUserClick = () => {
        dispatch(setSelectedContact(null))
        dispatch(toggleEditUser())
        dispatch(toggleContactTableAction());
    }
    /*
        Adds a contact to a list of selected contacts 
     */
    const handleSelectedContacts = (contact) => {
        dispatch(toggleContactSelection(contact));
    };

    const getFilteredContacts = () => {
        return contacts
    }
    /* 
        handles pagination, logic is taken from react-paginate github
     */
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(contacts.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(contacts.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % items.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };


    return (

        <div className="relative overflow-x-auto shadow-xl rounded-2xl min-h-[30vh] lg:mt-10  flex-grow bg-white">
            <div className=" z-10 flex items-center justify-between flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white rounded-t-2xl">
                <div ref={tableActionRef} >
                    <button id="dropdownActionButton" className="m-3 inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5" type="button" onClick={() => dispatch(toggleContactTableAction())}>
                        <span className="sr-only">Action button</span>
                        Action
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {/* Dropdown Menu */}
                    <div id="dropdownAction" className={`${contactTableActionOpen ? '' : 'hidden'} fixed z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 `}>
                        <ul className="py-1 text-sm text-gray-700 " aria-labelledby="dropdownActionButton">
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100  " onClick={handleAddUserClick}>Add Contact</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100  ">Show only Donors</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100  ">Show only Patients</a>
                            </li>
                            <li>
                                <button href="#" className="block px-4 py-2 hover:bg-gray-100 w-full text-left " onClick={() => dispatch(toggleContactSortModal())}>Sort/Filter</button>
                            </li>

                        </ul>
                        <div className="py-1">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  ">Preview Email to Send</a>
                        </div>
                    </div>
                </div>
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative m-3">

                    <input type="text" id="table-search-users" className="rounded-2xl block py-1 ps-2 text-sm text-gray-900 border border-gray-300 w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500  " placeholder="Search for contacts" />
                </div>
            </div>

            {/* Paginate This */}
            <div className=" overflow-y-auto max-h-[55vh] mb-[58px]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="p-4 w-[48px]">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  " />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className=" py-3">
                                Name
                            </th>
                            <th scope="col" className="max-sm:hidden px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="max-sm:hidden px-6 py-3">
                                Lead
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">

                        <tr className="bg-white border-b  hover:bg-gray-50 ">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  " />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="flex items-center py-4 text-gray-900 ">

                                <div className="">
                                    <div className="text-base font-semibold flex flex-col">
                                        <span>Neil</span>
                                        <span>Smotherson</span>
                                    </div>
                                    <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                </div>
                            </th>
                            <td className="max-sm:hidden px-6 py-4">
                                React Developer
                            </td>
                            <td className="max-sm:hidden px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {/* // Modal Toggle */}
                                <a href="#" onClick={handleMoreInfoClick} type="button" className="font-medium text-blue-600  hover:underline">More Info</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="absolute bottom-0 w-full bg-white">
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={pageCount} // Replace with your total page count
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick} // Replace with your page change handler
                    containerClassName="flex justify-end space-x-1 p-[12px]"
                    pageClassName="mr-1" // Tailwind classes for page items
                    pageLinkClassName="py-1 px-3 bg-white border border-gray-300 rounded hover:bg-gray-100" // Tailwind classes for page links
                    activeClassName="bg-blue-500 text-white" // Tailwind classes for the active page
                    previousClassName="py-1 px-3 bg-white border border-gray-300 rounded hover:bg-gray-100" // Tailwind classes for previous button
                    nextClassName="py-1 px-3 bg-white border border-gray-300 rounded hover:bg-gray-100" // Tailwind classes for next button
                />
            </div>




        </div>

    )
}

export default ContactsTable