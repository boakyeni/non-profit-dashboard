'use client'
import { useDispatch, useSelector } from "react-redux"
import { fetchCampaigns, setSelectedCampaign, setStatusFilter, toggleCampaignTableAction, toggleCampaignSelection, toggleAllCampaigns, applyFilters, setSearchFilter, removeAllFilters } from "../../../lib/features/campaigns/campaignSlice"
import { useEffect, useState, useRef } from "react"
import { isEqual } from "../../../../utils/equalCheck"
import { initialFilterState } from "../../../lib/features/campaigns/campaignSlice"
import ReactPaginate from 'react-paginate'
import useOutsideClickHandler from "../../../../utils/useOutsideClickHandler"



const CampaignsTable = ({ itemsPerPage }) => {

    /* State management for campaigns */
    const dispatch = useDispatch()
    /* Grabs all campaigns */
    useEffect(() => {
        dispatch(fetchCampaigns())
    }, [dispatch])

    /* holds campaigns, whether action dropdown is open, and which campaigns the user has selected */
    const { campaigns, searchResults, campaignTableActionOpen, selectedCampaigns, filter } = useSelector((state) => state.campaigns)

    /* More Info opens a card, this makes sure the right user data is displayed in that card */
    const handleMoreInfoClick = (campaign) => {
        // dispatch(setSelectedContact(contact))
        // dispatch(toggleContactCard())
    }

    const campaignActionRef = useRef(null)

    useOutsideClickHandler(campaignActionRef, campaignTableActionOpen, () => dispatch(toggleCampaignTableAction()))
    /* 
        handles pagination, logic is taken from react-paginate github
     */
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [activeCampaigns, setActiveCampaigns] = useState([])

    useEffect(() => {

        const active = isEqual(filter, initialFilterState) ? campaigns : searchResults
        setActiveCampaigns(active)
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(active.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(active.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, campaigns, searchResults, filter]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % activeCampaigns.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    const handleSearchChange = (event) => {
        dispatch(setSearchFilter(event.target.value))
        dispatch(applyFilters())
    };
    useEffect(() => {
        dispatch(applyFilters())
    }, [dispatch, filter])

    const allChecked = () => {
        if (isEqual(filter, initialFilterState)) {
            return selectedCampaigns.length === campaigns.length
        } else {
            return searchResults.every(result =>
                selectedCampaigns.some(selected => selected === result.id)
            );
        }
    }
    const handleCheckboxOnChange = (e, id) => {
        e.stopPropagation(); // Prevent click from propagating to the parent tr element
        dispatch(toggleCampaignSelection(id));
    }

    const handlePreviewClick = (e) => {
        e.preventDefault(); // Prevent default anchor link behavior

        // Convert selectedContacts array to a JSON string and store it
        localStorage.setItem('selectedCampaigns', JSON.stringify(selectedCampaigns));

        // Redirect to the URL
        window.location.href = 'http://localhost:8000/mosaico';
    };
    const handleStatusFilter = (status) => {
        dispatch(setStatusFilter(status))
        dispatch(applyFilters())
    }
    const handleRemoveFilter = () => {
        dispatch(removeAllFilters())
        dispatch(applyFilters())
    }

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
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100  " onClick={() => handleRemoveFilter()}>Show All</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100  " onClick={() => handleStatusFilter('active')} >Show only Active</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 " >Sort/Filter</a>
                            </li>
                        </ul>
                        <div className="py-1">
                            <a href="http://localhost:8000/mosaico" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  ">Preview Email to Send</a>
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
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  " onChange={(e) => dispatch(toggleAllCampaigns())} checked={allChecked()} />
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
                        {currentItems && currentItems.map((campaign) => (
                            <tr key={campaign?.id} className="bg-white border-b  hover:bg-gray-50 ">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  " checked={selectedCampaigns.includes(campaign?.id)} onChange={(e) => handleCheckboxOnChange(e, campaign?.id)} onClick={(e) => e.stopPropagation()} />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="flex items-center py-4 text-gray-900 ">

                                    <div className="">
                                        <div className="text-base font-semibold flex flex-col">
                                            <span>{campaign?.name}</span>

                                        </div>
                                        <div className="font-normal text-gray-500">67% to goal</div>
                                    </div>
                                </th>
                                <td className="max-sm:hidden px-6 py-4">
                                    Monetary Campaign
                                </td>
                                <td className="max-sm:hidden px-6 py-4">
                                    <div className="flex items-center">
                                        <div className={`h-2.5 w-2.5 rounded-full ${campaign?.is_active ? 'bg-green-500' : 'bg-red-500'}  me-2`}></div> {campaign?.is_active ? 'Active' : 'Inactive'}
                                    </div>
                                </td>
                                <td className="px-6 py-4">

                                    <a href={`/dashboard/campaigns/${campaign?.id}`} type="button" className="font-medium text-blue-600  hover:underline">More Info</a>
                                </td>
                            </tr>))}
                    </tbody>

                </table>
            </div>
            <div className="absolute bottom-0 w-full bg-white">
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
                    activeClassName="text-blue-500" // Tailwind classes for the active page
                    previousClassName="py-1 px-3 bg-white border border-gray-300 rounded hover:bg-gray-100" // Tailwind classes for previous button
                    nextClassName="py-1 px-3 bg-white border border-gray-300 rounded hover:bg-gray-100" // Tailwind classes for next button
                />
            </div>




        </div>

    )
}

export default CampaignsTable