'use client'
import { toggleDateDropdown } from "../../lib/features/analytics/analyticSlice"
import { useDispatch, useSelector } from "react-redux"

const AnalyticsDateDropdown = () => {
    const dispatch = useDispatch()
    const { dateDropdownOpen } = useSelector((state) => state.analytics)

    return (
        <div className={`${dateDropdownOpen ? 'absolute top-full z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-3/4' : 'hidden'}`}>
            <ul className="py-1 text-sm text-gray-700 " aria-labelledby="dropdownActionButton">
                <li>
                    <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left " >This Month</button>
                </li>
                <li>
                    <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left  ">This Quarter</button>
                </li>
                <li>
                    <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left  ">Last 90 days</button>
                </li>

            </ul>
            <div className="py-1">
                <a href="http://localhost:8000/mosaico" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  ">All Time</a>
            </div>
        </div>
    )
}

export default AnalyticsDateDropdown