'use client'
import { useState } from "react"
import CustomSidebarLink from "./CustomSidebarLink"
import { FaHome } from 'react-icons/fa'
import { FaCentSign } from 'react-icons/fa6'
import { CiCalendarDate } from 'react-icons/ci'
import { GoPerson } from 'react-icons/go'
import { PiNewspaperClippingThin } from 'react-icons/pi'
import SidebarAccordian from "./SidebarAccordian"
import { LuKanbanSquareDashed } from "react-icons/lu"
import { LuTornado } from "react-icons/lu"


const CustomSidebar = () => {
    const [open, setOpen] = useState(false)

    const openHandler = () => {
        setOpen(false)
    }


    return (
        <>
            <aside className={`fixed top-0 z-50 flex h-screen flex-col overflow-y-hidden bg-slate-800 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 w-[290px] ${open ? ' translate-x-0' : '-translate-x-full '}`}>
                <div className="p-3 flex flex-row place-content-center">
                    <h1 className="text-white p-3 text-xl ">Admin</h1>
                </div>

                <div>
                    <div className="p-6">
                        <h2 className="text-white text-md font-bold">MENU</h2>
                    </div>
                    <div className="py-6 ">
                        <CustomSidebarLink title="Dashboard" icon={<FaHome className="scale-[1.5]" />} href="/dashboard" />
                        <CustomSidebarLink title="Calendar" icon={<CiCalendarDate className="scale-[1.75]" />} href="/dashboard/calendar" />
                        <CustomSidebarLink title="Forms" icon={<PiNewspaperClippingThin className="scale-[1.5]" />} href="/dashboard" />
                        <CustomSidebarLink title="Campaigns" icon={<FaCentSign className="scale-[1.5]" />} href={`/dashboard/campaigns`} />
                        <SidebarAccordian title="Tasks" subtitles={["Kanban", "Other"]} icons={[<LuKanbanSquareDashed className="scale-[1.5]" />, <LuTornado className="scale-[1.5]" />]} type="dropdown_tasks" />
                        <CustomSidebarLink title="Profile" icon={<GoPerson className="scale-[1.5]" />} href="/dashboard" />
                    </div>


                </div>
            </aside>
        </>
    )
}

export default CustomSidebar