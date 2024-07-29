'use client'
import { useDispatch, useSelector } from "react-redux"
import { fetchContacts, setSelectedContact, toggleContactCard, toggleContactTableAction, toggleContactSelection, toggleAllContacts, toggleEditUser, togglePatientSortModal, setSearchFilter, applyFilters, moreInfoClick, toggleUploadContactModal, setContactTypeFilter, initialFilterState, removeAllFilters, handleContactTypeChange, handleApplyFilters, toggleCauseModal, fetchCauses } from "../../lib/features/contacts/contactSlice"
import { isEqual } from "../../../utils/equalCheck"
import { useEffect, useState, useRef } from "react"
import ReactPaginate from 'react-paginate'
import { toggleAddPatientModal } from "../../lib/features/campaigns/campaignSlice"



const PatientTransactionsTable = ({ itemsPerPage }) => {

    /* State management for contacts */
    const dispatch = useDispatch()
    /* Grabs all contacts */
    useEffect(() => {
        dispatch(fetchContacts())
        dispatch(fetchCauses()) // here since this component should always render i.e. doesn't start off hidden
    }, [dispatch])


    /* holds contacts, whether action dropdown is open, and which contacts the user has selected */
    const { contacts, searchResults, contactTableActionOpen, selectedContacts, selectedContact, editUserOpen, contactCardOpen, filter } = useSelector((state) => state.contact)

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
        if (!contactCardOpen) {
            dispatch(setSelectedContact(contact));
            dispatch(toggleContactCard())

        } else if (selectedContact === contact) { // Use more info button to close on second click
            dispatch(toggleContactCard())
        } else {
            dispatch(setSelectedContact(contact));
        }

    }

    const handleAddUserClick = () => {
        dispatch(setSelectedContact(null))
        dispatch(toggleAddPatientModal())
        dispatch(toggleContactTableAction());
        if (contactCardOpen) {
            dispatch(toggleContactCard())
        }
    }
    const handleAddCauseClick = () => {
        dispatch(setSelectedContact(null))
        dispatch(toggleCauseModal())
        dispatch(toggleContactTableAction());
        if (contactCardOpen) {
            dispatch(toggleContactCard())
        }
    }

    /* 
        handles pagination, logic is taken from react-paginate github
     */
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [activeContacts, setActiveContacts] = useState(contacts)


    useEffect(() => {
        const filteredContacts = contacts?.filter(contact => contact.contact_type === 'beneficiary');
        const filteredSearchResults = searchResults?.filter(contact => contact.contact_type === 'beneficiary');

        const active = isEqual(filter, initialFilterState) ? filteredContacts : filteredSearchResults
        setActiveContacts(active)
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(active.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(active.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, contacts, searchResults, filter, selectedContact]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % activeContacts.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    const handleSearchChange = (event) => {
        dispatch(setSearchFilter(event.target.value))
        dispatch(applyFilters())
    };


    const handleContactChange = (contact_type) => {
        dispatch(setContactTypeFilter(contact_type)) // useState's contactType
        dispatch(applyFilters())
        dispatch(toggleContactTableAction())
    }
    useEffect(() => {

        dispatch(applyFilters())
    }, [dispatch, filter.contact_type])

    const handleShowAll = () => {
        dispatch(removeAllFilters())
        dispatch(applyFilters())
        dispatch(toggleContactTableAction())
    }

    const handleUpload = () => {
        dispatch(toggleUploadContactModal())
        dispatch(toggleContactTableAction());
    }
    const handleCheckboxOnChange = (e, id) => {
        e.stopPropagation(); // Prevent click from propagating to the parent tr element
        dispatch(toggleContactSelection(id));
    }
    const handlePreviewClick = (e) => {
        e.preventDefault(); // Prevent default anchor link behavior

        // Convert selectedContacts array to a JSON string and store it
        localStorage.setItem('selectedContacts', JSON.stringify(selectedContacts));

        // Redirect to the URL
        window.location.href = 'http://localhost:8000/mosaico';
    };

    const allChecked = () => {
        if (isEqual(filter, initialFilterState)) {
            return selectedContacts.length === contacts.length
        } else {
            return searchResults.every(result =>
                selectedContacts.some(selected => selected === result.id)
            );
        }
    }
    const contactTypeMapping = {
        major_donor: "Major Donor",
        mid_range_donor: "Mid Range Donor",
        broad_base_donor: "Broad Base Donor"
    };

    const leadTypeColorMapping = {
        major_donor: "bg-green-500",
        mid_range_donor: "bg-blue-500",
        broad_base_donor: "bg-yellow-500",
    };

    const getContactName = (contact) => {
        if (!contact) return ''
        if (contact.given_name || contact.last_name) {
            return contact.given_name + ' ' + contact.last_name
        } else {
            return contact.name
        }
    }

    const getContactDisplay = (contact) => {
        // Default to an empty string if no contact data is available
        if (!contact) return '';

        // Use email if available
        if (contact.email) return contact.email;

        // Filter for primary contact phone number
        const primaryPhone = contact.phone_number.find(phone => phone.primary_contact === true);

        // Return the primary phone number if it exists, otherwise return the first phone number or an empty string
        return primaryPhone ? primaryPhone.number : (contact.phone_number[0]?.number || '');
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
                                <button className="w-full text-left block px-4 py-2 hover:bg-gray-100  " onClick={handleAddUserClick}>Add Beneficiaries</button>
                            </li>
                            <li>
                                <button onClick={handleAddCauseClick} className="w-full text-left block px-4 py-2 hover:bg-gray-100  " >Add Cause</button>
                            </li>

                            <li>
                                <a href="/dashboard/contacts/" className="block w-full text-left px-4 py-2 hover:bg-gray-100  ">Go to Donors</a>
                            </li>

                            <li>
                                <button type='button' onClick={() => handleShowAll()} className="block w-full text-left px-4 py-2 hover:bg-gray-100  ">Show All</button>
                            </li>
                            <li>
                                <button href="#" className="block px-4 py-2 hover:bg-gray-100 w-full text-left " onClick={() => dispatch(togglePatientSortModal())}>Sort/Filter</button>
                            </li>

                        </ul>
                        <div className="py-1">
                            <a href="http://localhost:8000/mosaico" onClick={handlePreviewClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  ">Preview Email to Send</a>
                        </div>
                    </div>
                </div>
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative m-3">

                    <input type="text" id="table-search-users" className="rounded-2xl block py-1 ps-2 text-sm text-gray-900 border border-gray-300 w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500  " placeholder="Search for beneficiaries" onChange={handleSearchChange} />
                </div>
            </div>

            {/* Paginate This */}
            <div className=" overflow-y-auto max-h-[55vh] mb-[58px]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="p-4 w-[48px]">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  " onChange={() => dispatch(toggleAllContacts())} checked={allChecked()} />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className=" py-3">
                                Name
                            </th>
                            <th scope="col" className="max-sm:hidden px-6 py-3">
                                Main Cause
                            </th>
                            <th scope="col" className="max-sm:hidden px-6 py-3">
                                Amount Raised
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Transactions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {currentItems && currentItems.map((contact) => (
                            <tr key={contact.id} className="bg-white border-b  hover:bg-gray-50 " onClick={() => handleMoreInfoClick(contact)}>
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  " checked={selectedContacts.includes(contact.id)} onChange={(e) => handleCheckboxOnChange(e, contact?.id)}
                                            onClick={(e) => e.stopPropagation()} />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="flex items-center py-4 text-gray-900 ">

                                    <div className="">
                                        <div className="text-base break-words font-semibold flex flex-col">
                                            <span>{getContactName(contact)} </span>
                                        </div>
                                        <div className="font-normal text-gray-500">{getContactDisplay(contact)}</div>
                                    </div>
                                </th>
                                <td className="max-sm:hidden px-6 py-4">
                                    React Developer
                                </td>
                                <td className="max-sm:hidden px-6 py-4">
                                    <div className="flex items-center">
                                        <div className={`h-2.5 w-2.5 rounded-full me-2 ${leadTypeColorMapping[contact.donor_type] || (contact?.contact_type === 'beneficiary' ? 'bg-purple-500' : 'bg-gray-500')}`}></div> {contactTypeMapping[contact.donor_type] || (contact?.contact_type === 'beneficiary' ? 'Beneficiary' : 'n/a')}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {/* // Modal Toggle */}
                                    <a href="#" onClick={() => handleMoreInfoClick(contact)} type="button" className="font-medium text-blue-600  hover:underline">Export Data</a>
                                </td>
                            </tr>
                        ))}

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
                    pageLinkClassName="pb-2 pt-1 px-3 bg-white border-b border-gray-300 hover:bg-gray-100" // Tailwind classes for page links
                    activeClassName="py-1 text-blue-500" // Tailwind classes for the active page
                    previousClassName="py-1 px-3 bg-white border border-gray-300 rounded hover:bg-gray-100" // Tailwind classes for previous button
                    nextClassName="py-1 px-3 bg-white border border-gray-300 rounded hover:bg-gray-100" // Tailwind classes for next button
                />
            </div>




        </div>

    )
}

export default PatientTransactionsTable