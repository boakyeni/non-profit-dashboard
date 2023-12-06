'use client'
import { useEffect, useState } from "react"
import { FaChevronDown, FaTasks } from "react-icons/fa"
import { GoTasklist } from 'react-icons/go'
import { useSelector, useDispatch } from "react-redux"




const SidebarAccordian = ({ title, subtitles, type }) => {
    // const [open, setOpen] = useState(false)

    const openState = useSelector((state) => {
        const dropdownState = state.dropdowns[type]
        return dropdownState ? dropdownState.open : false

    })
    const dispatch = useDispatch()




    return (
        <div className="text-white font-bold text-lg py-3">
            <button className="cursor-pointer flex flex-row justify-between w-full place-items-center">
                <div className="flex flex-row place-items-center pl--2">
                    <GoTasklist className="scale-[1.5]" />
                    <p className="pl-3">{title}</p>
                </div>
                <FaChevronDown onClick={() => { dispatch({ type: type }) }} />
            </button>
            <div className={`transition-all overflow-hidden duration-[350ms] px-2 ${openState ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul>
                    {subtitles.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>


        </div>
    )
}

export default SidebarAccordian