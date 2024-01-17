'use client'
import { use, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { toggleSettingsButton, toggleSelectedTab } from "../../lib/features/profile/profileSlice"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toggleAccountDropdown } from "../../lib/features/dropdown/dropdownSlice"


const AccountDropdown = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { accountDropdownOpen } = useSelector((state) => state.dropdowns)

    /* Going to settings requires changing redux state, but a link refreshes the state.
       This way the page redirects and then sets state*/
    const handleSettingsRedirect = (e) => {
        if (typeof window !== 'undefined') {
            e.preventDefault(); // Prevent default anchor behavior
            localStorage.setItem('selectedTab', '3'); // Save to localStorage
            dispatch(toggleSelectedTab(3));
            dispatch(toggleAccountDropdown())
            router.push('/dashboard/profile')
        }
    };
    return (


        <div className={` ${accountDropdownOpen ? '' : 'hidden'} absolute top-6 -right-5 z-40 my-4 text-base list-none bg-[#2d2e2f] border-[#404344] border-2  rounded-lg shadow `} id="user-dropdown">
            <div className="absolute -top-[30px] right-3  w-[1.5em] h-[1.5em] fill-[#2d2e2f] stroke-[#404344] stroke-[2px] scale-[1.5]">
                <svg display="block" viewBox="0 0 30 30"><g transform="rotate(0 15 15)"><path fill="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path><path stroke="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path></g></svg>
            </div>
            <div className="px-4 py-3">
                <span className="block text-sm text-white">Bonnie Green</span>
                <span className="block text-sm  text-gray-400">name@flowbite.com</span>
            </div>

            <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                    <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleSettingsRedirect}>Settings</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                </li>
            </ul>
        </div>
    )
}

export default AccountDropdown