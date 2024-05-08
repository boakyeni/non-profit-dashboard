'use client'
import ReactPaginate from "react-paginate"
import { useState, useEffect, useRef } from "react"
import { isEqual } from "../../../../utils/equalCheck"
import { fetchUsers } from "../../../lib/features/events/eventSlice"
import { useDispatch, useSelector } from "react-redux"

import { initialFilterState, toggleUserSelection, toggleAllUsers, setSearchFilter, applyFilters } from "../../../lib/features/events/eventSlice"

const AddColaboratorsTable = ({ itemsPerPage }) => {
    /* State management for contacts */
    const dispatch = useDispatch()
    /* Grabs all contacts */
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const { users, searchResults, selectedUsers, filter } = useSelector((state) => state.events)

    /*
        Adds a user to a list of selected users 
     */
    const handleSelectedUsers = (id) => {
        dispatch(toggleUserSelection(id));
    };
    /* 
        handles pagination, logic is taken from react-paginate github
     */
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [activeContacts, setActiveContacts] = useState(users)



    useEffect(() => {
        const active = isEqual(filter, initialFilterState) ? users : searchResults
        setActiveContacts(active)
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(active.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(active.length / itemsPerPage));

    }, [itemOffset, itemsPerPage, users, searchResults]);

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

    const handleShowAll = (event) => {
        event.preventDefault()
        dispatch(removeAllFilters())
        dispatch(applyFilters())
    }



    const allChecked = () => {
        if (isEqual(filter, initialFilterState)) {
            return selectedUsers.length === users.length
        } else {
            return searchResults.every(result =>
                selectedUsers.some(selected => selected === result.id)
            );
        }
    }
    return (
        <div className="relative flex flex-col overscroll-none drop-shadow-xl h-[450px] mb-8 flex-grow bg-white">
            <div className="sticky z-10 flex items-center justify-between flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-100 ">

                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative m-3 w-full">

                    <input type="text" id="table-search-users" className="rounded-2xl block py-1 ps-2 text-sm text-gray-900 border border-gray-300 w-60 bg-gray-50 focus:ring-blue-500 focus:border-blue-500  " placeholder="Search for users" onChange={handleSearchChange} />
                </div>
            </div>

            {/* Paginate This */}
            <div className="overflow-y-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className=" z-10 p-4 w-[48px]">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  " onChange={() => dispatch(toggleAllUsers())} checked={allChecked()} />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className=" py-3">
                                Name
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {currentItems && currentItems.map((user) => (
                            <tr key={user.id} className="bg-white border-b  hover:bg-gray-50 ">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  " checked={selectedUsers.includes(user.id)} onChange={() => dispatch(toggleUserSelection(user.id))} />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="flex items-center py-4 text-gray-900 ">

                                    <div className="">
                                        <div className="text-base break-words font-semibold flex flex-col">
                                            <span>{user?.full_name}</span>
                                        </div>
                                        <div className="font-normal text-gray-500">{user?.email}</div>
                                    </div>
                                </th>

                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
            <div className="absolute top-full w-full bg-white">
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={pageCount} // Replace with your total page count
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={0}
                    onPageChange={handlePageClick} // Replace with your page change handler
                    containerClassName="flex justify-end space-x-1 p-[12px]"
                    pageClassName="mr-1" // Tailwind classes for page items
                    pageLinkClassName="pb-2 pt-1 px-3 bg-white border-b border-gray-300 hover:bg-gray-100" // Tailwind classes for page links
                    activeClassName=" text-blue-500" // Tailwind classes for the active page
                    previousClassName="py-1 px-3 bg-white border border-gray-300 rounded hover:bg-gray-100" // Tailwind classes for previous button
                    nextClassName="py-1 px-3 bg-white border border-gray-300 rounded hover:bg-gray-100" // Tailwind classes for next button
                />
            </div>




        </div>
    )
}

export default AddColaboratorsTable