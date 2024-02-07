'use client'
import ReactPaginate from "react-paginate"
import { useState } from "react"
const SubscriberTable = () => {
    const [pageCount, setPageCount] = useState()
    const handlePageClick = () => {

    }
    return (
        <div className="relative flex flex-col overscroll-none drop-shadow-xl min-h-[10vh] max-h-[40vh] lg:mt-10 flex-grow bg-white">
            <div className="sticky z-10 flex items-center justify-between flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-100 ">
                <div  >
                    <button id="dropdownActionButton" className="m-3 inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5" type="button">
                        <span className="sr-only">Action button</span>
                        Action
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {/* Dropdown Menu */}
                    <div id="dropdownAction" className={`hidden fixed z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 `}>
                        <ul className="py-1 text-sm text-gray-700 " aria-labelledby="dropdownActionButton">
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100  " >Add Contact</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100  ">Show only Donors</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100  ">Show only Patients</a>
                            </li>
                            <li>
                                <button href="#" className="block px-4 py-2 hover:bg-gray-100 w-full text-left " >Sort/Filter</button>
                            </li>

                        </ul>
                        <div className="py-1">
                            <a href="http://localhost:8000/mosaico" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  ">Preview Email to Send</a>
                        </div>
                    </div>
                </div>
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative m-3 w-full">

                    <input type="text" id="table-search-users" className="rounded-2xl block py-1 ps-2 text-sm text-gray-900 border border-gray-300 w-60 bg-gray-50 focus:ring-blue-500 focus:border-blue-500  " placeholder="Search for contacts" />
                </div>
            </div>

            {/* Paginate This */}
            <div className="overflow-y-auto max-h-[30vh]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className=" z-10 p-4 w-[48px]">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  " />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className=" py-3">
                                Name
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
                                    <div className="text-base break-words font-semibold flex flex-col">
                                        <span>Smotherson</span>
                                    </div>
                                    <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                </div>
                            </th>

                        </tr>
                        <tr className="bg-white border-b  hover:bg-gray-50 ">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  " />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="flex items-center py-4 text-gray-900 ">

                                <div className="">
                                    <div className="text-base break-words font-semibold flex flex-col">
                                        <span>Smotherson</span>
                                    </div>
                                    <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                </div>
                            </th>

                        </tr>
                        <tr className="bg-white border-b  hover:bg-gray-50 ">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  " />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="flex items-center py-4 text-gray-900 ">

                                <div className="">
                                    <div className="text-base break-words font-semibold flex flex-col">
                                        <span>Smotherson</span>
                                    </div>
                                    <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                </div>
                            </th>

                        </tr>
                        <tr className="bg-white border-b  hover:bg-gray-50 ">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  " />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="flex items-center py-4 text-gray-900 ">

                                <div className="">
                                    <div className="text-base break-words font-semibold flex flex-col">
                                        <span>Smotherson</span>
                                    </div>
                                    <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                </div>
                            </th>

                        </tr><tr className="bg-white border-b  hover:bg-gray-50 ">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  " />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="flex items-center py-4 text-gray-900 ">

                                <div className="">
                                    <div className="text-base break-words font-semibold flex flex-col">
                                        <span>Smotherson</span>
                                    </div>
                                    <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                </div>
                            </th>

                        </tr><tr className="bg-white border-b  hover:bg-gray-50 ">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  " />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="flex items-center py-4 text-gray-900 ">

                                <div className="">
                                    <div className="text-base break-words font-semibold flex flex-col">
                                        <span>Smotherson</span>
                                    </div>
                                    <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                </div>
                            </th>

                        </tr>


                    </tbody>
                </table>
            </div>
            <div className="absolute top-full w-full bg-white">
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
                    activeClassName="py-1 text-black" // Tailwind classes for the active page
                    previousClassName="py-1 px-3 bg-white border border-gray-300 rounded hover:bg-gray-100" // Tailwind classes for previous button
                    nextClassName="py-1 px-3 bg-white border border-gray-300 rounded hover:bg-gray-100" // Tailwind classes for next button
                />
            </div>




        </div>
    )
}

export default SubscriberTable