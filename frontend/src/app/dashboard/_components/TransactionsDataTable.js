'use client'
import { useDispatch, useSelector } from "react-redux"
import { fetchContacts, setSelectedContact, toggleContactCard, toggleContactTableAction, toggleContactSelection, toggleAllContacts, toggleEditUser, togglePatientSortModal, setSearchFilter, applyFilters, moreInfoClick, toggleUploadContactModal, setContactTypeFilter, initialFilterState, removeAllFilters, handleContactTypeChange, handleApplyFilters } from "../../lib/features/contacts/contactSlice"
import { isEqual } from "../../../utils/equalCheck"
import { useEffect, useState, useRef } from "react"
import ReactPaginate from 'react-paginate'
import { useSearchParams } from "next/navigation"
import { fetchTransactions, setSelectionType } from "../../lib/features/transactions/transactionSlice"



const TransactionsDataTable = ({ itemsPerPage }) => {
    // This ones logic is gonna be different than the other tables because there could be alot of transactions and i only want to get whats needed from the backend
    const searchParams = useSearchParams()

    const contact = searchParams.get('single') //get transaction data with this id
    const selected = searchParams.get('selected') // boolean, should then check local storage for selected contacts
    const all = searchParams.get('all') // get all transaction data for all contacts
    /* 
        handles pagination, logic is taken from react-paginate github
     */
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [activeContacts, setActiveContacts] = useState([])

    /* State management for transactions */
    const dispatch = useDispatch()
    const { transactions, selectionType } = useSelector((state) => state.transactions)
    /* Grabs all contacts */
    useEffect(() => {
        dispatch(fetchContacts())
        // these should not only dispact a fetch for transaction, but also set the current choice i.e. transtype
        if (contact) {
            dispatch(fetchTransactions([contact]))
            dispatch(setSelectionType('single'))
        } else if (selected) {
            if (typeof window !== 'undefined') {
                const select = localStorage.getItem('selectedContacts')

                // select probablt needs JSON parse or unparsing
                dispatch(fetchTransactions(select))
                dispatch(setSelectionType('select'))
            }

        } else if (all) {
            dispatch(fetchTransactions())
            dispatch(setSelectionType('all'))
        }
    }, [dispatch])


    useEffect(() => {
        if (selectionType === 'all') {
            dispatch(fetchTransactions())
        }
        // these should not only dispact a fetch for transaction, but also set the current choice i.e. transtype
    }, [dispatch, selectionType])

    const handleShowAll = () => {
        dispatch(setSelectionType('all'))
    }
    const handleExportCurrentData = () => {

    }

    /* holds contacts, whether action dropdown is open, and which contacts the user has selected */
    const { searchResults, contactTableActionOpen, selectedContact, contactCardOpen, filter } = useSelector((state) => state.contact)

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

    useEffect(() => {

        const active = isEqual(filter, initialFilterState) ? transactions : searchResults
        setActiveContacts(active)
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(active.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(active.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, transactions, searchResults, filter]); // replace selectedContact with transtype

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
    useEffect(() => {
        dispatch(applyFilters())
    }, [dispatch, filter.contact_type])

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
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100  " onClick={handleExportCurrentData}>Export Current Data</a>
                            </li>


                            <li>
                                <button type='button' onClick={() => handleShowAll()} className="block w-full text-left px-4 py-2 hover:bg-gray-100  ">Show All</button>
                            </li>
                            <li>
                                <button href="#" className="block px-4 py-2 hover:bg-gray-100 w-full text-left " onClick={() => dispatch(togglePatientSortModal())}>Sort/Filter</button>
                            </li>

                        </ul>

                    </div>
                </div>
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative m-3">

                    <input type="text" id="table-search-users" className="rounded-2xl block py-1 ps-2 text-sm text-gray-900 border border-gray-300 w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500  " placeholder="Search for patients" onChange={handleSearchChange} />
                </div>
            </div>

            {/* Paginate This */}
            <div className=" overflow-y-auto max-h-[55vh] mb-[58px]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>

                            <th scope="col" className=" py-3">
                                Patient Name
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
                        {currentItems && currentItems.map((transaction) => (
                            <tr key={transaction.id} className="bg-white border-b  hover:bg-gray-50 " onClick={() => handleMoreInfoClick(transaction)}>

                                <th scope="row" className="flex items-center py-4 text-gray-900 ">

                                    <div className="">
                                        <div className="text-base break-words font-semibold flex flex-col">
                                            <span>{contact.name} </span>
                                        </div>
                                        <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                    </div>
                                </th>
                                <td className="max-sm:hidden px-6 py-4">
                                    React Developer
                                </td>
                                <td className="max-sm:hidden px-6 py-4">
                                    <div className="flex items-center">
                                        <div className={`h-2.5 w-2.5 rounded-full me-2 ${leadTypeColorMapping[contact.lead_type] || 'bg-purple-500'}`}></div> {contactTypeMapping[contact.lead_type] || 'Patient or n/a'}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {/* // Modal Toggle */}
                                    <a href="#" onClick={() => handleMoreInfoClick(transaction)} type="button" className="font-medium text-blue-600  hover:underline">Export Data</a>
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

export default TransactionsDataTable