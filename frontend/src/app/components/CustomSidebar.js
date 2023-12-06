'use client'

import CustomSidebarLink from "./CustomSidebarLink"
import { FaHome } from 'react-icons/fa'
import { CiCalendarDate } from 'react-icons/ci'
import { GoPerson } from 'react-icons/go'
import { PiNewspaperClippingThin } from 'react-icons/pi'
import SidebarAccordian from "./SidebarAccordian"


const CustomSidebar = () => {

    return (
        <>
            <aside className="fixed top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#1c2434] duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 -translate-x-full w-[290px]">
                <div className="p-3 flex flex-row place-content-center">
                    <h1 className="text-white p-3 text-xl ">Admin</h1>
                </div>

                <div>
                    <div className="p-6">
                        <h2 className="text-white text-md font-bold">MENU</h2>
                    </div>
                    <div className="p-6 ">
                        <CustomSidebarLink title="Dashboard" icon={<FaHome className="scale-[1.5]" />} />
                        <CustomSidebarLink title="Calendar" icon={<CiCalendarDate className="scale-[1.75]" />} />
                        <CustomSidebarLink title="Forms" icon={<PiNewspaperClippingThin className="scale-[1.5]" />} />
                        <SidebarAccordian title="Tasks" subtitles={["Kanban", "Other"]} type="dropdown_tasks" />
                        <CustomSidebarLink title="Profile" icon={<GoPerson className="scale-[1.5]" />} />
                    </div>


                </div>
            </aside>
        </>
    )
}

export default CustomSidebar