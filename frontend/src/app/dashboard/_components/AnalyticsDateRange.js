'use client'
import { useSelector, useDispatch } from "react-redux"
import { toggleContactSortModal } from "../../lib/features/contacts/contactSlice"
import { LuX } from "react-icons/lu"
import DateComponent from "./DateComponent"
import { toggleDateRangeModal } from "../../lib/features/analytics/analyticSlice"

const AnalyticsDateRangeModal = () => {
    const dispatch = useDispatch()
    const { dateRangeModalOpen } = useSelector((state) => state.analytics)

    return (
        <>
            <div className={`${dateRangeModalOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-40' : 'hidden'}`} onClick={() => dispatch(toggleDateRangeModal())}></div>
            <div id="dateRangeModal" tabIndex="-1" aria-hidden="true" className={`${dateRangeModalOpen ? 'fixed max-sm:inset-0 z-50 items-center place-items-center justify-center p-4 h-max m-auto' : 'hidden'}`}>
                <div className="relative w-full max-w-2xl  ">
                    {/* // Modal Content */}
                    <form className="relative bg-white rounded-2xl shadow ">
                        {/* //Modal Header */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                {`Custom Date Range`}
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="editUserModal">
                                <LuX className="scale-[1.5] stroke-2" onClick={() => dispatch(toggleDateRangeModal())} />
                            </button>
                        </div>
                        {/* // Modal Body */}
                        <div className="p-6 space-y-6 max-h-[calc(100vh-15rem)] overflow-auto">
                            <div className="grid grid-cols-6 gap-6">

                                <div className="col-span-6 sm:col-span-3">
                                    <div className="max-sm:w-1/2">
                                        <label htmlFor="select-date" className="block mb-2 text-sm font-medium text-gray-900 ">Select Start</label>
                                        <DateComponent selected={"2024-01-12T00:00:00Z"} />
                                    </div>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <div className="max-sm:w-1/2">
                                        <label htmlFor="select-date" className="block mb-2 text-sm font-medium text-gray-900 ">Select End</label>
                                        <DateComponent selected={"2024-01-12T00:00:00Z"} />
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* // Modal Footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Save Dates</button>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Remove Date Range</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AnalyticsDateRangeModal