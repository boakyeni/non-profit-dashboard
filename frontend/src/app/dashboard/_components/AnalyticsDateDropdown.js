'use client'
import { useEffect } from "react"
import { toggleDateDropdown, updateTimeFrame } from "../../lib/features/analytics/analyticSlice"
import { useDispatch, useSelector } from "react-redux"

const AnalyticsDateDropdown = () => {
    const dispatch = useDispatch()
    const { dateDropdownOpen } = useSelector((state) => state.analytics)
    useEffect(() => {
        dispatch(updateTimeFrame({ timeRange: 'this month' }))
    }, [dispatch])

    const handleClick = (timeRange) => {

        dispatch(updateTimeFrame({ timeRange: timeRange }));
    }

    return (
        <div className={`${dateDropdownOpen ? 'absolute top-full z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-3/4' : 'hidden'}`}>
            <ul className="py-1 text-sm text-gray-700 " aria-labelledby="dropdownActionButton">
                <li>
                    <button onClick={() => handleClick('this month')} className="block px-4 py-2 hover:bg-gray-100 w-full text-left " >Last 30 Days</button>
                </li>
                <li>
                    <button onClick={() => handleClick('this quarter')} className="block px-4 py-2 hover:bg-gray-100 w-full text-left  ">This Quarter</button>
                </li>
                <li>
                    <button onClick={() => handleClick('last 90 days')} className="block px-4 py-2 hover:bg-gray-100 w-full text-left  ">Last 90 Days</button>
                </li>

            </ul>
            <div className="py-1">
                <button onClick={() => handleClick('all time')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  ">All Time</button>
            </div>
        </div>
    )
}

export default AnalyticsDateDropdown