'use client'
import { useDispatch, useSelector } from "react-redux"
import { toggleSelectedTab, toggleTabDropdown } from "../../../lib/features/profile/profileSlice"
import { LuSettings } from "react-icons/lu"


const ProfileTabs = () => {
    const dispatch = useDispatch()
    const { selectedTab, tabDropdownOpen } = useSelector((state) => state.profile)

    const handleTabSelection = (tab) => {
        dispatch(toggleSelectedTab(tab))
        localStorage.setItem('selectedTab', tab);
    }

    const handleTabSelectionMobile = (tab) => {
        dispatch(toggleTabDropdown())
        dispatch(toggleSelectedTab(tab))
        localStorage.setItem('selectedTab', tab); // Save to localStorage
    }
    return (
        <>
            <div className="mx-auto w-[85%]">
                <ul className="max-md:hidden grid grid-flow-col text-center text-slate-600 bg-slate-200 rounded-full p-1 space-x-5">
                    <li >
                        <button className={`${selectedTab === 0 ? 'bg-white shadow text-indigo-900 hover:bg-opacity-100' : 'hover:bg-opacity-50'} w-full flex justify-center py-4  hover:bg-slate-50 rounded-full `} onClick={() => handleTabSelection(0)}>Appointments</button>
                    </li>
                    <li >
                        <button className={`${selectedTab === 1 ? 'bg-white shadow text-indigo-900 hover:bg-opacity-100' : 'hover:bg-opacity-50'} w-full flex justify-center py-4  hover:bg-slate-50 rounded-full `} onClick={() => handleTabSelection(1)}>Institution Settings</button>
                    </li>

                    <li >
                        <button className={`${selectedTab === 2 ? 'bg-white shadow text-indigo-900 hover:bg-opacity-100' : ''} flex justify-center py-4 hover:bg-opacity-50 hover:bg-slate-50 rounded-full w-full `} onClick={() => handleTabSelection(2)}>Settings</button>
                    </li>
                    <li >
                        <button className={`${selectedTab === 3 ? 'bg-white shadow text-indigo-900 hover:bg-opacity-100' : ''} flex justify-center py-4 hover:bg-opacity-50 hover:bg-slate-50 rounded-full w-full `} onClick={() => handleTabSelection(3)}>Profile</button>
                    </li>

                </ul>

                {/* For Mobile*/}
                <div className="relative flex items-center md:hidden h-24 w-24 mx-auto bg-slate-300 rounded-full shadow-2xl mt-6 cursor-pointer justify-between">
                    <LuSettings className="mx-auto scale-[3.0] bg-slate-300  rounded-full w-6 h-6" onClick={() => dispatch(toggleTabDropdown())} />
                    <div className={` ${tabDropdownOpen ? '' : 'hidden'} absolute top-[212px] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-[#2d2e2f] border-[#404344] border-2 mt-42 rounded-xl `}>
                        {/* Point on top of dropdown */}
                        <div className="absolute -top-[30px] right-1/2 transform translate-x-1/2 w-[1.5em] h-[1.5em] fill-[#2d2e2f] stroke-[#404344] stroke-[2px] scale-[1.5]">
                            <svg display="block" viewBox="0 0 30 30"><g transform="rotate(0 15 15)"><path fill="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path><path stroke="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path></g></svg>
                        </div>

                        {/* dropdown itself */}
                        <ul className="py-2 w-[70vw]" aria-labelledby="user-menu-button">
                            <li>
                                <button className="w-full block px-4 py-3  text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={() => handleTabSelectionMobile(0)}>Appointments</button>
                            </li>
                            <li>
                                <button className="w-full block px-4 py-3  text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={() => handleTabSelectionMobile(1)}>Institution Settings</button>
                            </li>

                            <li>
                                <button className="w-full block px-4 py-3  text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={() => handleTabSelectionMobile(2)}>Settings</button>
                            </li>
                            <li>
                                <button className="w-full block px-4 py-3 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={() => handleTabSelectionMobile(3)}>Profile</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProfileTabs