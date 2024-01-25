'use client'
import { useSelector, useDispatch } from "react-redux"
import { toggleContactSortModal } from "../../lib/features/contacts/contactSlice"
import { LuX } from "react-icons/lu"

const SortOrFilterModal = () => {
    const dispatch = useDispatch()
    const { contactSortModalOpen } = useSelector((state) => state.contact)

    return (
        <>
            <div className={`${contactSortModalOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-40' : 'hidden'}`}></div>
            <div id="editUserModal" tabIndex="-1" aria-hidden="true" className={`${contactSortModalOpen ? '' : 'hidden'} fixed max-sm:inset-0 z-50 items-center place-items-center justify-center p-4 h-max m-auto`}>
                <div className="relative w-full max-w-2xl  ">
                    {/* // Modal Content */}
                    <form className="relative bg-white rounded-2xl shadow ">
                        {/* //Modal Header */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                {`Sort/Filter`}
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="editUserModal">
                                <LuX className="scale-[1.5] stroke-2" onClick={() => dispatch(toggleContactSortModal())} />
                            </button>
                        </div>
                        {/* // Modal Body */}
                        <div className="p-6 space-y-6 max-h-[calc(100vh-15rem)] overflow-auto">
                            <div className="grid grid-cols-6 gap-6">

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 ">Department</label>
                                    <input type="text" name="department" id="department" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Development" required="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Company</label>
                                    <input type="number" name="company" id="company" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="123456" required="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="current-password" className="block mb-2 text-sm font-medium text-gray-900 ">Donor Type</label>
                                    <input type="search" name="current-password" id="current-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="••••••••" required="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-900 ">Contribution Range</label>
                                    <input type="number" name="new-password" id="new-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  " placeholder="••••••••" required="" />
                                </div>
                            </div>
                        </div>
                        {/* // Modal Footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sort/Filter</button>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Remove All Filters</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SortOrFilterModal