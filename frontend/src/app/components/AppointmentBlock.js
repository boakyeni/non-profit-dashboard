'use client'
import { useDispatch } from "react-redux"
import { toggleSelectedTab } from "../lib/features/profile/profileSlice"
import Link from "next/link"


const AppointmentBlock = ({ icon }) => {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(toggleSelectedTab(0))
        localStorage.setItem('selectedTab', 0)
    }
    return (
        <>
            <Link href="/dashboard/profile" className="relative overflow-visible flex flex-row bg-white border-slate-300 border drop-shadow-md justify-between h-[166px] m-4 p-2 rounded-2xl" onClick={handleClick} >
                <div className="flex flex-col justify-end space-y-1">
                    <div className="bg-slate-200 py-6 px-6 absolute -top-6 left-6 rounded-2xl">
                        {icon}
                    </div>
                    <div className="font-bold overflow-y-scroll mt-5">
                        <p className="overflow-ellipsis">Meeting with Mark <span className=" text-red-600">Today</span></p>
                    </div>
                    <div>
                        <p className="">{ } 3 upcoming meetings</p>
                    </div>
                    <div>
                        <p className="text-blue-500 text-xs">Click to View</p>
                    </div>
                </div>

                {/* <div className="flex flex-col h-full text-lime-600">
                    2.59 %
                </div> */}

            </Link>
        </>
    )
}

export default AppointmentBlock