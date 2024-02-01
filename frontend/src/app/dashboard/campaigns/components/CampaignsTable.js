'use client'
import { useDispatch, useSelector } from "react-redux"
import { fetchCampaigns, setSelectedCampaign, toggleCampaignTableAction, toggleCampaignSelection, toggleAllCampaigns, applyFilters, setSearchFilter } from "../../../lib/features/campaigns/campaignSlice"
import { useEffect, useState, useRef } from "react"
import ReactPaginate from 'react-paginate'
import useOutsideClickHandler from "../../../../utils/useOutsideClickHandler"



const CampaignsTable = ({ itemsPerPage }) => {

    /* State management for contacts */
    const dispatch = useDispatch()
    /* Grabs all contacts */
    useEffect(() => {
        dispatch(fetchCampaigns())
    }, [dispatch])

    /* holds contacts, whether action dropdown is open, and which contacts the user has selected */
    const { campaigns, searchResults, campaignTableActionOpen, selectedCampaigns } = useSelector((state) => state.campaigns)

    /* More Info opens a card, this makes sure the right user data is displayed in that card */
    const handleMoreInfoClick = (campaign) => {
        // dispatch(setSelectedContact(contact))
        // dispatch(toggleContactCard())
    }
    /*
        Adds a contact to a list of selected contacts 
     */
    const handleSelectedContacts = (campaign) => {
        dispatch(toggleCampaignSelection(campaign));
    };

    const getFilteredContacts = () => {
        return campaigns
    }
    const campaignActionRef = useRef(null)

    useOutsideClickHandler(campaignActionRef, campaignTableActionOpen, () => dispatch(toggleCampaignTableAction()))
    /* 
        handles pagination, logic is taken from react-paginate github
     */
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems((searchResults ? searchResults : campaigns).slice(itemOffset, endOffset));
        setPageCount(Math.ceil(campaigns.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % items.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    const handleSearchChange = (event) => {
        dispatch(setSearchFilter(event.target.value))
        dispatch(applyFilters())
    };

    return (

        <div className="relative overflow-x-auto shadow-xl rounded-2xl min-h-[30vh] lg:mt-10  flex-grow bg-white">
            <div className=" z-10 flex items-center justify-between flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white rounded-t-2xl">
                <div ref={campaignActionRef}>
                    <button id="dropdownActionButton" className="m-3 inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5" type="button" onClick={() => dispatch(toggleCampaignTableAction())}>
                        <span className="sr-only">Action button</span>
                        Action
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {/* Dropdown Menu */}
                    <div id="dropdownAction" className={`${campaignTableActionOpen ? '' : 'hidden'} fixed z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 `}>
                        <ul className="py-1 text-sm text-gray-700 " aria-labelledby="dropdownActionButton">
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100  ">Show All</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100  ">Show only Active</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">Sort/Filter</a>
                            </li>
                        </ul>
                        <div className="py-1">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  ">Preview Email to Send</a>
                        </div>
                    </div>
                </div>
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative m-3">

                    <input type="text" id="table-search-users" className="rounded-2xl block py-1 ps-2 text-sm text-gray-900 border border-gray-300 w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500  " placeholder="Search for Campaigns" onChange={handleSearchChange} />
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
                                Type
                            </th>
                            <th scope="col" className="max-sm:hidden px-6 py-3">
                                Status
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
                                        <span>Campaign</span>
                                        <span>1</span>
                                    </div>
                                    <div className="font-normal text-gray-500">67% to goal</div>
                                </div>
                            </th>
                            <td className="max-sm:hidden px-6 py-4">
                                Monetary Campaign
                            </td>
                            <td className="max-sm:hidden px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Active
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {/* // Modal Toggle */}
                                <a href="/dashboard/campaigns/1" type="button" className="font-medium text-blue-600  hover:underline">More Info</a>
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

export default CampaignsTable